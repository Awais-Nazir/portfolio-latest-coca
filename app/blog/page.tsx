"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"
import { getAllBlogPosts } from "@/lib/contentful-blog"
import type { BlogPostType } from "@/lib/contentful-blog"
import BlogFilter from "@/components/blog-filter"

// Fallback data in case Contentful fails
const fallbackPosts = [
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

export default function BlogPage() {
  const [isClient, setIsClient] = useState(false)
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPostType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsClient(true)

    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true)
        console.log("Fetching blog posts...")

        const posts = await getAllBlogPosts()

        if (posts && posts.length > 0) {
          console.log(`Successfully fetched ${posts.length} blog posts`)
          setBlogPosts(posts)
          setFilteredPosts(posts)
        } else {
          console.log("No blog posts found, using fallback data")
          setBlogPosts(fallbackPosts)
          setFilteredPosts(fallbackPosts)
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error)
        setBlogPosts(fallbackPosts)
        setFilteredPosts(fallbackPosts)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  // Function to clear all filters
  const clearFilters = () => {
    setFilteredPosts(blogPosts)
  }

  if (!isClient) {
    return null // Return nothing during SSR to prevent hydration errors
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        </div>

        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-in">
              My <span className="text-gradient-python">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground animate-in">
              Thoughts, insights, and tutorials on software engineering, data science, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-python-blue animate-spin"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-python-yellow/30"></div>
              </div>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-4">No blog posts found</h3>
              <p className="text-muted-foreground mb-8">Check back later for new content!</p>
            </div>
          ) : (
            <>
              {/* Blog Filter */}
              <BlogFilter posts={blogPosts} onFilter={setFilteredPosts} />

              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-bold mb-4">No matching blog posts found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPosts.map((post, index) => (
                    <div key={post.id} className="animate-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <a
                        href={post.externalUrl || `/blog/${post.slug}`}
                        target={post.externalUrl ? "_blank" : "_self"}
                        rel={post.externalUrl ? "noopener noreferrer" : ""}
                        className="group block h-full"
                      >
                        <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                          <div className="relative aspect-video overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />
                            <Image
                              src={post.coverImage.url || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {post.externalUrl && (
                              <div className="absolute top-4 right-4 z-20">
                                <Badge className="bg-python-yellow text-black font-medium px-3 py-1 flex items-center gap-1">
                                  <ExternalLink className="h-3 w-3" /> Medium
                                </Badge>
                              </div>
                            )}
                          </div>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                              <time className="text-sm text-muted-foreground">
                                {new Date(post.publishDate).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </time>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground">{post.readTime}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {post.tags.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{post.tags.length - 2} more
                                </Badge>
                              )}
                            </div>

                            <div className="mt-4 flex items-center text-python-blue font-medium">
                              <span>Read article</span>
                              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                          </CardContent>
                        </Card>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
