"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, ArrowRight } from "lucide-react"
import type { ProjectType } from "@/lib/contentful"

interface ProjectCardProps {
  project: ProjectType
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div
        className="relative overflow-hidden rounded-xl bg-background/50 border border-border/50 shadow-lg transition-all duration-500 h-full
        hover:shadow-xl hover:shadow-python-blue/10 hover:-translate-y-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-20">
            <Badge className="bg-python-yellow text-black font-medium px-3 py-1">Featured</Badge>
          </div>
        )}

        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image.url || "/placeholder.svg"}
            alt={project.title}
            width={project.image.width}
            height={project.image.height}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Hover Overlay with Actions */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
            <div className="flex gap-3">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background/80 backdrop-blur-sm p-3 rounded-full text-foreground hover:text-python-blue transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background/80 backdrop-blur-sm p-3 rounded-full text-foreground hover:text-python-yellow transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-python-blue transition-colors">{project.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="bg-python-blue/5 border-python-blue/20 text-xs font-medium transition-colors"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.tags.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <span>{new Date(project.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}</span>
            <span className="mx-2">•</span>
            <span>{project.client}</span>
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="mt-4 flex items-center text-python-blue font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <span>View Details</span>
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
