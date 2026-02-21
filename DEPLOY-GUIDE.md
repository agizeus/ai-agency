# 🚀 AI Agency Deployment Guide

> Komplette Anleitung für Production-Deployment, SEO & Analytics

---

## 📋 Inhaltsverzeichnis

1. [Vercel Deployment](#vercel-deployment)
2. [Domain & DNS Setup](#domain--dns-setup)
3. [SEO Meta-Tags](#seo-meta-tags)
4. [OG-Images Konzept](#og-images-konzept)
5. [Analytics Setup](#analytics-setup)

---

## Vercel Deployment

### Schnellstart

```bash
# 1. Repository verbinden
git push origin main

# 2. Vercel CLI installieren
npm i -g vercel

# 3. Deploy
vercel --prod
```

### Detaillierte Schritte

#### 1. Vercel Projekt erstellen

```bash
# Login
vercel login

# Projekt initialisieren
vercel

# Production Deploy
vercel --prod
```

#### 2. Umgebungsvariablen setzen

In Vercel Dashboard → Project Settings → Environment Variables:

```
# Required
NEXT_PUBLIC_SITE_URL=https://deine-domain.de

# Optional - Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=deine-domain.de
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional - CMS/API
CMS_API_KEY=xxx
WEBHOOK_SECRET=xxx
```

#### 3. Build-Einstellungen

**vercel.json** (im Root):

```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["fra1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/robots.txt",
      "destination": "/api/robots"
    },
    {
      "source": "/sitemap.xml",
      "destination": "/api/sitemap"
    }
  ]
}
```

#### 4. GitHub Integration

1. Vercel Dashboard → Git Integration
2. Repository auswählen
3. Deploy Hooks für automatische Deployments

---

## Domain & DNS Setup

### Domain registrieren

**Empfohlene Registrar:**
- Cloudflare Registrar (bestes DNS + günstig)
- Namecheap (günstig, zuverlässig)
- Porkbun (modern, günstig)

### DNS-Konfiguration (Cloudflare)

#### Schritt 1: Nameserver ändern

Beim Domain-Registrar Cloudflare Nameserver eintragen:
```
elma.ns.cloudflare.com
carlos.ns.cloudflare.com
```

#### Schritt 2: DNS Records

**Typische Konfiguration:**

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | @ | 76.76.21.21 | ✅ | 
| CNAME | www | cname.vercel-dns.com | ✅ |
| TXT | _vercel | vc-domain-verify=xxx | ❌ |
| MX | @ | mx1.forwardemail.net | ❌ |
| TXT | @ | v=spf1 include:_spf.forwardemail.net ~all | ❌ |

**Für Vercel:**

```
# Root Domain (A Record)
Type: A
Name: @
Content: 76.76.21.21
TTL: Auto
Proxy: ON (orange cloud)

# WWW (CNAME)
Type: CNAME
Name: www
Content: cname.vercel-dns.com
TTL: Auto
Proxy: ON
```

#### Schritt 3: SSL/TLS

Cloudflare → SSL/TLS → Overview:
- **Mode:** Full (strict)
- **Always Use HTTPS:** ON
- **Automatic HTTPS Rewrites:** ON
- **HSTS:** Enable (optional)

#### Schritt 4: Vercel Domain verbinden

1. Vercel Dashboard → Domains
2. "Add Domain" → deine-domain.de
3. Vercel zeigt DNS-Records → In Cloudflare eintragen
4. Warten auf Validierung (5-60 Minuten)

### Subdomains (optional)

| Subdomain | Zweck | Target |
|-----------|-------|--------|
| app. | Dashboard/Application | app.vercel.app |
| api. | API Endpoints | api.vercel.app |
| blog. | Blog (CMS) | blog.vercel.app |
| status. | Statuspage | statuspage.io |

---

## SEO Meta-Tags

### Next.js Metadata API (App Router)

**app/layout.tsx** oder **app/page.tsx**:

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  // Basic
  title: {
    default: 'AI Agency | KI-Lösungen für Unternehmen',
    template: '%s | AI Agency'
  },
  description: 'Wir entwickeln maßgeschneiderte KI-Lösungen, die Ihr Unternehmen voranbringen. Automatisierung, Chatbots, Data Science.',
  
  // Keywords (optional, weniger wichtig heute)
  keywords: ['KI', 'AI', 'Automatisierung', 'Chatbots', 'Data Science', 'Unternehmen'],
  
  // Canonical
  alternates: {
    canonical: '/'
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://deine-domain.de',
    siteName: 'AI Agency',
    title: 'AI Agency | KI-Lösungen für Unternehmen',
    description: 'Wir entwickeln maßgeschneiderte KI-Lösungen für Ihr Unternehmen.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Agency - KI-Lösungen für Unternehmen'
      }
    ]
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@dein_handle',
    creator: '@dein_handle',
    title: 'AI Agency | KI-Lösungen für Unternehmen',
    description: 'Wir entwickeln maßgeschneiderte KI-Lösungen für Ihr Unternehmen.',
    images: ['/og-image.jpg']
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-16x16.png'
  },
  
  // Manifest
  manifest: '/manifest.json',
  
  // Verification
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    other: {
      'msvalidate.01': 'bing-verification-code'
    }
  },
  
  // Authors
  authors: [{ name: 'AI Agency Team' }],
  creator: 'AI Agency',
  publisher: 'AI Agency',
  
  // Category
  category: 'technology'
}
```

### Dynamische Metadata (für Unterseiten)

```typescript
// app/services/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unsere Services',
  description: 'Entdecken Sie unsere KI-Services: Automatisierung, Chatbots, Machine Learning.',
  openGraph: {
    title: 'Unsere Services | AI Agency',
    description: 'Entdecken Sie unsere KI-Services.',
    images: ['/og-services.jpg']
  }
}
```

### Dynamisch generierte Metadata

```typescript
// app/blog/[slug]/page.tsx
import { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage]
    }
  }
}
```

### JSON-LD Structured Data

```typescript
// app/page.tsx
import Script from 'next/script'

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Agency',
    description: 'KI-Lösungen für Unternehmen',
    url: 'https://deine-domain.de',
    logo: 'https://deine-domain.de/logo.png',
    sameAs: [
      'https://twitter.com/dein_handle',
      'https://linkedin.com/company/deine-firma'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+49-xxx-xxx',
      contactType: 'sales',
      areaServed: 'DE',
      availableLanguage: ['German', 'English']
    }
  }

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page content */}
    </>
  )
}
```

### robots.ts (Next.js 13+)

```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/']
      },
      {
        userAgent: 'GPTBot',
        disallow: '/'
      }
    ],
    sitemap: 'https://deine-domain.de/sitemap.xml'
  }
}
```

### sitemap.ts (Next.js 13+)

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://deine-domain.de'
  
  const routes = [
    '',
    '/services',
    '/about',
    '/blog',
    '/contact',
    '/impressum',
    '/datenschutz'
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8
  }))
}
```

