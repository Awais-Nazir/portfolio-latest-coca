"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import ProjectCard from "@/components/project-card"
import ProjectFilter from "@/components/project-filter"
import MasonryGrid from "@/components/masonry-grid"
import { fallbackProjects } from "@/lib/project-data"
import { contentfulClient } from "@/lib/contentful"
import type { ProjectType } from "@/lib/contentful"

export default function ProjectsPage() {
  const [isClient, setIsClient] = useState(false)
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [filteredProjects, setFilteredProjects] = useState<ProjectType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)

    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        console.log("Fetching projects from Contentful...")

        // Now that we have NEXT_PUBLIC_ variables, we can use the contentfulClient directly
        const response = await contentfulClient.getEntries({
          content_type: "project",
          order: "-fields.date",
        })

        console.log(`Found ${response.items.length} projects in Contentful`)

        if (response.items && response.items.length > 0) {
          // Process Contentful data
          const contentfulProjects = response.items.map((item: any) => {
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

          console.log("Processed Contentful projects:", contentfulProjects)
          setProjects(contentfulProjects)
          setFilteredProjects(contentfulProjects)
        } else {
          console.log("No projects found in Contentful, using fallback data")
          setProjects(fallbackProjects)
          setFilteredProjects(fallbackProjects)
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
        setError("Failed to fetch projects from Contentful. Using fallback data instead.")
        setProjects(fallbackProjects)
        setFilteredProjects(fallbackProjects)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

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
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-python-yellow mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>

          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              My <span className="text-gradient-python">Projects</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground"
            >
              Explore my portfolio of projects showcasing my skills and expertise in software development.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          {/* Error message if any */}
          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500">
              <p>{error}</p>
            </div>
          )}

          {/* Project Filters */}
          <ProjectFilter projects={projects} onFilter={setFilteredProjects} />

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-python-blue animate-spin"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-python-yellow/30"></div>
              </div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-4">No projects found</h3>
              <p className="text-muted-foreground mb-8">Try adjusting your filters or search term.</p>
              <Button onClick={() => setFilteredProjects(projects)}>View All Projects</Button>
            </div>
          ) : (
            <MasonryGrid columns={3} gap={24}>
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </MasonryGrid>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-python-blue/10 via-transparent to-python-yellow/10" />
        </div>

        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="animate-in"
            >
              <h2 className="text-3xl font-bold mb-4">Have a Project in Mind?</h2>
              <p className="text-muted-foreground mb-8">
                Let's collaborate and bring your ideas to life. I'm always open to new and exciting projects.
              </p>
              <Button
                asChild
                size="lg"
                className="btn-hover-effect bg-gradient-to-r from-python-blue to-python-yellow text-white hover:opacity-90"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
