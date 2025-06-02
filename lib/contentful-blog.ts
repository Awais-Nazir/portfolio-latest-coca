import { contentfulClient } from "./contentful"

// Blog post type definition based on Contentful content model
export interface BlogPostType {
  id: string
  title: string
  slug: string
  excerpt: string
  content?: string
  coverImage: {
    url: string
    width: number
    height: number
    title: string
  }
  tags: string[]
  publishDate: string
  externalUrl?: string // For Medium links
  readTime: string
}

// Fetch all blog posts
export async function getAllBlogPosts(): Promise<BlogPostType[]> {
  try {
    console.log("Fetching blog posts from Contentful...")
    const response = await contentfulClient.getEntries({
      content_type: "blogPost",
      order: "-fields.publishDate",
    })

    console.log(`Found ${response.items.length} blog posts in Contentful`)

    return response.items.map((item: any) => {
      const fields = item.fields

      return {
        id: item.sys.id,
        title: fields.title || "",
        slug: fields.slug || "",
        excerpt: fields.excerpt || "",
        content: fields.content || "",
        coverImage: fields.coverImage?.fields.file
          ? {
              url: "https:" + fields.coverImage.fields.file.url,
              width: fields.coverImage.fields.file.details.image.width,
              height: fields.coverImage.fields.file.details.image.height,
              title: fields.coverImage.fields.title || "",
            }
          : {
              url: "/placeholder.svg?height=400&width=600",
              width: 600,
              height: 400,
              title: "Placeholder",
            },
        tags: fields.tags || [],
        publishDate: fields.publishDate || "",
        externalUrl: fields.externalUrl || "",
        readTime: fields.readTime || "5 min read",
      }
    })
  } catch (error) {
    console.error("Error fetching blog posts from Contentful:", error)
    return []
  }
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPostType | null> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: "blogPost",
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
      excerpt: fields.excerpt || "",
      content: fields.content || "",
      coverImage: fields.coverImage?.fields.file
        ? {
            url: "https:" + fields.coverImage.fields.file.url,
            width: fields.coverImage.fields.file.details.image.width,
            height: fields.coverImage.fields.file.details.image.height,
            title: fields.coverImage.fields.title || "",
          }
        : {
            url: "/placeholder.svg?height=400&width=600",
            width: 600,
            height: 400,
            title: "Placeholder",
          },
      tags: fields.tags || [],
      publishDate: fields.publishDate || "",
      externalUrl: fields.externalUrl || "",
      readTime: fields.readTime || "5 min read",
    }
  } catch (error) {
    console.error("Error fetching blog post from Contentful:", error)
    return null
  }
}
