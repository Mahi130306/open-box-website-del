import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Calendar, FileText, Users, Hash, Shield } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { events, getServer, servers } from '@/lib/community-data'
import { ServerMemberPill } from '@/components/ServerMemberPill'

// Server logo map
const SERVER_LOGOS: Record<string, string> = {
  jn: '/images/jn.png',
  dev: '/images/dev.png',
  gg: '/images/gg.png',
}

const DOC_SLUG_MAP: Record<string, string> = {
  jn: 'jn-guide',
  dev: 'dev-handbook',
  gg: 'gg-event-guide',
}

export async function generateStaticParams() {
  return servers.filter((s) => s.isLive).map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const server = getServer(slug)
  if (!server) return {}
  const title = `${server.name} — Open Box Servers`
  const description = server.description
  const url = `https://openboxcomm.in/servers/${server.slug}`
  const imageUrl = 'https://openboxcomm.in/images/og-default.png'

  return {
    title,
    description,
    alternates: {
      canonical: `/servers/${server.slug}`,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: server.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function ServerPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const server = getServer(slug)
  if (!server || !server.isLive) notFound()

  const serverEvents = events.filter((e) => e.serverSlug === server.slug)
  const logoSrc = SERVER_LOGOS[server.slug] ?? null

  return (
    <div className="min-h-screen">
      {/* ── Hero banner ─────────────────────────────────────────────── */}
      <div className={`relative overflow-hidden border-b border-border bg-gradient-to-br ${server.accent} p-px`}>
        <div className="relative bg-background/92 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">

              {/* Logo */}
              {logoSrc && (
                <div
                  className={`relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br ${server.accent} p-px shadow-2xl`}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-background/80">
                    <Image
                      src={logoSrc}
                      alt={`${server.name} server logo`}
                      fill
                      sizes="96px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="flex-1 text-white dark:text-neutral-200">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-0.5 text-xs font-bold text-black/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 text-red-500" />
                    LIVE
                  </span>
                  {server.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="capitalize">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {/* Added font-bold to help it contrast cleanly against the solid background */}
                <h1 className="mb-2 !text-4xl sm:!text-5xl font-bold">{server.name}</h1>
                <p className="max-w-2xl text-lg text-white/90 dark:text-neutral-300">{server.description}</p>
              </div>

              {/* Members pill */}
              <ServerMemberPill slug={server.slug} initialCount={server.memberCount} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">

          {/* Main */}
          <div className="space-y-12 lg:col-span-2">

            {/* About */}
            <section>
              <h2 className="mb-4 !text-2xl">About This Server</h2>
              <p className="text-base leading-relaxed text-muted-foreground">{server.longDescription}</p>
            </section>

            {/* Channels */}
            {server.channels && server.channels.length > 0 && (
              <section>
                <h2 className="mb-4 !text-2xl">Channels</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {server.channels.map((channel) => (
                    <div
                      key={channel}
                      className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 transition-colors hover:border-white/20"
                    >
                      <Hash className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      <span className="text-sm font-medium">{channel}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <Button asChild className="w-full min-h-[44px]" size="lg">
                <a
                  href={server.inviteCode ? `https://discord.gg/${server.inviteCode}` : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join {server.name} on Discord
                </a>
              </Button>

              <div className="mt-5 space-y-2 border-t border-border pt-5">
                <Button asChild variant="ghost" className="w-full justify-start gap-2 min-h-[44px]">
                  <Link href={`/doc/${DOC_SLUG_MAP[server.slug] || 'getting-started'}`}>
                    <BookOpen className="h-4 w-4" />
                    Server Documentation
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start gap-2 min-h-[44px]">
                  <Link href={`/blogs?server=${slug}`}>
                    <FileText className="h-4 w-4" />
                    Server Blogs
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start gap-2 min-h-[44px]">
                  <Link href="/legal/community-rules">
                    <Shield className="h-4 w-4" />
                    Community Rules
                  </Link>
                </Button>
              </div>
            </div>

            {/* Other live servers */}
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Other Servers
              </p>
              <div className="space-y-2">
                {servers
                  .filter((s) => s.isLive && s.slug !== slug)
                  .map((s) => (
                    <Link
                      key={s.slug}
                      href={`/servers/${s.slug}`}
                      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-accent min-h-[44px]"
                    >
                      {SERVER_LOGOS[s.slug] ? (
                        <div className="relative h-7 w-7 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={SERVER_LOGOS[s.slug]}
                            alt={s.name}
                            fill
                            sizes="28px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className={`h-7 w-7 flex-shrink-0 rounded-md bg-gradient-to-br ${s.accent}`} />
                      )}
                      <span className="text-sm font-medium">{s.name}</span>
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
