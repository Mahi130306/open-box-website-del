import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { servers } from '@/lib/community-data'
import { ArrowRight, Sparkles, } from 'lucide-react'
import { ServerMemberCountInline } from '@/components/ServerMemberCountInline'
import { INSTAGRAM_URL, YOUTUBE_URL, X_URL, WHATSAPP_URL, } from '@/lib/constants'
import { Suspense } from 'react'
import { ScrollToSection } from '@/components/ScrollToSection'

export const metadata: Metadata = {
  title: 'Join Open Box',
  description: 'Open Box is a free Discord community for developers, builders, gamers, and students. Pick a server and jump in.',
  alternates: { canonical: '/join' },
}

const SOCIALS = [
  {
    name: 'Instagram',
    href: INSTAGRAM_URL,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: YOUTUBE_URL,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: X_URL,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: WHATSAPP_URL,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
]

export default function JoinPage() {
  const featured = servers.find((s) => s.slug === 'jn') || servers[0]
  const rest = servers.filter((s) => s.slug !== featured.slug)

  const featuredInvite = `https://discord.gg/${featured.inviteCode}`

  return (
    <div className="flex flex-col gap-16 py-16 lg:py-24">
      <Suspense fallback={null}>
        <ScrollToSection />
      </Suspense>

      {/* Hero Section */}
      <section className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-500">
          <Sparkles className="h-3 w-3" />
          Free community
        </div>
        <h1 className="mb-6 text-balance font-heading text-5xl font-extrabold tracking-tight lg:text-7xl">
          Find your <span className="text-cyan-500">people.</span>
        </h1>
        <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground">
          Open Box is a free Discord community for developers, builders, gamers, and students. Pick a server and jump in.
        </p>
        <Button asChild size="lg" className="rounded-full px-8 py-6 text-base font-bold shadow-lg shadow-cyan-500/20 min-h-[44px]">
          <a href={featuredInvite} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            Join Open Box
          </a>
        </Button>
      </section>

      {/* Servers Section */}
      <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Choose your server
        </p>

        <div className="grid gap-6">
          {/* Featured Card */}
          <Link
            href={`/servers/${featured.slug}`}
            className="group relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-all hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10 md:flex-row md:p-10"
          >
            <div className={`absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b ${featured.accent}`} />
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-cyan-500/10 text-[10px] uppercase tracking-wider text-cyan-500 hover:bg-cyan-500/20">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">{featured.name}</h2>
              <p className="max-w-md text-muted-foreground md:text-lg">{featured.description}</p>
              {featured.isLive && (
                <ServerMemberCountInline slug={featured.slug} initialCount={featured.memberCount} />
              )}
            </div>
            <div className="shrink-0">
              <span className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity group-hover:opacity-90 min-h-[44px]">
                Join server
              </span>
            </div>
          </Link>

          {/* Grid for rest */}
          <div className="grid gap-6 sm:grid-cols-2">
            {rest.map((server) => (
              <Card
                key={server.slug}
                className={`flex flex-col border-border bg-surface transition-all hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-xl ${!server.isLive ? 'opacity-75' : ''}`}
              >
                <div className={`h-1.5 bg-gradient-to-r ${server.accent}`} />
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-wrap gap-2">
                      {server.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px] uppercase tracking-wider">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {!server.isLive && (
                      <Badge variant="outline" className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="font-heading text-2xl">{server.name}</CardTitle>
                  <CardDescription className="line-clamp-2 text-muted-foreground">
                    {server.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  {server.isLive && server.memberCount > 0 && (
                    <ServerMemberCountInline slug={server.slug} initialCount={server.memberCount} />
                  )}
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="w-full justify-between group/btn text-cyan-500 hover:text-cyan-500 hover:bg-cyan-500/5 min-h-[44px]">
                    <Link href={`/servers/${server.slug}`}>
                      Join server
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="mx-auto w-full max-w-5xl border-t border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            Not sure where to start? Join{' '}
            <Link href={`/servers/${featured.slug}`} className="font-medium text-cyan-500 hover:underline">
              {featured.name}
            </Link>{' '}
            first. Or{' '}
            <Link href="/doc/getting-started" className="font-medium text-cyan-500 hover:underline">
              read the getting started guide.
            </Link>
          </p>

          {/* Socials */}
          <div className="flex flex-col items-center gap-3 md:items-end" id="socials">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="text-cyan-500">{'//'}</span> find us elsewhere
            </span>
            <div className="flex flex-wrap justify-center gap-2 md:justify-end">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  title={social.name}
                  className="group flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-cyan-500/40 hover:text-cyan-500 hover:shadow-md hover:shadow-cyan-500/10 min-h-[44px]"
                >
                  {social.icon}
                  <span className="hidden font-mono text-[11px] uppercase tracking-widest sm:inline">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
