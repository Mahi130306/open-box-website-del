import Link from 'next/link'
import Image from 'next/image'
import { GithubIcon } from 'lucide-react'

// Social icon SVGs (inline, no extra dep)
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
)

const PatreonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M14.82 2.41C11.56 2.41 8.9 5.07 8.9 8.34c0 3.26 2.66 5.93 5.92 5.93 3.26 0 5.93-2.67 5.93-5.93 0-3.27-2.67-5.93-5.93-5.93zM2 21.6h3.5V2.41H2V21.6z" />
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.031.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
)

const GiftCardIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M4 2h16c1.104 0 2 .896 2 2v16c0 1.104-.896 2-2 2H4c-1.104 0-2-.896-2-2V4c0-1.104.896-2 2-2zm0 18h16M4 6h16m-2 6h2" />
  </svg>
)

// const RedditIcon = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
//     <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1
// )

// ── Creator config ────────────────────────────────────────────────────────────
const CREATOR_NAME = 'Mahi HH'
const CREATOR_HREF = '/team/mahi-hh'

export function Footer() {
  const socialLinks = [
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@obcommunities-yt',
      icon: <YoutubeIcon />,
      id: 'footer-youtube',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/openboxcomm/',
      icon: <InstagramIcon />,
      id: 'footer-instagram',
    },
    {
      name: 'Patreon',
      href: 'https://patreon.com/OpenBoxComm',
      icon: <PatreonIcon />,
      id: 'footer-patreon',
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com/Openboxcomm',
      icon: <XIcon />,
      id: 'footer-x',
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/7ZWckKU89J',
      icon: <DiscordIcon />,
      id: 'footer-discord',
    },
    {
      name: 'WhatsApp',
      href: 'https://whatsapp.com/channel/openboxcomm',
      icon: <WhatsAppIcon />,
      id: 'footer-whatsapp',
    },
    // {
    //   name: 'Reddit',
    //   href: 'https://reddit.com/r/openboxcomm',
    //   icon: <RedditIcon />,
    //   id: 'footer-reddit',
    // },
  ]

  const legalLinks = [
    { label: 'Terms & Conditions', href: '/legal/terms-and-conditions' },
    { label: 'Privacy Policy', href: '/legal/privacy-policy' },
    { label: 'Cookie Policy', href: '/legal/cookie-policy' },
    { label: 'Community Rules', href: '/legal/community-rules' },
    { label: 'AUP', href: '/legal/acceptable-use-policy' },
    { label: 'DMCA / Copyright', href: '/legal/dmca-policy' },
    { label: 'Refund Policy', href: '/legal/refund-policy' },
    { label: 'Event Policy', href: '/legal/event-policy' },
  ]

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-8 md:grid-cols-2 lg:grid-cols-12 mb-10 sm:mb-12">
          {/* Brand Section - Spans 3 columns */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-lg flex-shrink-0">
                  <Image
                    src="/images/OB.png"
                    alt="Open Box logo"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <span className="text-xl font-heading font-bold tracking-tight">Open Box</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Free communities for gaming, development, learning, and connecting.
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Connect With Us</p>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.id}
                    id={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    title={s.name}
                    className="h-10 w-10 flex items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-200 hover:border-cyan-500 hover:bg-cyan-500/10 hover:text-cyan-500"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigate */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold mb-5 text-foreground uppercase tracking-wider">Navigate</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Servers', href: '/servers' },
                // { label: 'Events', href: '/events' },
                { label: 'Blogs', href: '/blogs' },
                { label: 'Docs', href: '/doc' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted-foreground hover:text-cyan-500 transition-colors duration-150">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold mb-5 text-foreground uppercase tracking-wider">Community</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Support Us', href: '/support' },
                { label: 'Help Centre', href: '/help' },
                { label: 'Our Team', href: '/team' },
                { label: 'Contact Us', href: '/contact-us' },
                // { label: "Carrers", href: "/carrers" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted-foreground hover:text-cyan-500 transition-colors duration-150">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal - Split into 2 columns for better spacing */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold mb-5 text-foreground uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3 text-sm">
              {legalLinks.slice(0, 4).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted-foreground hover:text-cyan-500 transition-colors duration-150">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Continued */}
          <div className="lg:col-span-2">
            {/* Spacer header only reserved at the lg breakpoint, where this sits beside the first Legal column.
                Hidden below lg so it doesn't eat vertical space while stacked on mobile/tablet. */}
            <h3 className="hidden lg:block text-sm font-semibold mb-5 text-foreground uppercase tracking-wider opacity-0 pointer-events-none">Legal</h3>
            <ul className="space-y-3 text-sm">
              {legalLinks.slice(4).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted-foreground hover:text-cyan-500 transition-colors duration-150">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-border via-border to-border mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground text-center">
          <div className="flex flex-col sm:flex-row items-center gap-x-2 gap-y-1">
            <p>© {new Date().getFullYear()} Open Box. All rights reserved.</p>
            <span className="hidden sm:inline text-muted-foreground/30">•</span>
            <p suppressHydrationWarning>
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}{' '}
              {new Date().toLocaleTimeString('en-US', { hour12: false })}
            </p>
            <span className="hidden sm:inline text-muted-foreground/30">•</span>
            {/* </div>

          <div> */}
            <p>
              Want to contribute to the site?{'  '}
              <Link
                href="https://github.com/Mahi130306/OpenBoxComm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-foreground/80 hover:text-cyan-500 transition-colors duration-150">
                <GithubIcon className="h-4 w-4" />
                GitHub
              </Link>
            </p>
            <span className="hidden sm:inline text-muted-foreground/30">•</span>
            {/* </div>

          <div> */}
            <p>
              Built with passion by{' '}
              <Link
                href={CREATOR_HREF}
                id="footer-creator"
                className="font-medium text-foreground/80 hover:text-cyan-500 transition-colors duration-150"
              >
                {CREATOR_NAME}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}