---

## OG-Images Konzept

### Auto-Generated OG Images (Next.js)

```typescript
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'AI Agency'
export const size = {
  width: 1200,
  height: 630
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          color: 'white',
          padding: '40px'
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 'bold', marginBottom: 20 }}>
          AI Agency
        </div>
        <div style={{ fontSize: 36, color: '#64ffda' }}>
          KI-Lösungen für Unternehmen
        </div>
      </div>
    ),
    { ...size }
  )
}
```

### Dynamische OG Images

```typescript
// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'
import { getPost } from '@/lib/posts'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#1a1a2e',
          color: 'white',
          padding: '60px'
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 20 }}>
          {post.title}
        </div>
        <div style={{ fontSize: 24, color: '#a0a0a0' }}>
          {post.excerpt.slice(0, 150)}...
        </div>
      </div>
    ),
    { ...size }
  )
}
```

### Design-Vorlage (Figma/Canva)

**Spezifikationen:**

| Eigenschaft | Wert |
|-------------|------|
| Größe | 1200 × 630 px |
| Format | PNG oder JPG |
| Max. Dateigröße | 8 MB |
| Aspect Ratio | 1.91:1 |

**Design-Elemente:**

```
┌─────────────────────────────────────┐
│  [Logo/Brand]                       │
│                                     │
│  HAUPTTITEL (max 60 Zeichen)        │
│  Untertitel (max 100 Zeichen)       │
│                                     │
│  [Visuelles Element/Grafik]         │
│                                     │
│                    www.domain.de    │
└─────────────────────────────────────┘
```

**Brand-Template:**
- **Hintergrund:** Primary Brand Color oder Gradient
- **Logo:** Oben links (max 200px breit)
- **Typografie:** Hauptschrift, weiß oder dunkel
- **Akzentfarbe:** Sekundäre Brand Color für Highlights
- **URL:** Unten rechts, klein

---

## Analytics Setup

### Option 1: Plausible (Privacy-First, Empfohlen)

#### Self-Hosted (empfohlen für DSGVO)

