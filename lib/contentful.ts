import { createClient } from "contentful"

// Initialize Contentful client with public environment variables
export const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN || "",
})

// Project type definition based on Contentful content model
export interface ProjectType {
  id: string
  title: string
  slug: string
  description: string
  fullDescription: string
  image: {
    url: string
    width: number
    height: number
    title: string
  }
  gallery: {
    url: string
    width: number
    height: number
    title: string
  }[]
  tags: string[]
  github: string
  demo: string
  date: string
  client: string
  featured: boolean
  features: string[]
  challenges: string[]
}

// Fetch all projects
export async function getAllProjects(): Promise<ProjectType[]> {
  try {
    console.log("Fetching projects from Contentful...")
    const response = await contentfulClient.getEntries({
      content_type: "project",
      order: "-fields.date",
    })

    console.log(`Found ${response.items.length} projects in Contentful`)

    return response.items.map((item: any) => {
      const fields = item.fields

      return {
        id: item.sys.id,
        title: fields.title || "",
        slug: fields.slug || "",
        description: fields.description || "",
        fullDescription: fields.fullDescription || "",
        image: fields.image?.fields.file
          ? {
              url: "https:" + fields.image.fields.file.url,
              width: fields.image.fields.file.details.image.width,
              height: fields.image.fields.file.details.image.height,
              title: fields.image.fields.title || "",
            }
          : {
              url: "/placeholder.svg?height=400&width=600",
              width: 600,
              height: 400,
              title: "Placeholder",
            },
        gallery: fields.gallery
          ? fields.gallery.map((img: any) => ({
              url: "https:" + img.fields.file.url,
              width: img.fields.file.details.image.width,
              height: img.fields.file.details.image.height,
              title: img.fields.title || "",
            }))
          : [],
        tags: fields.tags || [],
        github: fields.github || "",
        demo: fields.demo || "",
        date: fields.date || "",
        client: fields.client || "",
        featured: fields.featured || false,
        features: fields.features || [],
        challenges: fields.challenges || [],
      }
    })
  } catch (error) {
    console.error("Error fetching projects from Contentful:", error)
    return []
  }
}

// Fetch a single project by slug
export async function getProjectBySlug(slug: string): Promise<ProjectType | null> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: "project",
      "fields.slug": slug,
      limit: 1,
    })

    if (response.items.length === 0) {
      return null
    }

    const item = response.items[0]
    const fields = item.fields

    return {
      id: item.sys.id,
      title: fields.title || "",
      slug: fields.slug || "",
      description: fields.description || "",
      fullDescription: fields.fullDescription || "",
      image: fields.image?.fields.file
        ? {
            url: "https:" + fields.image.fields.file.url,
            width: fields.image.fields.file.details.image.width,
            height: fields.image.fields.file.details.image.height,
            title: fields.image.fields.title || "",
          }
        : {
            url: "/placeholder.svg?height=400&width=600",
            width: 600,
            height: 400,
            title: "Placeholder",
          },
      gallery: fields.gallery
        ? fields.gallery.map((img: any) => ({
            url: "https:" + img.fields.file.url,
            width: img.fields.file.details.image.width,
            height: img.fields.file.details.image.height,
            title: img.fields.title || "",
          }))
        : [],
      tags: fields.tags || [],
      github: fields.github || "",
      demo: fields.demo || "",
      date: fields.date || "",
      client: fields.client || "",
      featured: fields.featured || false,
      features: fields.features || [],
      challenges: fields.challenges || [],
    }
  } catch (error) {
    console.error("Error fetching project from Contentful:", error)
    return null
  }
}

// Get all project slugs for static paths
export async function getAllProjectSlugs() {
  try {
    const response = await contentfulClient.getEntries({
      content_type: "project",
      select: "fields.slug",
    })

    return response.items.map((item: any) => ({
      params: { slug: item.fields.slug },
    }))
  } catch (error) {
    console.error("Error fetching project slugs from Contentful:", error)
    return []
  }
}

// Check if Contentful is properly configured
export function isContentfulConfigured(): boolean {
  return Boolean(
    (process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID) &&
      (process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN),
  )
}
