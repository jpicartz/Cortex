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

const MODEL = 'claude-opus-5';
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

function originAllowed(origin: string | null, host: string | null): boolean {
  // Non-browser clients send no Origin; the rate limiter covers those.
  if (!origin) return true;
  try {
    const { hostname, protocol } = new URL(origin);
    if (hostname === 'localhost' || hostname === '127.0.0.1') return true;
    if (protocol !== 'https:') return false;
    // Same-host, plus Vercel preview deployments for this project.
    if (host && hostname === host.split(':')[0]) return true;
    return /^cortex[a-z0-9-]*\.vercel\.app$/.test(hostname);
  } catch {
    return false;
  }
}

function fail(status: number, message: string) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request) {
  if (!originAllowed(request.headers.get('origin'), request.headers.get('host'))) {
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
      // Opus 5 runs adaptive thinking by default. Leaving it on is deliberate:
      // disabling it can leak <thinking> tags into the visible response.
      // `effort` is the cost lever instead.
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