```yaml
# docker-compose.yml
version: '3.8'
services:
  plausible:
    image: plausible/analytics:latest
    container_name: plausible
    restart: always
    ports:
      - "8000:8000"
    environment:
      - BASE_URL=https://analytics.deine-domain.de
      - SECRET_KEY_BASE=xxx-generate-with-openssl-rand-base64-48
      - DATABASE_URL=postgres://postgres:password@db:5432/plausible
    depends_on:
      - db
      - clickhouse

  db:
    image: postgres:15-alpine
    container_name: plausible_db
    restart: always
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=password

  clickhouse:
    image: clickhouse/clickhouse-server:latest
    container_name: plausible_clickhouse
    restart: always
    volumes:
      - event-data:/var/lib/clickhouse

volumes:
  db-data:
  event-data:
```

#### Cloud-Hosted (einfacher)

1. Registrieren: https://plausible.io
2. Domain hinzufügen
3. Tracking-Code kopieren

#### Next.js Integration

```typescript
// components/PlausibleScript.tsx
export default function PlausibleScript() {
  return (
    <script
      defer
      data-domain="deine-domain.de"
      src="https://plausible.io/js/script.js"
    />
  )
}

// app/layout.tsx
import PlausibleScript from '@/components/PlausibleScript'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <PlausibleScript />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

#### Next.js Plausible Provider

```bash
npm install next-plausible
```

```typescript
// app/providers.tsx
'use client'
import PlausibleProvider from 'next-plausible'

export function Providers({ children }) {
  return (
    <PlausibleProvider domain="deine-domain.de">
      {children}
    </PlausibleProvider>
  )
}

// app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

#### Custom Events

```typescript
'use client'
import { usePlausible } from 'next-plausible'

export function ContactButton() {
  const plausible = usePlausible()

  return (
    <button
      onClick={() => {
        plausible('Contact Click')
      }}
    >
      Kontakt
    </button>
  )
}
```

### Option 2: Google Analytics 4

#### Setup

1. Google Analytics → Admin → Property erstellen
2. Datenstrom hinzufügen (Web)
3. Measurement ID kopieren (G-XXXXXXXXXX)

#### Next.js Integration

```typescript
// components/GoogleAnalytics.tsx
'use client'

import Script from 'next/script'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_location: window.location.href,
              page_path: window.location.pathname,
            });
          `
        }}
      />
    </>
  )
}
```

#### Event Tracking

```typescript
// lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Page view
type GTagEvent = {
  action: string
  category: string
  label: string
  value?: number
}

export function pageview(url: string) {
  window.gtag('config', GA_TRACKING_ID!, {
    page_path: url
  })
}

export function event({ action, category, label, value }: GTagEvent) {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}

// Usage in component
import { event } from '@/lib/gtag'

<button onClick={() => event({
  action: 'click',
  category: 'contact',
  label: 'email'
})}>
  Email
</button>
```

### Option 3: Beide kombinieren (Fallback)

```typescript
// app/layout.tsx
import PlausibleScript from '@/components/PlausibleScript'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <PlausibleScript />
        <GoogleAnalytics />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## 📊 Zusammenfassung: Checkliste

### Pre-Launch

- [ ] Vercel Projekt erstellt
- [ ] Domain registriert & DNS eingerichtet
- [ ] SSL/TLS aktiviert
- [ ] Umgebungsvariablen gesetzt
- [ ] Build erfolgreich

### SEO

- [ ] Meta-Tags auf allen Seiten
- [ ] Open Graph Tags vorhanden
- [ ] Twitter Cards konfiguriert
- [ ] JSON-LD Structured Data
- [ ] robots.txt erstellt
- [ ] sitemap.xml generiert
- [ ] Favicon & Icons vorhanden

### OG-Images

- [ ] Statisches OG-Image (1200×630)
- [ ] Dynamische OG-Images für Blog/Seiten
- [ ] Brand-Konsistenz geprüft

### Analytics

- [ ] Plausible oder GA4 eingerichtet
- [ ] Tracking-Code eingebunden
- [ ] Custom Events definiert
- [ ] Cookie-Banner falls nötig (DSGVO)

### Post-Launch Tests

- [ ] Lighthouse Score > 90
- [ ] Mobile-Friendly Test
- [ ] Rich Results Test
- [ ] Social Share Preview (Facebook, LinkedIn, Twitter)
- [ ] Analytics Daten ankommend

---

## 🔗 Ressourcen

- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Vercel Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)
- [Plausible Analytics](https://plausible.io/docs)
- [Google Search Console](https://search.google.com/search-console)
- [Open Graph Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

**Erstellt von:** Hephaistos (CMO) | Olymp Holding  
**Datum:** 2026-02-19  
**Version:** 1.0
