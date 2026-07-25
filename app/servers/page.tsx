import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { servers } from '@/lib/community-data'
import { ServerMemberCountInline } from '@/components/ServerMemberCountInline'
import { LayoutGrid, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Servers',
  description: 'Browse all Open Box Discord servers — from gaming and development to study groups and networking. Free to join.',
  alternates: { canonical: '/servers' },
}

export default function ServersPage() {
  const liveServers = servers.filter((s) => s.isLive)
  const comingSoon = servers.filter((s) => !s.isLive)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      {/* Hero */}
      <div className="mb-12 rounded-3xl border border-black/10 bg-gradient-to-br from-black/[0.04] to-cyan-400/[0.08] p-5 shadow-sm dark:border-white/10 dark:from-white/[0.08] dark:to-cyan-400/[0.05] sm:p-10 lg:p-16 overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <LayoutGrid className="h-5 w-5 shrink-0 text-cyan-500 sm:h-6 sm:w-6" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300 sm:text-sm">Directory</p>
        </div>
        <h1 className="mb-3 text-2xl font-extrabold tracking-tight text-foreground w-full break-words sm:text-3xl lg:text-4xl">
          All Servers
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground/90 leading-relaxed sm:text-base lg:text-lg">
          Find your corner of Open Box. Join live servers now or watch upcoming spaces as they get ready.
        </p>
      </div>

      {/* Live Servers */}
      <section className="mb-12">
        <h2 className="text-lg font-bold mb-6 text-foreground">Live Now</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {liveServers.map((server, i) => (
            <Link
              key={server.slug}
              href={`/servers/${server.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/50 shadow-sm transition-all hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-lg min-h-[180px]"
            >
              <div className={`h-1 bg-gradient-to-r ${server.accent}`} />
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-md font-bold text-foreground">{server.name}</h3>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-none text-xs shrink-0 ml-2">
                    Live
                  </Badge>
                </div>
                <p className="text-m text-muted-foreground leading-relaxed flex-1 mb-4">
                  {server.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {server.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="capitalize text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {server.memberCount > 0 && (
                  <ServerMemberCountInline slug={server.slug} initialCount={server.memberCount} />
                )}
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity min-h-[32px]">
                  Visit Server <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      {comingSoon.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-6 text-foreground">Coming Soon</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoon.map((server) => (
              <div
                key={server.slug}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/30 opacity-60"
              >
                <div className={`h-1 bg-gradient-to-r ${server.accent} opacity-40`} />
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-md font-bold text-foreground">{server.name}</h3>
                    <Badge variant="outline" className="text-xs shrink-0 ml-2">
                      Soon
                    </Badge>
                  </div>
                  <p className="text-m text-muted-foreground leading-relaxed flex-1 mb-4">
                    {server.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {server.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="capitalize text-xs opacity-60">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
