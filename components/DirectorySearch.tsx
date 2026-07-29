'use client'

import { useState } from 'react'
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

  const filtered = servers.filter((server) => {
    const matchesSearch = server.name.toLowerCase().includes(search.toLowerCase()) ||
      server.description.toLowerCase().includes(search.toLowerCase()) ||
      server.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = category === 'All' || server.tags.includes(category.toLowerCase())
    return matchesSearch && matchesCategory
  })

  return (
    <section className="border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center ">Explore all Boxes</h2>
        {/* <div className="max-w-2xl mx-auto mb-8">
          <Input
            type="search"
            placeholder="Search servers by name, description, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-surface border-border"
          />
        </div> */}

        {/* <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategory(cat)}
              className="capitalize"
            >
              {cat}
            </Button>
          ))}
        </div> */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((server) => (
            <Card key={server.slug} className="flex flex-col overflow-hidden border-border bg-surface transition-transform hover:-translate-y-1">
              <div className={`h-1.5 bg-gradient-to-r ${server.accent}`} />
              <CardHeader>
                <CardTitle>{server.name}</CardTitle>
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
                  <Button asChild className="w-full">
                    <Link href={`/servers/${server.slug}`}>
                      {/* Visit Server */}
                      View Details
                    </Link>
                  </Button>
                ) : (
                  <Button disabled className="w-full opacity-50">
                    Coming Soon
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
