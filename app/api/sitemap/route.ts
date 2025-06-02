import { NextResponse } from "next/server"

export async function GET() {
  // Base URL of your website
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mawaisnazir.me"

  // Define your routes
  const routes = [
    {
      url: "/",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "/projects",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "/skills",
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "/services",
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "/blog",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "/contact",
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
    <url>
      <loc>${baseUrl}${route.url}</loc>
      <lastmod>${route.lastModified}</lastmod>
      <changefreq>${route.changeFrequency}</changefreq>
      <priority>${route.priority}</priority>
    </url>
  `,
    )
    .join("")}
</urlset>`

  // Return the XML with the correct content type
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
