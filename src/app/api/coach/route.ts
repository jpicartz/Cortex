import Anthropic from '@anthropic-ai/sdk';

import { getStateById } from '@/content';
import { isLang } from '@/content/schema';
import { detectCrisis } from '@/lib/crisis';
import { buildSystemPrompt, buildUserPrompt } from '@/lib/prompt';

/**
 * The AI coach endpoint.
 *
 * Takes DATA, not prompts: {stateId, techniqueId, lang, situation}. The system
 * prompt is assembled server-side from the server's own content module, so this
 * cannot be used as a general-purpose Claude proxy by anyone who reads the
 * client bundle.
 *
 * Hardening carried over from VitalQuest (learned the expensive way):
 * body-size cap, per-IP rate limit, origin check, and never echoing upstream
 * error bodies back to the client.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/*
  Sonnet rather than Opus. This endpoint rewrites one curated technique for one
  person's situation against a system prompt that already contains the answer —
  it is a rewriting job, not a reasoning one, and Opus was several times the
  price for it. The spend cap is the real backstop on abuse, so a cheaper model
  also raises how much abuse the cap absorbs.
*/
const MODEL = 'claude-sonnet-5';
const MAX_TOKENS = 2500; // thinking + response share this budget
const MAX_BODY_BYTES = 8 * 1024;

