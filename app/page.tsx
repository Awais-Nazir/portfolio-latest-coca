"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ExternalLink, Github, ArrowDown, GraduationCap, Briefcase } from "lucide-react"
import Carousel from "@/components/carousel"
import { contentfulClient } from "@/lib/contentful"
import { fallbackProjects } from "@/lib/project-data"
import type { ProjectType } from "@/lib/contentful"
import { Card, CardContent } from "@/components/ui/card"
import TestimonialsCarousel from "@/components/testimonials-carousel"

// Placeholder data for skills and services
const skills = [
  {
    name: "Python",
    icon: "🐍",
    description:
      "Expert in Python programming with experience in web development, data analysis, and machine learning applications.",
  },
  {
    name: "Data Science",
    icon: "📊",
    description:
      "Proficient in data analysis, visualization, and interpretation using libraries like Pandas, NumPy, and Matplotlib.",
  },
  {
    name: "Machine Learning",
    icon: "🤖",
    description:
      "Experience with various ML algorithms and frameworks including TensorFlow, PyTorch, and scikit-learn.",
  },
  {
    name: "Web Development",
    icon: "🌐",
    description: "Full-stack web development skills with experience in modern frameworks and technologies.",
  },
  {
    name: "Next.js",
    icon: "⚛️",
    description: "Building high-performance, SEO-friendly web applications using Next.js and React.",
  },
  { name: "React", icon: "⚛️", description: "Creating interactive user interfaces with React and related libraries." },
  {
    name: "TailwindCSS",
    icon: "🎨",
    description: "Designing responsive and modern UIs using the utility-first CSS framework.",
  },
  {
    name: "TypeScript",
    icon: "📝",
    description: "Writing type-safe code to improve development experience and reduce bugs.",
  },
]

