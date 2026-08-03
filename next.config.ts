import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

/**
 * Content Security Policy.
 *
 * `script-src` carries 'unsafe-inline' and that is a deliberate, documented
 * trade rather than an oversight. Next's App Router inlines the RSC payload as
 * ~14 inline <script> tags per page, plus this app's own pre-paint theme
 * script. The strict alternative is a per-request nonce — but nonces force
 * dynamic rendering, which would throw away the static generation that is the
 * entire reason this app is on Next rather than Vite. Hashes are not viable
 * either: Next's inline payload changes with every build and every page.
 *
 * The rest of the policy is tight to compensate: no external origins are
 * permitted at all. next/font self-hosts Newsreader and Hanken Grotesk into
 * /_next/static/media, so unlike VitalQuest this needs no Google font hosts —
 * `font-src 'self'` is genuinely complete.
 */
function contentSecurityPolicy(): string {
  const directives: Record<string, string[]> = {
    'default-src': ["'self'"],
    // 'unsafe-eval' is dev-only: Next's HMR compiles modules with eval.
    'script-src': ["'self'", "'unsafe-inline'", ...(isDev ? ["'unsafe-eval'"] : [])],
    'style-src': ["'self'", "'unsafe-inline'"],
    'font-src': ["'self'"],
    'img-src': ["'self'", 'data:', 'blob:'],
    // Same-origin only. /api/coach is same-origin; Anthropic is called
    // server-side, so the browser never needs to reach it.
    'connect-src': ["'self'", ...(isDev ? ['ws:', 'wss:'] : [])],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'manifest-src': ["'self'"],
  };

  const policy = Object.entries(directives)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');

  return isDev ? policy : `${policy}; upgrade-insecure-requests`;
}

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy() },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // frame-ancestors above covers modern browsers; this covers the rest.
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          ...securityHeaders,
          // HSTS only in production: sending it from localhost would pin
          // http://localhost to HTTPS in the browser and break local dev
          // for every other project sharing that host.
          ...(isDev
            ? []
            : [
                {
                  key: 'Strict-Transport-Security',
                  value: 'max-age=63072000; includeSubDomains; preload',
                },
              ]),
        ],
      },
      {
        // The coach endpoint handles what someone typed about their mental
        // state. Nothing about it should ever be cached or indexed.
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },
};

export default nextConfig;
