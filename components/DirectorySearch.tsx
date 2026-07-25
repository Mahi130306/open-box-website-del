'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { servers } from '@/lib/community-data'
import { ServerMemberCountInline } from '@/components/ServerMemberCountInline'

const categories = ['All', 'community', 'development', 'gaming', 'learning']

export function DirectorySearch() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null)

  useEffect(() => {
    const handleQuizSelection = (e: Event) => {
      const val = (e as CustomEvent).detail.value
      let matchedCategory = 'All'
      let matchedSlug = null

      if (val === 'developer') {
        matchedCategory = 'development'
        matchedSlug = 'dev'
      } else if (val === 'gamer') {
        matchedCategory = 'gaming'
        matchedSlug = 'gg'
      } else if (val === 'learner') {
        matchedCategory = 'learning'
        matchedSlug = 'study'
      } else if (val === 'explorer') {
        matchedCategory = 'community'
        matchedSlug = 'jn'
      }

      setCategory(matchedCategory)
      setHighlightedSlug(matchedSlug)

      // Smooth scroll to Directory Section, respecting h-16 navbar with scroll-mt-20
      setTimeout(() => {
        const section = document.getElementById('directory-search-section')
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }

    window.addEventListener('quiz-selection', handleQuizSelection)
    return () => window.removeEventListener('quiz-selection', handleQuizSelection)
  }, [])

  const filtered = servers.filter((server) => {
    const matchesSearch = server.name.toLowerCase().includes(search.toLowerCase()) ||
      server.description.toLowerCase().includes(search.toLowerCase()) ||
      server.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = category === 'All' || server.tags.includes(category.toLowerCase())
    return matchesSearch && matchesCategory
  })

  return (
    <section id="directory-search-section" className="scroll-mt-20 border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center">Explore the Community</h2>

        {/* Category filtering buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={category.toLowerCase() === cat.toLowerCase() ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setCategory(cat)
                setHighlightedSlug(null) // clear highlight on manual click
              }}
              className="capitalize min-h-[44px] px-4 font-semibold text-sm"
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <Input
            type="search"
            placeholder="Search servers by name, description, or tag..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setHighlightedSlug(null) // clear highlight on typing search
            }}
            className="bg-surface border-border h-12"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((server) => {
            const isHighlighted = highlightedSlug === server.slug
            return (
              <Card
                key={server.slug}
                className={`flex flex-col overflow-hidden bg-surface transition-all duration-300 ${
                  isHighlighted
                    ? 'ring-2 ring-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] border-cyan-500 scale-[1.02]'
                    : 'border-border hover:-translate-y-1 hover:shadow-md'
                }`}
              >
                <div className={`h-1.5 bg-gradient-to-r ${server.accent}`} />
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-xl">{server.name}</CardTitle>
                    {isHighlighted && (
                      <Badge className="bg-cyan-500 text-black hover:bg-cyan-400 font-bold text-[10px] shrink-0 animate-pulse">
                        Quiz Match ✨
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-muted-foreground line-clamp-2">
                    {server.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {server.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {server.isLive && server.memberCount > 0 && (
                    <ServerMemberCountInline slug={server.slug} initialCount={server.memberCount} />
                  )}
                </CardContent>
                <CardFooter>
                  {server.isLive ? (
                    <Button asChild className="w-full min-h-[44px] text-sm font-semibold">
                      <Link href={`/servers/${server.slug}`}>
                        Visit Server
                      </Link>
                    </Button>
                  ) : (
                    <Button disabled className="w-full min-h-[44px] opacity-50 text-sm font-semibold">
                      Coming Soon
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
