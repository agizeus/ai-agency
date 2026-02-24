import { MetadataRoute } from 'next'

// ============================================================================
// ROBOTS.TXT KONFIGURATION
// Datei: app/robots.ts
// ============================================================================

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://deine-domain.de'
  
  return {
    rules: [
      // Standard: Alle dürfen crawlen
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '/drafts/',
          '/*.json$'
        ]
      },
      
      // GPTBot (OpenAI) - optional blockieren
      {
        userAgent: 'GPTBot',
        disallow: '/'
      },
      
      // ChatGPT-User - optional blockieren
      {
        userAgent: 'ChatGPT-User',
        disallow: '/'
      },
      
      // Google-Extended - optional blockieren
      {
        userAgent: 'Google-Extended',
        disallow: '/'
      },
      
      // CCbot - optional blockieren
      {
        userAgent: 'CCBot',
        disallow: '/'
      }
    ],
    
    // Sitemap URL
    sitemap: `${baseUrl}/sitemap.xml`,
    
    // Host (optional)
    host: baseUrl
  }
}

// ============================================================================
// ALTERNATIV: Statische robots.txt
// Datei: public/robots.txt
// ============================================================================

const staticRobotsTxt = `
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/
Disallow: /drafts/
Disallow: /*.json$

User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: Google-Extended
Disallow: /

Sitemap: https://deine-domain.de/sitemap.xml
Host: https://deine-domain.de
`
