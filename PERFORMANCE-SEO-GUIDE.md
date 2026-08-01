# Performance & SEO Guide

## Overview

This document outlines all performance and SEO optimizations implemented in Open Box website, and provides guidelines for maintaining and improving these metrics.

---

## 1. Core Web Vitals Optimization

### What Are Core Web Vitals?

Core Web Vitals are three key metrics that Google uses to measure user experience:

1. **LCP (Largest Contentful Paint)** — How fast the largest visible element loads
   - Target: < 2.5 seconds
   - Optimization: Image optimization, lazy loading, CDN usage

2. **FID (First Input Delay)** — Response time to user input
   - Target: < 100 milliseconds
   - Optimization: Code splitting, async JavaScript, efficient event handlers

3. **CLS (Cumulative Layout Shift)** — Visual stability during loading
   - Target: < 0.1
   - Optimization: Reserved image dimensions, stable fonts, avoid DOM mutations

### Implemented Optimizations

#### Image Optimization
- ✅ Next.js Image component with automatic optimization
- ✅ WebP/AVIF format support for modern browsers
- ✅ Responsive image sizing (640px to 3840px)
- ✅ Lazy loading for below-fold images
- ✅ Priority loading for hero images (LCP optimization)
- ✅ Reserved aspect ratios to prevent CLS

**Usage:**
```tsx
import Image from 'next/image'
import { imageOptimizationConfig } from '@/lib/image-optimization'

export function HeroImage() {
  return (
    <Image
      src="/images/hero.jpg"
      alt="Hero image"
      width={1200}
      height={630}
      priority // Load eagerly for LCP
      sizes="(max-width: 768px) 100vw, (max-width: 1536px) 80vw, 1200px"
      quality={85}
    />
  )
}
```

#### JavaScript Optimization
- ✅ Code splitting with dynamic imports
- ✅ Defer non-critical scripts
- ✅ Async loading for analytics and third-party scripts
- ✅ Route-based code splitting

#### CSS Optimization
- ✅ Tailwind CSS with PurgeCSS (removes unused styles)
- ✅ Critical CSS inlined in head
- ✅ Deferred non-critical stylesheets

---

## 2. Structured Data (JSON-LD)

### Implemented Schema Types

#### Organization Schema
Identifies Open Box as an organization and helps Google understand the brand.

```json
{
  "@type": "Organization",
  "name": "Open Box",
  "url": "https://openboxcomm.in",
  "logo": "https://openboxcomm.in/images/OB.png",
  "sameAs": [
    "https://discord.gg/7ZWckKU89J",
    "https://x.com/Openboxcomm",
    "https://www.instagram.com/openboxcomm/"
  ]
}
```

#### WebSite Schema
Enables site-wide search functionality in Google results (sitelinks search box).

```json
{
  "@type": "WebSite",
  "url": "https://openboxcomm.in",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://openboxcomm.in/servers?q={search_term}"
  }
}
```

