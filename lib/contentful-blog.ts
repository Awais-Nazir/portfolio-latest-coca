import { createClient } from "contentful"

// Create the Contentful client
const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
})

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

// Fallback blog posts for when Contentful fails
const fallbackBlogPosts: BlogPostType[] = [
  {
    id: "1",
    title: "Getting Started with Python for Data Science",
    excerpt: "Learn the basics of Python and how to use it for data science projects.",
    publishDate: "2023-12-15",
    coverImage: {
      url: "/placeholder.svg?height=400&width=600",
      width: 600,
      height: 400,
      title: "Python for Data Science",
    },
    tags: ["Python", "Data Science", "Beginners"],
    slug: "getting-started-with-python-for-data-science",
    readTime: "5 min read",
    externalUrl: "https://medium.com/@awaisnazir/getting-started-with-python-for-data-science",
  },
  {
    id: "2",
    title: "Building Responsive UIs with TailwindCSS",
    excerpt: "A comprehensive guide to creating responsive user interfaces using TailwindCSS.",
    publishDate: "2023-11-20",
    coverImage: {
      url: "/placeholder.svg?height=400&width=600",
      width: 600,
      height: 400,
      title: "TailwindCSS UI",
    },
    tags: ["Web Development", "TailwindCSS", "CSS"],
    slug: "building-responsive-uis-with-tailwindcss",
    readTime: "7 min read",
    externalUrl: "https://medium.com/@awaisnazir/building-responsive-uis-with-tailwindcss",
  },
]

// Fetch all blog posts
export async function getAllBlogPosts(): Promise<BlogPostType[]> {
  try {
    console.log("Fetching blog posts from Contentful...")

    // Check if we have valid credentials
    if (!process.env.CONTENTFUL_SPACE_ID && !process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
      console.warn("Contentful Space ID is missing. Using fallback blog posts.")
      return fallbackBlogPosts
    }

    if (!process.env.CONTENTFUL_ACCESS_TOKEN && !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
      console.warn("Contentful Access Token is missing. Using fallback blog posts.")
      return fallbackBlogPosts
    }

    const response = await contentfulClient.getEntries({
      content_type: "blogPost",
      order: "-fields.publishDate",
    })

    console.log(`Found ${response.items.length} blog posts in Contentful`)

    if (response.items.length === 0) {
      console.log("No blog posts found in Contentful. Using fallback data.")
      return fallbackBlogPosts
    }

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
    return fallbackBlogPosts
  }
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPostType | null> {
  try {
    // Check if we have valid credentials
    if (!process.env.CONTENTFUL_SPACE_ID && !process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
      console.warn("Contentful Space ID is missing. Cannot fetch blog post.")
      return null
    }

    if (!process.env.CONTENTFUL_ACCESS_TOKEN && !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
      console.warn("Contentful Access Token is missing. Cannot fetch blog post.")
      return null
    }

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
