import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'
// import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { RouteTransitionProvider } from '@/components/RouteTransitionProvider'
import { LoadingScreen } from '@/components/LoadingScreen'
import { ScrollToTop } from '@/components/ScrollToTop'
import { ConsentBanner } from '@/components/ConsentBanner'
import { SecurityGuard } from '@/components/SecurityGuard'
import { WhatsNewTab } from '@/components/WhatsNewTab'
import { UpdateBanner } from '@/components/UpdateBanner'
import { Inter, Syne } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const BASE_URL = 'https://openboxcomm.in'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Open Box — Community for Everyone',
    template: '%s — Open Box',
  },
  description: 'A community platform with multiple Discord servers. Join Open Box to build, learn, game, and connect free.',
  keywords: ['Open Box', 'Discord community', 'gaming server', 'developer community', 'study group', 'peer connections', 'free community', 'the best Discord community', 'the best tech community', 'open box community', 'open box comm', 'OB', 'ob', 'ob.net.in', 'obcomm', 'obcomm.in', 'obcommunity', 'obcommunity.in', 'obcommunity.net', 'openboxcommunity.in', 'openboxcommunity.net', 'openboxcommunity.org', 'obcommunity.org', 'obcommunity.org.in', 'openboxcommunity.org.in', 'the open box community', 'openboxcommunity.org.in'],
  authors: [{ name: 'Open Box', url: BASE_URL }],
  creator: 'Open Box',
  icons: {
    icon: '/images/OB.png',
    apple: '/images/OB.png',
    shortcut: '/images/OB.png',
  },
  openGraph: {
    title: 'Open Box — Community for Everyone',
    description: 'A community platform with multiple Discord servers. Join for gaming, development, learning, and peer connections.',
    url: BASE_URL,
    siteName: 'Open Box',
    images: [{ url: 'https://openboxcomm.in/images/og-default.png', width: 1200, height: 630, alt: 'Open Box Community' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Box — Community for Everyone',
    description: 'A community platform with multiple Discord servers. Join for gaming, development, learning, and peer connections.',
    images: ['/images/og-default.png'],
    site: '@Openboxcomm',
    creator: '@Openboxcomm',
  },
  alternates: { canonical: BASE_URL },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true }, 'max-image-preview': 'large', 'max-snippet': -1 },
  verification: { google: 'google-site-verification-code' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Open Box',
      description: 'A free community platform for gaming, development, learning, and peer connections.',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/OB.png`, width: 512, height: 512 },
      image: { '@type': 'ImageObject', url: `${BASE_URL}/images/og-default.png`, width: 1200, height: 630 },
      sameAs: [
        'https://discord.gg/7ZWckKU89J',
        'https://www.instagram.com/openboxcomm/',
        'https://x.com/Openboxcomm',
        'https://www.youtube.com/@obcommunities-yt',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Support',
        email: 'admin@openboxcomm.in',
        url: `${BASE_URL}/contact-us`,
      },
      foundingDate: '2021-01-01',
      areaServed: 'IN',
      knowsAbout: ['Gaming', 'Software Development', 'Community Building', 'Education'],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Open Box',
      description: 'A free community platform for gaming, development, learning, and peer connections.',
      publisher: { '@id': `${BASE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/servers?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${BASE_URL}/#breadcrumbs`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: BASE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Servers',
          item: `${BASE_URL}/servers`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Events',
          item: `${BASE_URL}/events`,
        },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#050505" />
        <meta name="msvalidate.01" content="E7F02EAA1582F97200DE2848358DE313" />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6088953454914497"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5B33KBB4');`}
        </Script>
        {/* End Google Tag Manager */}
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-58P0FR4M2T"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-58P0FR4M2T');
          `}
        </Script>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5B33KBB4"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ThemeProvider>
          <RouteTransitionProvider>
            <SecurityGuard />
            <ScrollToTop />
            <LoadingScreen />
            <Navbar />
            <main className="pt-16 min-h-screen">{children}</main>
            <WhatsNewTab />
            <Footer />
            <ConsentBanner />
            <UpdateBanner />
          </RouteTransitionProvider>
        </ThemeProvider>
        <SpeedInsights />
        {/* <Analytics /> */}
      </body>
    </html>
  )
}