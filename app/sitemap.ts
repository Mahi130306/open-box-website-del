import type { MetadataRoute } from 'next'
import { servers, events, blogs, docs, teamMembers } from '@/lib/community-data'

const BASE_URL = 'https://openboxcomm.in'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // 1. Static pages of the website
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/join`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/servers`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/events`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/blogs`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/doc`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/team`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact-us`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/support`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/help`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    // Legal policies
    { url: `${BASE_URL}/legal/community-rules`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/legal/refund-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/legal/dmca-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/legal/acceptable-use-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/legal/event-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/legal/terms-and-conditions`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/legal/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/legal/cookie-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // 2. Dynamic servers pages (/servers/[slug])
  const serverRoutes: MetadataRoute.Sitemap = servers
    .filter((s) => s.isLive)
    .map((s) => ({
      url: `${BASE_URL}/servers/${s.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

  // 3. Dynamic events pages (/events/[id])
  const eventRoutes: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${BASE_URL}/events/${e.id}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.9,
  }))

  // 4. Dynamic blogs pages (/blogs/[slug])
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${BASE_URL}/blogs/${b.slug}`,
    lastModified: new Date(b.date),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  // 5. Dynamic documentation pages (/doc/[slug])
  const docRoutes: MetadataRoute.Sitemap = docs.map((d) => ({
    url: `${BASE_URL}/doc/${d.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // 6. Dynamic team member pages (/team/[slug])
  const teamRoutes: MetadataRoute.Sitemap = teamMembers.map((t) => ({
    url: `${BASE_URL}/team/${t.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [
    ...staticRoutes,
    ...serverRoutes,
    ...eventRoutes,
    ...blogRoutes,
    ...docRoutes,
    ...teamRoutes,
  ]
}
