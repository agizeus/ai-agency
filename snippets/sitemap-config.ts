import { MetadataRoute } from 'next'

// ============================================================================
// SITEMAP KONFIGURATION
// Datei: app/sitemap.ts
// ============================================================================

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://deine-domain.de'
  
  // Statische Routen
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3
    }
  ]
  
  // Dynamische Routen (z.B. aus CMS/DB)
  // const posts = await getAllPosts()
  // const postRoutes = posts.map(post => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6
  // }))
  
  // return [...staticRoutes, ...postRoutes]
  return staticRoutes
}

// ============================================================================
// MULTI-SITEMAP (für große Sites)
// ============================================================================

// app/sitemap.xml/route.ts
export async function GET() {
  const baseUrl = 'https://deine-domain.de'
  
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${baseUrl}/sitemap-pages.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${baseUrl}/sitemap-blog.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${baseUrl}/sitemap-products.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>
    </sitemapindex>`
  
  return new Response(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml'
    }
  })
}
