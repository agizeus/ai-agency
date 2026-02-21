import { Metadata } from 'next'

// ============================================================================
// SEO METADATA CONFIGURATION
// Kopiere dies in deine app/layout.tsx oder app/page.tsx
// ============================================================================

export const metadata: Metadata = {
  // --- Basic Meta ---
  title: {
    default: 'AI Agency | KI-Lösungen für Unternehmen',
    template: '%s | AI Agency'
  },
  description: 'Wir entwickeln maßgeschneiderte KI-Lösungen, die Ihr Unternehmen voranbringen. Automatisierung, Chatbots, Data Science.',
  keywords: ['KI', 'AI', 'Automatisierung', 'Chatbots', 'Data Science', 'Unternehmen', 'Machine Learning'],
  
  // --- Canonical URL ---
  alternates: {
    canonical: '/',
    languages: {
      'de-DE': '/de',
      'en-US': '/en'
    }
  },
  
  // --- Robots ---
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  
  // --- Open Graph (Facebook, LinkedIn, etc.) ---
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    alternateLocale: ['en_US'],
    url: 'https://deine-domain.de',
    siteName: 'AI Agency',
    title: 'AI Agency | KI-Lösungen für Unternehmen',
    description: 'Wir entwickeln maßgeschneiderte KI-Lösungen für Ihr Unternehmen.',
    images: [
      {
        url: 'https://deine-domain.de/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Agency - KI-Lösungen für Unternehmen'
      }
    ]
  },
  
  // --- Twitter Card ---
  twitter: {
    card: 'summary_large_image',
    site: '@dein_handle',
    creator: '@dein_handle',
    title: 'AI Agency | KI-Lösungen für Unternehmen',
    description: 'Wir entwickeln maßgeschneiderte KI-Lösungen für Ihr Unternehmen.',
    images: ['https://deine-domain.de/og-image.jpg']
  },
  
  // --- Icons & Manifest ---
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon-16x16.png'
  },
  
  manifest: '/manifest.json',
  
  // --- Verification (Search Console) ---
  verification: {
    google: 'DEIN_GOOGLE_VERIFICATION_CODE',
    yandex: 'DEIN_YANDEX_CODE',
    other: {
      'msvalidate.01': 'DEIN_BING_CODE',
      'facebook-domain-verification': 'DEIN_FB_CODE'
    }
  },
  
  // --- Authorship ---
  authors: [{ name: 'AI Agency Team', url: 'https://deine-domain.de/team' }],
  creator: 'AI Agency',
  publisher: 'AI Agency',
  
  // --- Category & Classification ---
  category: 'technology',
  classification: 'Business, Technology, Artificial Intelligence',
  
  // --- Referrer ---
  referrer: 'origin-when-cross-origin',
  
  // --- Other ---
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false
  },
  
  // --- App-specific ---
  applicationName: 'AI Agency',
  generator: 'Next.js'
}

// ============================================================================
// DYNAMISCHE METADATA (für Unterseiten)
// ============================================================================

// app/services/page.tsx
export const servicesMetadata: Metadata = {
  title: 'Unsere Services',
  description: 'Entdecken Sie unsere KI-Services: Automatisierung, Chatbots, Machine Learning und mehr.',
  openGraph: {
    title: 'Unsere Services | AI Agency',
    description: 'Entdecken Sie unsere KI-Services: Automatisierung, Chatbots, Machine Learning.',
    images: ['https://deine-domain.de/og-services.jpg']
  },
  alternates: {
    canonical: '/services'
  }
}

// ============================================================================
// DYNAMISCH GENERIERTE METADATA (mit Datenbank/CMS)
// ============================================================================

interface Props {
  params: { slug: string }
}

// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // const post = await getPost(params.slug)
  
  return {
    title: params.slug, // post.title
    description: `Artikel über ${params.slug}`, // post.excerpt
    openGraph: {
      title: params.slug,
      description: `Artikel über ${params.slug}`,
      // images: [post.coverImage],
      type: 'article',
      authors: ['AI Agency Team'],
      publishedTime: new Date().toISOString(),
      modifiedTime: new Date().toISOString()
    },
    twitter: {
      card: 'summary_large_image',
      title: params.slug,
      description: `Artikel über ${params.slug}`
    },
    alternates: {
      canonical: `/blog/${params.slug}`
    }
  }
}