#### BreadcrumbList Schema
Improves navigation in Google Search results with breadcrumb trails.

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"position": 1, "name": "Home", "item": "https://openboxcomm.in"},
    {"position": 2, "name": "Servers", "item": "https://openboxcomm.in/servers"},
    {"position": 3, "name": "Events", "item": "https://openboxcomm.in/events"}
  ]
}
```

### Validation

Test JSON-LD markup at: https://search.google.com/test/rich-results

---

## 3. Open Graph & Twitter Meta Tags

### Implemented Meta Tags

All pages automatically get:
- `og:title` — Page title for sharing
- `og:description` — Page summary
- `og:image` — Social media preview image (1200x630px)
- `og:url` — Canonical URL
- `og:site_name` — Brand name
- `twitter:card` — Card type (summary_large_image)
- `twitter:creator` — Creator handle

### Example Sharing Preview

When you share "https://openboxcomm.in" on Twitter or Facebook:
- **Title:** Open Box — Community for Everyone
- **Description:** A community network with multiple Discord servers...
- **Image:** 1200x630px preview image

### Adding Page-Specific OG Tags

```tsx
export const metadata: Metadata = {
  title: 'Events — Open Box',
  description: 'Explore Open Box events...',
  openGraph: {
    title: 'Events — Open Box',
    description: 'Explore upcoming Open Box events...',
    type: 'website',
    url: '/events',
    images: [{
      url: '/images/og-events.png',
      width: 1200,
      height: 630,
      alt: 'Open Box Events'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events — Open Box',
    description: 'Explore upcoming Open Box events...',
    images: ['/images/og-events.png'],
  },
}
```

---

## 4. SEO Meta Tags

### Robots & Crawling

```html
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
```

- `index` — Allow Google to index the page
- `follow` — Allow Google to follow links
- `max-image-preview:large` — Show large image previews in search results
- `max-snippet:-1` — No limit on snippet length

### Canonical Tags

```html
<link rel="canonical" href="https://openboxcomm.in">
```

Prevents duplicate content issues and consolidates link equity.

### Sitemap & Robots.txt

- **Sitemap:** `/public/sitemap.xml` (static, also defined in `app/sitemap.ts`)
- **Robots.txt:** `/public/robots.txt`

### IndexNow Integration

IndexNow is supported to instantly notify search engines (such as Bing and Yandex) whenever content is updated.

- **Verification File:** `/eefb2bed56144c93aa1eba6a9e5d9a98.txt` (located at `public/eefb2bed56144c93aa1eba6a9e5d9a98.txt`).
- **Submission Endpoint:** `/api/indexnow` (accessible via POST).
- **Triggering Submission:**
  You can trigger URL submissions to IndexNow by sending a POST request to `/api/indexnow`. If the `INDEXNOW_SECRET` environment variable is defined, you must provide it in the header:
  ```bash
  curl -X POST https://openboxcomm.in/api/indexnow \
    -H "x-indexnow-secret: YOUR_INDEXNOW_SECRET"
  ```

---

## 5. Image Optimization Best Practices

### Image Format Strategy

| Format | Use Case | Pros |
|--------|----------|------|
| **AVIF** | Modern browsers | Best compression (20-30% smaller) |
| **WebP** | Fallback | Good compression (25% smaller than JPEG) |
| **JPEG** | Legacy support | Wide compatibility |
| **PNG** | Transparency needed | Lossless quality |
| **SVG** | Icons, logos | Scalable, tiny file size |

Next.js automatically serves the best format based on browser support.

### Image Sizing Guidelines

```tsx
// Hero/banner images (LCP optimization)
<Image src="hero.jpg" width={1200} height={630} priority quality={85} />

// Card images
<Image src="card.jpg" width={300} height={200} loading="lazy" quality={75} />

// Thumbnails
<Image src="thumb.jpg" width={96} height={96} loading="lazy" quality={60} />
```

### Responsive Image Sizes

Use `sizes` prop to tell the browser which image size to request:

```tsx
<Image
  src="image.jpg"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
  // On mobile: request full width
  // On tablet: request 90% of viewport
  // On desktop: request 1200px version
/>
```

---

## 6. Performance Monitoring

### Tools & Services

1. **Google PageSpeed Insights** — https://pagespeed.web.dev
   - Measures Core Web Vitals
   - Provides optimization recommendations

2. **Google Search Console** — https://search.google.com/search-console
   - Monitor indexing status
   - View search performance
   - Check Core Web Vitals metrics

3. **Lighthouse** — Built into Chrome DevTools (F12 → Lighthouse)
   - Audits performance, accessibility, SEO
   - Generates detailed reports

### Running Local Performance Audits

```bash
# Install lighthouse-cli (optional)
npm install -g @lhci/cli@latest

# Run audit on local site
lighthouse http://localhost:3000
```

---

## 7. SEO Checklist

### On-Page SEO

- ✅ Unique, descriptive title tags (50-60 chars)
- ✅ Meta descriptions (120-160 chars)
- ✅ H1 headers (one per page)
- ✅ Proper heading hierarchy (H1 → H2 → H3...)
- ✅ Internal linking with descriptive anchor text
- ✅ Alt text for all images
- ✅ Mobile-friendly design (responsive)
- ✅ Fast page load speed (< 3 seconds)

### Technical SEO

- ✅ XML sitemap submitted to Google Search Console
- ✅ Robots.txt configured
- ✅ HTTPS enabled
- ✅ Canonical tags for duplicate content
- ✅ Structured data (JSON-LD)
- ✅ Mobile viewport meta tag
- ✅ Proper redirects for renamed routes (301)

### Content SEO

- ✅ Keyword research and implementation
- ✅ Content relevance to search intent
- ✅ Regular content updates
- ✅ Internal linking strategy
- ✅ Fresh, original content

---

## 8. Recommended Future Improvements

### High Priority

1. **Image CDN Integration**
   - Use Cloudflare or Bunny CDN for image delivery
   - Reduces LCP and bandwidth costs

2. **Service Worker Caching**
   - Cache static assets for faster repeat visits
   - Improves FID on return visits

3. **Font Optimization**
   - Subset fonts to reduce file size
   - Use `font-display: swap` to prevent FOIT

4. **Core Web Vitals Monitoring**
   - Set up real-time monitoring with Sentry or DataBox
   - Alert on performance regressions

### Medium Priority

1. **Advanced Image Compression**
   - Use custom image optimization service
   - Implement progressive image loading

2. **Prefetch/Preload Strategy**
   - Prefetch likely next pages
   - Preload critical resources

3. **Database Query Optimization**
   - Add caching for frequently accessed data
   - Optimize database indices

### Low Priority

1. **HTTP/2 Server Push**
2. **CSS-in-JS optimization**
3. **GraphQL for efficient data fetching**

---

## 9. Image Optimization Utilities

### Available Utilities in `lib/image-optimization.ts`

```tsx
import {
  imageOptimizationConfig,
  getImageSrcSet,
  getImageSizes,
  imageLoadingStrategy,
  imagePlaceholders,
  aspectRatios,
} from '@/lib/image-optimization'

// Example: Generate responsive srcSet
const srcSet = getImageSrcSet('/images/example.jpg')

// Example: Get responsive sizes
const sizes = getImageSizes(isMobile)

// Example: Use loading strategy
<Image
  {...imageLoadingStrategy.hero}
  src="hero.jpg"
  alt="Hero"
/>
```

### Available Utilities in `lib/performance.ts`

```tsx
import {
  preloadFonts,
  preconnectUrls,
  dnsPrefetchUrls,
  getOptimalImageDimensions,
  webVitalsOptimizationTips,
} from '@/lib/performance'

// Example: Get optimal dimensions
const { width, height } = getOptimalImageDimensions(1920, 1080, 1200)
```

---

## 10. Maintenance & Monitoring

### Monthly Tasks

1. Run PageSpeed Insights audit
2. Check Google Search Console for errors
3. Review Core Web Vitals trends
4. Audit broken links and redirects

### Quarterly Tasks

1. Update images and social media previews
2. Refresh sitemap
3. Review and update schema markup
4. Analyze search performance in Google Analytics

### Annual Tasks

1. Comprehensive SEO audit
2. Competitor analysis
3. Content strategy review
4. Accessibility audit (WCAG 2.1)

---

## References

- **Web Vitals:** https://web.dev/vitals/
- **Google Search Central:** https://developers.google.com/search
- **Schema.org:** https://schema.org/
- **Next.js Image Optimization:** https://nextjs.org/docs/basic-features/image-optimization
- **Open Graph Protocol:** https://ogp.me/