const services = [
  {
    title: "Web Development",
    description: "Creating responsive, modern websites and web applications using the latest technologies.",
    icon: "🌐",
    features: [
      "Custom website development",
      "Web application development",
      "E-commerce solutions",
      "Progressive Web Apps (PWAs)",
      "Responsive design",
      "Performance optimization",
    ],
  },
  {
    title: "Data Analysis",
    description: "Extracting insights from data to help make informed business decisions.",
    icon: "📊",
    features: [
      "Data cleaning and preprocessing",
      "Exploratory data analysis",
      "Statistical analysis",
      "Data visualization",
      "Dashboard creation",
      "Reporting and insights",
    ],
  },
  {
    title: "Machine Learning",
    description: "Building intelligent systems that can learn from data and make predictions.",
    icon: "🤖",
    features: [
      "Predictive modeling",
      "Classification and regression",
      "Natural Language Processing",
      "Computer Vision",
      "Recommendation systems",
      "Model deployment and monitoring",
    ],
  },
  {
    title: "UI/UX Design",
    description: "Designing intuitive and engaging user interfaces and experiences.",
    icon: "🎨",
    features: [
      "User research",
      "Wireframing and prototyping",
      "Visual design",
      "Interaction design",
      "Usability testing",
      "Design systems",
    ],
  },
]

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"none" | "education" | "experience">("none")

  useEffect(() => {
    setIsClient(true)

    // Fetch projects from Contentful
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        console.log("Fetching projects from Contentful for home page...")

        // Fetch projects from Contentful
        const response = await contentfulClient.getEntries({
          content_type: "project",
          order: "-fields.date",
          // Limit to featured projects or just get a few
          limit: 6,
          // Optionally filter for featured projects
          // 'fields.featured': true,
        })

        console.log(`Found ${response.items.length} projects in Contentful for home page`)

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

          console.log("Processed Contentful projects for home page:", contentfulProjects)
          setProjects(contentfulProjects)
        } else {
          console.log("No projects found in Contentful for home page, using fallback data")
          setProjects(fallbackProjects)
        }
      } catch (error) {
        console.error("Error fetching projects for home page:", error)
        setProjects(fallbackProjects)
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
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 animate-in">
              <Badge className="px-4 py-1.5 text-sm font-medium bg-python-yellow text-black" variant="secondary">
                Software Engineering Student
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 max-w-4xl animate-in">
              <span className="text-gradient-python">Awais Nazir</span>
              <span className="block mt-2 text-3xl md:text-4xl lg:text-5xl text-muted-foreground">
                Crafting Digital Experiences
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mb-8 animate-in">
              A passionate software engineer specializing in Python and Data Science, creating innovative solutions to
              real-world problems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-in">
              <Button asChild size="lg" className="btn-hover-effect group">
                <Link href="/projects">
                  Explore My Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="btn-hover-effect border-python-yellow text-python-yellow hover:bg-python-yellow/10"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-in">
            <span className="text-sm text-muted-foreground mb-2"></span>
            <div className="animate-bounce">
              <ArrowDown className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-python-blue to-python-yellow blur-xl opacity-30" />
              <div className="relative aspect-square overflow-hidden rounded-xl border border-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-python-blue/10 via-transparent to-python-yellow/10" />
                <Image
                  src="/awais-nazir.png?height=600&width=600"
                  alt="Awais Nazir"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-gradient-python">About Me</span>
              </h2>

              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a final year Software Engineering student at UET Taxila, passionate about building innovative
                  solutions using Python and Data Science.
                </p>
                <p>
                  With a strong foundation in software development and a keen interest in machine learning, I strive to
                  create applications that make a positive impact.
                </p>
                <p>
                  My journey in software engineering began with a curiosity about how technology can solve real-world
                  problems. Throughout my academic career, I've focused on developing practical skills and applying
                  theoretical knowledge to create meaningful projects.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <div className="relative group">
                  <Button
                    variant="outline"
                    className="btn-hover-effect border-python-blue text-python-blue hover:bg-python-blue/10 w-full sm:w-auto"
                    onClick={() => setActiveTab(activeTab === "education" ? "none" : "education")}
                  >
                    <GraduationCap className="mr-2 h-4 w-4" /> Education
                  </Button>
                  <div className="absolute -top-10 left-0 w-full bg-background border border-border rounded-md p-2 text-sm text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Click to see my education details
                  </div>
                </div>

                <div className="relative group">
                  <Button
                    variant="outline"
                    className="btn-hover-effect border-python-yellow text-python-yellow hover:bg-python-yellow/10 w-full sm:w-auto"
                    onClick={() => setActiveTab(activeTab === "experience" ? "none" : "experience")}
                  >
                    <Briefcase className="mr-2 h-4 w-4" /> Experience
                  </Button>
                  <div className="absolute -top-10 left-0 w-full bg-background border border-border rounded-md p-2 text-sm text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Click to see my experience details
                  </div>
                </div>
              </div>

              {activeTab === "education" && (
                <div className="mt-6 animate-in">
                  <Card className="bg-background/50 border-python-blue/20">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-python-blue">
                        University of Engineering & Technology, Taxila
                      </h3>
                      <p className="text-muted-foreground mb-1">Bachelor of Science in Software Engineering</p>
                      <div className="flex flex-wrap justify-between text-sm text-muted-foreground mb-4">
                        <span>7th Semester (Current)</span>
                        <span>Expected Graduation: September 2026</span>
                      </div>
                      <div className="bg-python-blue/10 p-3 rounded-md">
                        <p className="font-medium text-center">CGPA: 3.61/4.0</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "experience" && (
                <div className="mt-6 animate-in">
                  <Card className="bg-background/50 border-python-yellow/20">
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-bold mb-4 text-python-yellow">Professional Experience</h3>
                      <p className="text-muted-foreground mb-4">Nil for now.</p>
                      <Button asChild className="btn-hover-effect">
                        <Link href="/projects">
                          Check out my projects instead <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-python">My Skills</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of technologies and tools I've mastered throughout my journey.
            </p>
          </div>

          <div className="mb-12 max-w-3xl mx-auto">
            <Carousel autoSlideInterval={5000}>
              {skills.map((skill) => (
                <div key={skill.name} className="px-4 py-6">
                  <div className="modern-card bg-background/50 p-8 h-full flex flex-col items-center text-center">
                    <div className="text-6xl mb-6 animate-float">{skill.icon}</div>
                    <h3 className="text-2xl font-bold mb-4">{skill.name}</h3>
                    <p className="text-muted-foreground">{skill.description}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          <div className="text-center">
            <Button
              asChild
              className="btn-hover-effect bg-gradient-to-r from-python-blue to-python-yellow text-white hover:opacity-90"
            >
              <Link href="/skills">
                View All Skills <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-python">Services I Offer</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specialized solutions tailored to meet your specific needs.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Carousel autoSlideInterval={6000}>
              {services.map((service) => (
                <div key={service.title} className="px-4 py-6">
                  <div className="modern-card bg-background/50 p-8 h-full">
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="text-6xl mb-4 animate-float">{service.icon}</div>
                      <h3 className="text-2xl font-bold">{service.title}</h3>
                      <p className="text-muted-foreground mt-2">{service.description}</p>
                    </div>

                    <div className="bg-gradient-to-r from-python-blue/10 to-python-yellow/10 p-4 rounded-lg">
                      <h4 className="font-medium mb-3 text-center">Key Features</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <span className="text-python-yellow mr-2">✓</span>
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              className="btn-hover-effect bg-gradient-to-r from-python-blue to-python-yellow text-white hover:opacity-90"
            >
              <Link href="/services">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* Featured Projects Section */}
      <section className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-python">Featured Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work and technical expertise.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-python-blue animate-spin"></div>
                <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-b-4 border-python-yellow/30"></div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto mb-12">
              <Carousel autoSlideInterval={7000}>
                {projects.map((project) => (
                  <div key={project.id} className="px-4 py-6">
                    <div className="modern-card bg-background/50 overflow-hidden">
                      <div className="relative aspect-video">
                        <Image
                          src={project.image.url || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                        <p className="text-muted-foreground mb-6">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="px-3 py-1 border-python-blue/30 bg-python-blue/5 hover:bg-python-blue/10 transition-colors"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="relative z-20 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-python-blue/50 hover:border-python-blue hover:bg-python-blue/10 h-9 px-3"
                          >
                            <Github className="mr-2 h-4 w-4" /> GitHub
                          </a>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="relative z-20 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-python-blue hover:bg-python-blue/90 text-white h-9 px-3"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                          </a>
                          <a
                            href={`/projects/${project.slug}`}
                            onClick={(e) => e.stopPropagation()}
                            className="relative z-20 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-python-yellow text-black hover:bg-python-yellow/80 h-9 px-3"
                          >
                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          )}

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="btn-hover-effect bg-gradient-to-r from-python-blue to-python-yellow text-white hover:opacity-90"
            >
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-python-blue/10 via-transparent to-python-yellow/10" />
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Bring Your Ideas to Life?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Let's collaborate and create something amazing together. Whether you have a project in mind or just want
                to connect, I'm always open to new opportunities.
              </p>
              <Button
                asChild
                size="lg"
                className="btn-hover-effect group bg-gradient-to-r from-python-blue to-python-yellow text-white hover:opacity-90"
              >
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
