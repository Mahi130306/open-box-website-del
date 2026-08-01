/// <reference types="node" />
import { NextResponse } from 'next/server'
import sitemap from '@/app/sitemap'

const BASE_URL = 'https://openboxcomm.in'
const INDEXNOW_KEY = 'eefb2bed56144c93aa1eba6a9e5d9a98'
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`

// IndexNow batch submission endpoints (Bing + Yandex both use the same protocol)
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
]

async function getSitemapUrls(): Promise<string[]> {
  try {
    const resolvedSitemap = await sitemap()
    return resolvedSitemap.map((item) => item.url)
  } catch (error) {
    console.error('Failed to resolve sitemap URLs:', error)
    return []
  }
}

async function submitToEndpoint(endpoint: string, urls: string[]) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: 'openboxcomm.in',
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  })
  return { endpoint, status: res.status, ok: res.ok }
}

/**
 * POST /api/indexnow
 *
 * Submits all site URLs to IndexNow (Bing + Yandex).
 * Secure this with an INDEXNOW_SECRET env var so only authorized callers
 * (e.g. your CI/CD pipeline) can trigger it.
 *
 * Usage from deploy script:
 *   curl -X POST https://openboxcomm.in/api/indexnow \
 *     -H "x-indexnow-secret: YOUR_SECRET"
 */
export async function POST(request: Request) {
  // Optional: protect the endpoint with a secret token
  const secret = process.env.INDEXNOW_SECRET
  if (secret) {
    const provided = request.headers.get('x-indexnow-secret')
    if (provided !== secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    const urls = await getSitemapUrls()
    const results = await Promise.all(INDEXNOW_ENDPOINTS.map((endpoint) => submitToEndpoint(endpoint, urls)))
    const allOk = results.every((r) => r.ok || r.status === 202)

    return NextResponse.json(
      {
        success: allOk,
        submitted: urls.length,
        results: results.map((r) => ({ endpoint: r.endpoint, status: r.status })),
      },
      { status: allOk ? 200 : 207 }
    )
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to submit URLs', detail: String(err) },
      { status: 500 }
    )
  }
}

/**
 * GET /api/indexnow
 * Returns current submission config for debugging (no sensitive data).
 */
export async function GET() {
  try {
    const urls = await getSitemapUrls()
    return NextResponse.json({
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlCount: urls.length,
      endpoints: INDEXNOW_ENDPOINTS,
      urls: urls,
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to retrieve current configuration', detail: String(err) },
      { status: 500 }
    )
  }
}

