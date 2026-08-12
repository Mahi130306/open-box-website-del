'use client'

import React from 'react'

/**
 * Common skeleton elements / building blocks
 */
function SkeletonLine({ className = 'h-4 w-full' }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-muted/60 dark:bg-neutral-800/60 ${className}`} />
  )
}

function SkeletonCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/40 p-5 shadow-xs">
      {children}
    </div>
  )
}

/**
 * 1. Home Page Skeleton
 */
export function HomeSkeleton() {
  return (
    <div className="flex flex-col">
      {/* Marquee Banner */}
      <div className="h-10 bg-muted/30" />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            <SkeletonLine className="h-7 w-40 rounded-full" />
            <SkeletonLine className="h-12 sm:h-16 w-3/4" />
            <div className="space-y-3">
              <SkeletonLine className="h-4 w-full" />
              <SkeletonLine className="h-4 w-5/6" />
              <SkeletonLine className="h-4 w-4/5" />
            </div>
            <div className="flex flex-wrap gap-3 pt-4">
              <SkeletonLine className="h-12 w-44" />
              <SkeletonLine className="h-12 w-44" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="border-b border-border bg-surface/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 mb-12">
            <SkeletonLine className="h-8 w-60" />
            <SkeletonLine className="h-4 w-full" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i}>
                <div className="space-y-4">
                  <SkeletonLine className="h-10 w-10" />
                  <SkeletonLine className="h-5 w-32" />
                  <SkeletonLine className="h-3 w-full" />
                  <SkeletonLine className="h-3 w-5/6" />
                </div>
              </SkeletonCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

/**
 * 2. About Page Skeleton
 */
export function AboutSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      {/* Hero Header */}
      <div className="mb-12 rounded-3xl border border-border bg-surface/40 p-5 sm:p-10 lg:p-16">
        <div className="space-y-4">
          <SkeletonLine className="h-6 w-36" />
          <SkeletonLine className="h-10 sm:h-12 w-4/5" />
          <SkeletonLine className="h-4 w-3/4" />
        </div>
      </div>

      <div className="grid gap-16 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-12">
          <section className="space-y-4">
            <SkeletonLine className="h-8 w-40" />
            <div className="space-y-3">
              <SkeletonLine className="h-4 w-full" />
              <SkeletonLine className="h-4 w-11/12" />
              <SkeletonLine className="h-4 w-5/6" />
            </div>
          </section>
        </div>
        <aside className="lg:col-span-2">
          <div className="rounded-3xl border border-border bg-surface/40 p-8 space-y-6">
            <SkeletonLine className="h-6 w-32" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <SkeletonLine className="h-10 w-10 shrink-0" />
                <div className="flex-1 space-y-2">
                  <SkeletonLine className="h-4 w-28" />
                  <SkeletonLine className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}

/**
 * 3. Servers List Page Skeleton
 */
export function ServersSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      {/* Hero Header */}
      <div className="mb-12 rounded-3xl border border-border bg-surface/40 p-5 sm:p-10 lg:p-16">
        <div className="space-y-4">
          <SkeletonLine className="h-6 w-32" />
          <SkeletonLine className="h-10 w-64" />
          <SkeletonLine className="h-4 w-4/5" />
        </div>
      </div>

      {/* Grid of Servers */}
      <section className="space-y-6">
        <SkeletonLine className="h-6 w-32" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i}>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <SkeletonLine className="h-5 w-24" />
                  <SkeletonLine className="h-5 w-12" />
                </div>
                <SkeletonLine className="h-4 w-full" />
                <SkeletonLine className="h-4 w-5/6" />
                <div className="flex gap-2">
                  <SkeletonLine className="h-5 w-14" />
                  <SkeletonLine className="h-5 w-14" />
                </div>
                <SkeletonLine className="h-4 w-24 pt-2" />
              </div>
            </SkeletonCard>
          ))}
        </div>
      </section>
    </div>
  )
}

/**
 * 4. Individual Server Detail Page Skeleton
 */
export function ServerDetailSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="border-b border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <SkeletonLine className="h-24 w-24 shrink-0 rounded-2xl" />
            <div className="flex-1 space-y-3">
              <div className="flex gap-2">
                <SkeletonLine className="h-5 w-14" />
                <SkeletonLine className="h-5 w-20" />
              </div>
              <SkeletonLine className="h-10 w-48" />
              <SkeletonLine className="h-4 w-3/4" />
            </div>
            <SkeletonLine className="h-12 w-32 shrink-0 rounded-full" />
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <SkeletonLine className="h-7 w-40" />
              <div className="space-y-2">
                <SkeletonLine className="h-4 w-full" />
                <SkeletonLine className="h-4 w-full" />
                <SkeletonLine className="h-4 w-5/6" />
              </div>
            </div>
            <div className="space-y-4">
              <SkeletonLine className="h-7 w-40" />
              <div className="grid gap-3 sm:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <SkeletonLine key={i} className="h-12 rounded-xl" />
                ))}
              </div>
            </div>
          </div>
          <aside className="space-y-5">
            <div className="rounded-2xl border border-border bg-surface/40 p-6 space-y-4">
              <SkeletonLine className="h-12 w-full rounded-xl" />
              <div className="space-y-2 pt-2">
                <SkeletonLine className="h-10 w-full" />
                <SkeletonLine className="h-10 w-full" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

/**
 * 5. Events List Page Skeleton
 */
export function EventsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="mb-12 text-center space-y-4">
        <div className="inline-flex justify-center">
          <SkeletonLine className="h-7 w-48 rounded-full" />
        </div>
        <SkeletonLine className="mx-auto h-12 w-80 sm:w-[500px]" />
        <SkeletonLine className="mx-auto h-4 w-3/4 sm:w-[600px]" />
      </div>

      {/* Controls Bar */}
      <div className="mb-8 h-16 rounded-2xl border border-border bg-surface/40" />

      {/* Grid of Events */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i}>
            <div className="space-y-4">
              <div className="flex gap-2">
                <SkeletonLine className="h-6 w-16" />
                <SkeletonLine className="h-6 w-24" />
              </div>
              <div className="flex gap-3">
                <SkeletonLine className="h-12 w-12 shrink-0 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <SkeletonLine className="h-5 w-40" />
                  <SkeletonLine className="h-3 w-28" />
                </div>
              </div>
              <SkeletonLine className="h-4 w-full" />
              <SkeletonLine className="h-4 w-5/6" />
              <div className="flex justify-between items-center pt-2">
                <div className="flex gap-2">
                  <SkeletonLine className="h-5 w-12" />
                  <SkeletonLine className="h-5 w-12" />
                </div>
                <SkeletonLine className="h-4 w-14" />
              </div>
            </div>
          </SkeletonCard>
        ))}
      </div>
    </div>
  )
}

/**
 * 6. Individual Event Detail Page Skeleton
 */
export function EventDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SkeletonLine className="mb-6 h-9 w-32" />

      {/* Hero Card */}
      <div className="mb-8 rounded-3xl border border-border bg-surface/30 p-6 sm:p-8 lg:p-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
          <div className="flex-1 space-y-4">
            <div className="flex gap-2">
              <SkeletonLine className="h-5 w-14" />
              <SkeletonLine className="h-5 w-20" />
              <SkeletonLine className="h-5 w-24" />
            </div>
            <SkeletonLine className="h-10 sm:h-12 w-3/4" />
            <div className="space-y-2">
              <SkeletonLine className="h-4 w-full" />
              <SkeletonLine className="h-4 w-5/6" />
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <SkeletonLine className="h-8 w-44" />
              <SkeletonLine className="h-8 w-44" />
            </div>
          </div>
          <div className="shrink-0 flex gap-4 lg:flex-col items-center lg:items-end">
            <SkeletonLine className="h-28 w-28 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Sidebar Layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <SkeletonLine className="h-12 w-full rounded-xl" />
          <div className="rounded-2xl border border-border p-6 space-y-4">
            <SkeletonLine className="h-6 w-32" />
            <div className="space-y-2">
              <SkeletonLine className="h-4 w-full" />
              <SkeletonLine className="h-4 w-full" />
              <SkeletonLine className="h-4 w-5/6" />
            </div>
          </div>
        </div>
        <aside className="space-y-5">
          <div className="rounded-2xl border border-border bg-surface/40 p-6 space-y-4">
            <SkeletonLine className="h-6 w-24" />
            <SkeletonLine className="h-10 w-full" />
            <SkeletonLine className="h-10 w-full" />
          </div>
        </aside>
      </div>
    </div>
  )
}

/**
 * 7. Blogs Page Skeleton
 */
export function BlogsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="mb-10 rounded-xl border border-border bg-surface/40 p-8">
        <div className="space-y-4">
          <SkeletonLine className="h-5 w-24" />
          <SkeletonLine className="h-10 sm:h-12 w-48" />
          <SkeletonLine className="h-4 w-3/4" />
        </div>
      </div>

      {/* Search Input */}
      <SkeletonLine className="mb-8 h-12 max-w-2xl" />

      {/* Blog Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i}>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <SkeletonLine className="h-5 w-16" />
                <SkeletonLine className="h-3 w-16" />
              </div>
              <SkeletonLine className="h-6 w-4/5" />
              <div className="space-y-2">
                <SkeletonLine className="h-4 w-full" />
                <SkeletonLine className="h-4 w-5/6" />
              </div>
              <SkeletonLine className="h-3 w-20 pt-2" />
              <SkeletonLine className="h-4 w-24" />
            </div>
          </SkeletonCard>
        ))}
      </div>
    </div>
  )
}

/**
 * 8. Blog Detail Page Skeleton
 */
export function BlogDetailSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <SkeletonLine className="mb-8 h-9 w-32" />
      <div className="space-y-4 mb-8">
        <SkeletonLine className="h-5 w-16" />
        <SkeletonLine className="h-10 sm:h-12 w-full" />
        <div className="flex gap-4">
          <SkeletonLine className="h-4 w-24" />
          <SkeletonLine className="h-4 w-20" />
        </div>
      </div>
      <div className="border-t border-border pt-8 space-y-6">
        <div className="space-y-3">
          <SkeletonLine className="h-4 w-full" />
          <SkeletonLine className="h-4 w-11/12" />
          <SkeletonLine className="h-4 w-full" />
        </div>
        <div className="space-y-3">
          <SkeletonLine className="h-4 w-5/6" />
          <SkeletonLine className="h-4 w-full" />
          <SkeletonLine className="h-4 w-4/5" />
        </div>
      </div>
    </div>
  )
}

/**
 * 9. Docs Page Skeleton (Lists / Search)
 */
export function DocsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      {/* Hero Header */}
      <div className="mb-12 rounded-3xl border border-border bg-surface/40 p-5 sm:p-10 lg:p-16">
        <div className="space-y-4">
          <SkeletonLine className="h-6 w-32" />
          <SkeletonLine className="h-10 w-48" />
          <SkeletonLine className="h-4 w-4/5" />
        </div>
      </div>

      {/* Search Input */}
      <SkeletonLine className="mb-8 h-12 max-w-2xl" />

      {/* Docs Categories & Cards */}
      <div className="grid gap-8 md:grid-cols-2">
        {[1, 2].map((category) => (
          <div key={category} className="space-y-4">
            <SkeletonLine className="h-6 w-40" />
            <div className="grid gap-4">
              {[1, 2].map((i) => (
                <SkeletonCard key={i}>
                  <div className="space-y-3">
                    <SkeletonLine className="h-5 w-32" />
                    <SkeletonLine className="h-3 w-full" />
                    <SkeletonLine className="h-4 w-24 pt-1" />
                  </div>
                </SkeletonCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * 10. Doc Detail Page Skeleton
 */
export function DocDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-4">
        {/* Doc Sidebar */}
        <div className="hidden lg:block space-y-4">
          <SkeletonLine className="h-6 w-32" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonLine key={i} className="h-8 w-full" />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <SkeletonLine className="h-10 w-3/4" />
          <div className="flex gap-4">
            <SkeletonLine className="h-4 w-20" />
            <SkeletonLine className="h-4 w-16" />
          </div>
          <div className="border-t border-border pt-6 space-y-4">
            <SkeletonLine className="h-4 w-full" />
            <SkeletonLine className="h-4 w-full" />
            <SkeletonLine className="h-4 w-5/6" />
            <SkeletonLine className="h-8 w-40 pt-4" />
            <SkeletonLine className="h-4 w-11/12" />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 11. Help / FAQ Page Skeleton
 */
export function HelpSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center space-y-4">
        <div className="inline-flex justify-center">
          <SkeletonLine className="h-7 w-32 rounded-full" />
        </div>
        <SkeletonLine className="mx-auto h-12 w-64 sm:w-[400px]" />
        <SkeletonLine className="mx-auto h-4 w-3/4 sm:w-[500px]" />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <SkeletonLine className="h-12 w-full rounded-xl" />
          <div className="space-y-3 pt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-5 border border-border rounded-xl space-y-2">
                <SkeletonLine className="h-5 w-1/2" />
                <SkeletonLine className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-surface/40 p-6 space-y-4">
            <SkeletonLine className="h-6 w-32" />
            <SkeletonLine className="h-10 w-full" />
            <SkeletonLine className="h-12 w-full" />
          </div>
        </aside>
      </div>
    </div>
  )
}

/**
 * 12. Support / Sponsor Page Skeleton
 */
export function SupportSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center space-y-4">
        <SkeletonLine className="mx-auto h-12 w-80 sm:w-[500px]" />
        <SkeletonLine className="mx-auto h-4 w-3/4 sm:w-[600px]" />
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i}>
            <div className="space-y-4 p-4 text-center flex flex-col items-center">
              <SkeletonLine className="h-8 w-24 rounded-full" />
              <SkeletonLine className="h-10 w-32" />
              <SkeletonLine className="h-4 w-full" />
              <div className="space-y-1.5 w-full pt-4">
                <SkeletonLine className="h-3 w-5/6 mx-auto" />
                <SkeletonLine className="h-3 w-4/5 mx-auto" />
              </div>
              <SkeletonLine className="h-11 w-full rounded-xl mt-6" />
            </div>
          </SkeletonCard>
        ))}
      </div>
    </div>
  )
}

/**
 * 13. Legal/Policy Page Skeleton
 */
export function LegalSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-4 animate-pulse">
        {/* Sidebar Nav */}
        <div className="hidden lg:block space-y-3">
          <div className="h-6 w-32 rounded bg-muted/60" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-full rounded bg-muted/60" />
            ))}
          </div>
        </div>

        {/* Legal Text Panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="h-10 w-3/4 rounded bg-muted/60" />
          <div className="h-4 w-28 rounded bg-muted/60" />
          <div className="border-t border-border pt-6 space-y-4">
            <div className="h-4 w-full rounded bg-muted/60" />
            <div className="h-4 w-full rounded bg-muted/60" />
            <div className="h-4 w-11/12 rounded bg-muted/60" />
            <div className="h-6 w-48 rounded bg-muted/60 pt-4" />
            <div className="h-4 w-full rounded bg-muted/60" />
            <div className="h-4 w-5/6 rounded bg-muted/60" />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 14. Default fallback/simple page skeleton (e.g. Careers, Join, Team etc.)
 */
export function DefaultSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <SkeletonLine className="h-12 w-2/3" />
        <SkeletonLine className="h-6 w-1/3" />
        <div className="border-t border-border pt-8 space-y-4">
          <SkeletonLine className="h-4 w-full" />
          <SkeletonLine className="h-4 w-full" />
          <SkeletonLine className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  )
}

/**
 * Skeleton router mapping paths to page-specific skeleton components
 */
export function getSkeletonForPath(path: string) {
  if (path === '/') return <HomeSkeleton />
  if (path === '/about') return <AboutSkeleton />
  if (path === '/servers') return <ServersSkeleton />
  if (path.startsWith('/servers/')) return <ServerDetailSkeleton />
  if (path === '/events') return <EventsSkeleton />
  if (path.startsWith('/events/')) return <EventDetailSkeleton />
  if (path === '/blogs' || path === '/blog') return <BlogsSkeleton />
  if (path.startsWith('/blogs/') || path.startsWith('/blog/')) return <BlogDetailSkeleton />
  if (path === '/doc' || path === '/docs') return <DocsSkeleton />
  if (path.startsWith('/doc/') || path.startsWith('/docs/')) return <DocDetailSkeleton />
  if (path === '/help' || path === '/help/faq') return <HelpSkeleton />
  if (path === '/support' || path === '/sponsor') return <SupportSkeleton />
  if (path.startsWith('/legal')) return <LegalSkeleton />
  return <DefaultSkeleton />
}
