import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getDocContent } from '@/lib/docs'
import { docs } from '@/lib/community-data'
import { TableOfContents } from '@/components/TableOfContents'
import { TTSPlayer } from '@/components/TTSPlayer'

export async function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const docMeta = docs.find(d => d.slug === slug)
  if (!docMeta) return {}
  const title = `${docMeta.title} — Open Box Docs`
  const description = docMeta.description
  const url = `https://openboxcomm.in/doc/${slug}`
  const imageUrl = 'https://openboxcomm.in/images/og-default.png'

  return {
    title,
    description,
    alternates: {
      canonical: `/doc/${slug}`,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: docMeta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const docMeta = docs.find(d => d.slug === slug)
  if (!docMeta) notFound()
  const docContent = getDocContent(slug)
  if (!docContent) notFound()
  const headings = docContent.sections.map(s => s.title)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Button asChild variant="outline" className="group min-h-[44px]">
          <Link href="/doc">
            <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Docs
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* TOC – shown below article on mobile, sticky sidebar on lg+ */}
        <aside className="order-2 lg:order-1">
          <div className="lg:sticky lg:top-24">
            <TableOfContents headings={headings} />
          </div>
        </aside>

        <article className="order-1 min-w-0 lg:order-2 tts-doc-content">
          <div className="mb-8 rounded-3xl border border-black/10 bg-gradient-to-br from-black/[0.04] to-lime-400/[0.08] p-8 shadow-sm dark:border-white/10 dark:from-white/[0.08] dark:to-lime-400/[0.05] sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 no-tts">
              {docMeta.section ? (
                <Badge variant="secondary" className="bg-lime-500/10 text-lime-600 dark:text-lime-400 border-none font-bold">
                  {docMeta.section}
                </Badge>
              ) : (
                <div />
              )}
              <TTSPlayer selector=".tts-doc-content" themeColor="teal" />
            </div>
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {docMeta.title}
            </h1>
            {docMeta.description && (
              <p className="text-base text-muted-foreground/90 sm:text-lg leading-relaxed">{docMeta.description}</p>
            )}
          </div>

          <div className="space-y-10">
            {docContent.sections.map((section) => (
              <div key={section.title} className="scroll-mt-24">
                <h2
                  id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                  className="mb-4 border-b border-border/50 pb-3 font-heading text-xl font-bold text-foreground sm:text-2xl lg:text-3xl"
                >
                  {section.title}
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground/90 sm:text-lg sm:leading-8">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-border/50 pt-8">
            <Button asChild variant="outline" className="group min-h-[44px]">
              <Link href="/doc">
                <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Docs
              </Link>
            </Button>
          </div>
        </article>
      </div>
    </div>
  )
}
