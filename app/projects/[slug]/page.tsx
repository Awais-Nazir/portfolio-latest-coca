"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound, useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github, Calendar, User } from "lucide-react"
import { fallbackProjects } from "@/lib/project-data"
import { contentfulClient } from "@/lib/contentful"
import type { ProjectType } from "@/lib/contentful"

export default function ProjectPage() {
  const params = useParams<{ slug: string }>()
  const [isClient, setIsClient] = useState(false)
  const [project, setProject] = useState<ProjectType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)

    const fetchProject = async () => {
      try {
        setIsLoading(true)
        console.log(`Fetching project with slug: ${params.slug}`)

        // Now that we have NEXT_PUBLIC_ variables, we can use the contentfulClient directly
        const response = await contentfulClient.getEntries({
          content_type: "project",
          "fields.slug": params.slug,
          limit: 1,
        })

        console.log("Contentful response:", response)

        if (response.items && response.items.length > 0) {
          const item = response.items[0]
          const fields = item.fields

          const contentfulProject: ProjectType = {
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

          console.log("Processed Contentful project:", contentfulProject)
          setProject(contentfulProject)
          setActiveImage(contentfulProject.image.url)
        } else {
          console.log("Project not found in Contentful, checking fallback data")
          const fallbackProject = fallbackProjects.find((p) => p.slug === params.slug) || null

          if (fallbackProject) {
            console.log("Found project in fallback data")
            setProject(fallbackProject)
            setActiveImage(fallbackProject.image.url)
          } else {
            console.log("Project not found in fallback data either")
            setError("Project not found")
          }
        }
      } catch (error) {
        console.error("Error fetching project:", error)
        setError("Failed to fetch project details")

        // Try fallback data
        const fallbackProject = fallbackProjects.find((p) => p.slug === params.slug) || null
        if (fallbackProject) {
          setProject(fallbackProject)
          setActiveImage(fallbackProject.image.url)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [params.slug])

  useEffect(() => {
    if (isClient && !isLoading && !project && !error) {
      notFound()
    }
  }, [isClient, isLoading, project, error])

  if (!isClient || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-python-blue animate-spin"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-python-yellow/30"></div>
        </div>
      </div>
    )
  }

  if (error && !project) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-muted-foreground mb-8">{error}</p>
        <Button asChild>
          <Link href="/projects">Back to Projects</Link>
        </Button>
      </div>
    )
  }

  if (!project) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        </div>

        <div className="container px-4 md:px-6">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-python-yellow transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {project.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="px-3 py-1 bg-python-blue/5 border-python-blue/20">
                {tag}
              </Badge>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-6 mb-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>
                {new Date(project.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>{project.client}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Button
              asChild
              variant="outline"
              className="btn-hover-effect border-python-blue/50 hover:border-python-blue hover:bg-python-blue/10"
            >
              <Link href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> View on GitHub
              </Link>
            </Button>
            <Button
              asChild
              className="btn-hover-effect bg-gradient-to-r from-python-blue to-python-yellow text-white hover:opacity-90"
            >
              <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2">
                {/* Main Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-video overflow-hidden rounded-xl border border-border/50 mb-8"
                >
                  <Image src={activeImage || project.image.url} alt={project.title} fill className="object-cover" />
                </motion.div>

                {/* Thumbnail Gallery */}
                {project.gallery.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-4 gap-4 mb-12"
                  >
                    <div
                      className={`relative aspect-video rounded-lg border overflow-hidden cursor-pointer transition-all ${
                        activeImage === project.image.url
                          ? "border-python-blue ring-2 ring-python-blue/20"
                          : "border-border/50 hover:border-python-blue/50"
                      }`}
                      onClick={() => setActiveImage(project.image.url)}
                    >
                      <Image
                        src={project.image.url || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {project.gallery.map((image, index) => (
                      <div
                        key={index}
                        className={`relative aspect-video rounded-lg border overflow-hidden cursor-pointer transition-all ${
                          activeImage === image.url
                            ? "border-python-blue ring-2 ring-python-blue/20"
                            : "border-border/50 hover:border-python-blue/50"
                        }`}
                        onClick={() => setActiveImage(image.url)}
                      >
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={`${project.title} screenshot ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {project.fullDescription.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="mb-4 text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="sticky top-24">
                  <div className="bg-muted/30 rounded-xl border border-border/50 p-6">
                    <h3 className="text-xl font-bold mb-4">Key Features</h3>
                    <ul className="space-y-2 mb-8">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-python-yellow mt-1">✓</span>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-xl font-bold mb-4">Challenges</h3>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-python-blue mt-1">•</span>
                          <span className="text-muted-foreground">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-python-blue/10 via-transparent to-python-yellow/5" />
        </div>

        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Explore More Projects</h2>
            <Button
              asChild
              size="lg"
              className="btn-hover-effect bg-gradient-to-r from-python-blue to-python-yellow text-white hover:opacity-90"
            >
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
