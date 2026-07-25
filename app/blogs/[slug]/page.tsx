import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Github, Twitter, Instagram, Linkedin, Calendar, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { blogs, getBlog, getTeamMember } from '@/lib/community-data'
import { getBlogContent } from '@/lib/Blog'
import { TTSPlayer } from '@/components/TTSPlayer'

export function generateStaticParams() {
  return blogs
    .filter((blog: any) => blog.category !== 'dbw')
    .map((blog) => ({ slug: blog.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlog(slug)
  if (!post) return {}
  const title = `${post.title} — Open Box Blogs`
  const description = post.excerpt
  const url = `https://openboxcomm.in/blogs/${post.slug}`
  const imageUrl = 'https://openboxcomm.in/images/og-default.png'

  return {
    title,
    description,
    alternates: {
      canonical: `/blogs/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlog(slug)
  const content = getBlogContent(slug)

  if (!post || (post as any).category === 'dbw') notFound()

  const author = post.authorId ? getTeamMember(post.authorId) : undefined

  // Same server first, then fill with the most recent other posts.
  const relatedPosts = blogs
    .filter((b: any) => b.slug !== post.slug && b.category !== 'dbw')
    .sort((a: any, b: any) => {
      const aMatch = a.server === post.server ? 0 : 1
      const bMatch = b.server === post.server ? 0 : 1
      if (aMatch !== bMatch) return aMatch - bMatch
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, 3)

  const publishDate = new Date(post.date)
  const formattedPublishDate = publishDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  // NOTE: this is a synthetic "modified" date (publish + 1 day), not a real edit
  // timestamp. Kept for the existing JSON-LD contract, but no longer shown in the
  // UI since surfacing a fake "Last Updated" to readers is misleading.
  const modifiedDate = new Date(publishDate)
  modifiedDate.setDate(modifiedDate.getDate() + 1)

  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: modifiedDate.toISOString().split('T')[0],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://openboxcomm.in/blogs/${post.slug}`,
    },
    author: author
      ? {
        '@type': 'Person',
        name: author.name,
        jobTitle: author.role,
        image: author.avatar,
        description: author.bio,
        url: `https://openboxcomm.in/team/${author.slug}`,
        sameAs: Object.values(author.socials || {}).filter(Boolean),
      }
      : {
        '@type': 'Organization',
        name: 'Open Box Team',
        url: 'https://openboxcomm.in',
      },
    publisher: {
      '@type': 'Organization',
      name: 'Open Box',
      logo: {
        '@type': 'ImageObject',
        url: 'https://openboxcomm.in/images/OB.png',
      },
    },
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <Link
        href="/blogs"
        className="group mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-pink-500 min-h-[44px]"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        All posts
      </Link>

      <div className="tts-blog-content">
        <header className="mb-10 border-b border-border/50 pb-8">
          <Badge
            variant="secondary"
            className="mb-5 border-none bg-pink-500/10 text-pink-600 hover:bg-pink-500/20 dark:bg-pink-500/20 dark:text-pink-400"
          >
            {post.server}
          </Badge>

          <h1 className="mb-6 text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 no-tts">
            {author && (
              <Link
                href={`/team/${author.slug}`}
                className="flex items-center gap-2.5 text-sm font-semibold text-foreground transition-colors hover:text-pink-500 min-h-[44px] flex"
              >
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-pink-500/10 text-xs font-bold text-pink-600 dark:text-pink-400">
                  {author.avatar ? (
                    <Image src={author.avatar} alt={author.name} fill sizes="32px" className="object-cover" />
                  ) : (
                    initials(author.name)
                  )}
                </span>
                {author.name}
              </Link>
            )}
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={post.date}>{formattedPublishDate}</time>
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1.5 pl-2 border-l border-border/60">
              <TTSPlayer selector=".tts-blog-content" themeColor="cyan" />
            </span>
          </div>
        </header>

        <p className="mb-10 border-l-2 border-pink-500 pl-5 text-xl font-medium leading-snug text-foreground/90">
          {post.excerpt}
        </p>

        <div className="space-y-6 text-lg leading-8 text-foreground/80">
          {content ? (
            content.map((paragraph, index) => <p key={index}>{paragraph}</p>)
          ) : (
            <p className="text-muted-foreground">Content coming soon.</p>
          )}
        </div>
      </div>

      {author && (
        <div className="mt-16 rounded-xl border border-black/10 bg-zinc-50 p-6 dark:border-white/10 dark:bg-zinc-900/50">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-pink-500/10">
                {author.avatar ? (
                  <Image src={author.avatar} alt={author.name} fill sizes="56px" className="object-cover" />
                ) : (
                  <span className="text-lg font-bold text-pink-600 dark:text-pink-400">
                    {initials(author.name)}
                  </span>
                )}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-pink-500">Written by</span>
                <h3 className="mt-0.5 text-lg font-bold leading-tight text-foreground">{author.name}</h3>
                <p className="text-sm font-medium text-pink-600 dark:text-pink-400">{author.role}</p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end sm:gap-3">
              <Link
                href={`/team/${author.slug}`}
                className="text-sm font-bold text-pink-500 transition-colors hover:text-pink-600 dark:hover:text-pink-400 min-h-[44px] flex items-center"
              >
                View profile →
              </Link>
              {author.socials && (
                <div className="flex gap-3 text-muted-foreground">
                  {author.socials.github && (
                    <a
                      href={author.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-pink-500 min-h-[44px] flex items-center p-1"
                      aria-label={`${author.name}'s GitHub`}
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {author.socials.twitter && (
                    <a
                      href={author.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-pink-500 min-h-[44px] flex items-center p-1"
                      aria-label={`${author.name}'s Twitter`}
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  {author.socials.instagram && (
                    <a
                      href={author.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-pink-500 min-h-[44px] flex items-center p-1"
                      aria-label={`${author.name}'s Instagram`}
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  )}
                  {author.socials.linkedin && (
                    <a
                      href={author.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-pink-500 min-h-[44px] flex items-center p-1"
                      aria-label={`${author.name}'s LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-16 border-t border-border/50 pt-8">
        <Link
          href="/blogs"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-pink-500 min-h-[44px]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          All posts
        </Link>
      </div>

      {relatedPosts.length > 0 && (
        <div className="mt-12 border-t border-border/50 pt-10">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-500">
            Keep reading
          </span>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related: any) => {
              const relatedDate = new Date(related.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
              return (
                <Link
                  key={related.slug}
                  href={`/blogs/${related.slug}`}
                  className="group flex flex-col rounded-xl border border-black/10 bg-zinc-50 p-5 transition-colors hover:border-pink-500/40 dark:border-white/10 dark:bg-zinc-900/50"
                >
                  <Badge
                    variant="secondary"
                    className="mb-3 w-fit border-none bg-pink-500/10 text-pink-600 hover:bg-pink-500/20 dark:bg-pink-500/20 dark:text-pink-400"
                  >
                    {related.server}
                  </Badge>
                  <h4 className="mb-2 font-bold leading-snug text-foreground transition-colors group-hover:text-pink-500">
                    {related.title}
                  </h4>
                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {related.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <time dateTime={related.date}>{relatedDate}</time>
                    {related.readTime && (
                      <>
                        <span>·</span>
                        <Clock className="h-3 w-3" />
                        {related.readTime}
                      </>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </article>
  )
}
