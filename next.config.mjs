/** @type {import('next').NextConfig} */

// Stable identifier for this build — used by UpdateBanner to detect new deploys.
// On Vercel this is the deployment ID; locally it falls back to Date.now().
const BUILD_ID =
  process.env.NEXT_PUBLIC_BUILD_ID ||
  process.env.VERCEL_DEPLOYMENT_ID ||
  String(Date.now())

const nextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_ID: BUILD_ID,
  },
  reactStrictMode: true,

  // ── Strip X-Powered-By header ─────────────────────────────────────────────
  poweredByHeader: false,

  // ── Never emit source maps to the browser in production ──────────────────
  productionBrowserSourceMaps: false,

  // ── Images ────────────────────────────────────────────────────────────────
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'devfolio.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'openboxcomm.in',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ── HTTP security headers (fallback if middleware is bypassed) ────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://api.dicebear.com https://cdn.discordapp.com https://www.googletagmanager.com https://www.google-analytics.com",
              "connect-src 'self' https://discord.com https://discordapp.com https://api.indexnow.org https://www.bing.com https://www.googletagmanager.com https://www.google-analytics.com ws: wss: http://localhost:* http://127.0.0.1:*",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
      // Hard-block .git and sensitive paths at CDN/Next layer too
      {
        source: '/.git/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      // Ensure IndexNow key file is served as plain text
      {
        source: '/a63d11d22e28485ea9e0da8f7fa62387.txt',
        headers: [{ key: 'Content-Type', value: 'text/plain' }],
      },
      // Ensure llms.txt is served as plain text
      {
        source: '/llms.txt',
        headers: [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }],
      },
    ]
  },

  // ── Typo-fix redirects ────────────────────────────────────────────────────
  async redirects() {
    return [
      // Home page
      { source: '/hmoe', destination: '/', permanent: true },
      { source: '/home', destination: '/', permanent: true },

      // About page
      { source: '/aboot', destination: '/about', permanent: true },
      { source: '/abot', destination: '/about', permanent: true },
      { source: '/bout', destination: '/about', permanent: true },

      // Contact pages
      { source: '/contat', destination: '/contact-us', permanent: true },
      { source: '/contactus', destination: '/contact-us', permanent: true },
      { source: '/contact', destination: '/contact-us', permanent: true },
      { source: '/kontact', destination: '/contact-us', permanent: true },

      // Servers page
      { source: '/sever', destination: '/servers', permanent: true },
      { source: '/severs', destination: '/servers', permanent: true },
      { source: '/server', destination: '/servers', permanent: true },
      { source: '/servs', destination: '/servers', permanent: true },

      // Events page (note: /event* routes except /legal/event)
      { source: '/event/:slug', destination: '/events/:slug', permanent: true },
      { source: '/eventss', destination: '/events', permanent: true },

      // Team page
      { source: '/teams', destination: '/team', permanent: true },
      { source: '/teams/:slug', destination: '/team/:slug', permanent: true },

      // Careers page
      // { source: '/carrers', destination: '/careers', permanent: true },

      // Documentation page
      { source: '/docs', destination: '/doc', permanent: true },
      { source: '/docss', destination: '/doc', permanent: true },
      { source: '/documentation', destination: '/doc', permanent: true },
      { source: '/guide', destination: '/doc', permanent: true },

      // Join page
      { source: '/joinus', destination: '/join', permanent: true },
      { source: '/jion/', destination: '/join', permanent: true },
      { source: '/join-us', destination: '/join', permanent: true },

      // Blog page
      { source: '/blg', destination: '/blogs', permanent: true },
      { source: '/blog', destination: '/blogs', permanent: true },

      // Help page
      { source: '/hlep', destination: '/help', permanent: true },
      { source: '/help-us', destination: '/help', permanent: true },
      { source: '/faq', destination: '/help/faq', permanent: true },

      // Support page
      { source: '/suport', destination: '/support', permanent: true },
      { source: '/supprt', destination: '/support', permanent: true },

      // Legal route renames (backward compatibility)
      { source: '/legal/privacy', destination: '/legal/privacy-policy', permanent: true },
      { source: '/legal/terms', destination: '/legal/terms-and-conditions', permanent: true },
      { source: '/legal/cookie', destination: '/legal/cookie-policy', permanent: true },
      { source: '/legal/rules', destination: '/legal/community-rules', permanent: true },
      { source: '/legal/refund', destination: '/legal/refund-policy', permanent: true },
      { source: '/legal/dmca', destination: '/legal/dmca-policy', permanent: true },
      { source: '/legal/aup', destination: '/legal/acceptable-use-policy', permanent: true },
      { source: '/legal/event', destination: '/legal/event-policy', permanent: true },
    ]
  },
}

export default nextConfig