// Best-effort per-instance limiter. The real backstop is the Anthropic spend
// cap; swap in Upstash if this ever sees serious traffic.
const RATE_LIMIT = 8;
const RATE_WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string): boolean {
  const now = Date.now();

  // Stop a flood of distinct keys growing the map without bound.
  if (hits.size > 5000) {
    for (const [k, rec] of hits) if (now > rec.resetAt) hits.delete(k);
  }

  const rec = hits.get(key);
  if (!rec || now > rec.resetAt) {
    hits.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > RATE_LIMIT;
}

/**
 * `x-forwarded-for` is caller-supplied and spoofable, which would mint a fresh
 * bucket per request. Vercel's own headers are set at the edge and cannot be
 * overridden by the client, so prefer them.
 */
function clientKey(request: Request): string {
  const headers = request.headers;
  const pick = (value: string | null) => (value ?? '').split(',')[0].trim();
  return (
    pick(headers.get('x-vercel-forwarded-for')) ||
    pick(headers.get('x-real-ip')) ||
    pick(headers.get('x-forwarded-for')) ||
    'unknown'
  );
}

const IS_PROD = process.env.NODE_ENV === 'production';

/**
 * Canonical production origin, e.g. https://cortex.app — set in the Vercel
 * project. Optional: same-host requests are allowed regardless, so the app
 * works on its Vercel subdomain before a custom domain exists.
 */
const SITE_ORIGIN = process.env.SITE_ORIGIN?.replace(/\/+$/, '');

/*
  There is deliberately NO preview-host pattern here any more.

  This used to end with `/^cortex[a-z0-9-]*\.vercel\.app$/` to let preview
  deployments through, and that was a hole: vercel.app subdomains are claimed
  first-come by anyone with an account, so a stranger deploying a project called
  `cortex-abuse` got a browser origin this endpoint trusted, and with it a Claude
  budget billed to this key.

  It was also redundant. A preview deployment calls its OWN host, so `origin`
  and `host` match and the same-host branch below already allows it. The wildcard
  only ever admitted origins that were NOT this deployment — which is exactly the
  set it should refuse.
*/
function originAllowed(origin: string | null, host: string | null): boolean {
  if (!origin) return false;
  try {
    const { hostname, protocol, origin: normalised } = new URL(origin);
    if (!IS_PROD && (hostname === 'localhost' || hostname === '127.0.0.1')) return true;
    if (protocol !== 'https:') return false;
    if (SITE_ORIGIN && normalised === SITE_ORIGIN) return true;
    return Boolean(host) && hostname === host!.split(':')[0];
  } catch {
    return false;
  }
}

/**
 * Gate the endpoint to real browser requests from this site.
 *
 * VitalQuest's proxy allowed a missing Origin through and leaned on the rate
 * limiter. That is too loose for a public app: the limiter is per-instance
 * in-memory, so on serverless it is a speed bump rather than a cap. Every
 * modern browser sends `Sec-Fetch-Site`, and page JavaScript cannot forge it,
 * so a same-origin fetch passes while a plain `curl` does not.
 *
 * Be honest about the ceiling: a non-browser client that sets `Origin` to this
 * host still gets through, because nothing here can distinguish it. This raises
 * the cost of casual abuse; it does not stop a determined caller. The rate limit
 * and the Anthropic spend cap are the actual backstops, which is part of why the
 * model above is the cheap one.
 */
function requestAllowed(request: Request): boolean {
  const site = request.headers.get('sec-fetch-site');
  if (site && site !== 'same-origin') return false;

  const origin = request.headers.get('origin');
  if (origin) return originAllowed(origin, request.headers.get('host'));

  // No Origin at all: accept only when the browser vouched for it.
  return site === 'same-origin';
}

function fail(status: number, message: string) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request) {
  if (!requestAllowed(request)) {
    return fail(403, 'Forbidden origin');
  }

  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (declaredLength > MAX_BODY_BYTES) return fail(413, 'Request too large');

  if (rateLimited(clientKey(request))) return fail(429, 'Too many requests');

  let body: unknown;
  try {
    const raw = await request.text();
    // content-length is absent under chunked encoding, so check the real body.
    if (raw.length > MAX_BODY_BYTES) return fail(413, 'Request too large');
    body = JSON.parse(raw);
  } catch {
    return fail(400, 'Invalid JSON');
  }

  const { stateId, techniqueId, lang, situation } = (body ?? {}) as Record<string, unknown>;

  if (typeof lang !== 'string' || !isLang(lang)) return fail(400, 'Invalid language');
  if (typeof stateId !== 'string') return fail(400, 'Invalid state');
  if (typeof situation !== 'string' || situation.trim().length < 10) {
    return fail(400, 'Situation too short');
  }

  const state = getStateById(stateId);
  if (!state) return fail(400, 'Unknown state');

  const technique =
    typeof techniqueId === 'string'
      ? state.techniques.find((t) => t.id === techniqueId)
      : undefined;

  /**
   * Server-side crisis check. The client checks first and never sends these,
   * but a client check is trivially bypassed — and this is the one path where
   * being wrong matters most. Nothing is forwarded to the model.
   */
  if (detectCrisis(situation)) {
    return Response.json({ crisis: true }, { status: 200 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY is not configured');
    return fail(500, 'Not configured');
  }

  const client = new Anthropic({ apiKey });

  try {
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      // Adaptive thinking stays on deliberately: disabling it can leak
      // <thinking> tags into the visible response. `effort` is the cost lever,
      // and with Sonnet underneath it the whole call is cheap enough that
      // there is no reason to reach for the riskier saving.
      thinking: { type: 'adaptive' },
      output_config: { effort: 'low' },
      system: [
        {
          type: 'text',
          text: buildSystemPrompt(state, technique, lang),
          // ~1000-1400 tokens, over Opus 5's 512-token cache minimum, so a
          // popular state gets real cache reads.
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: buildUserPrompt(situation, lang) }],
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }

          const message = await stream.finalMessage();

          // A refusal is an HTTP 200 with empty content — reading content[0]
          // unguarded would crash, and sending nothing would look like a hang.
          if (message.stop_reason === 'refusal') {
            controller.enqueue(
              encoder.encode(
                lang === 'es'
                  ? 'No puedo responder a eso. Si estás pasando por algo difícil, considera hablar con alguien de confianza o con un profesional.'
                  : 'I cannot respond to that. If you are going through something difficult, consider talking to someone you trust or a professional.',
              ),
            );
          }

          controller.close();
        } catch (error) {
          console.error('Coach stream error:', error);
          // The stream is already open, so the status code is committed. Close
          // cleanly; the client shows its own error if it received nothing.
          controller.close();
        }
      },
      cancel() {
        stream.abort();
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    // Never echo Anthropic's error body: it reveals whether the key is valid,
    // whether the account is out of credit, and internal request ids.
    console.error('Coach upstream error:', error);
    const status =
      error instanceof Anthropic.APIError && (error.status === 429 || error.status === 529)
        ? 503
        : 502;
    return fail(status, status === 503 ? 'Service busy' : 'Service unavailable');
  }
}
