"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import skillsData from "./skillsData"
import Image from "next/image"
// Placeholder data - replace with actual data later


export default function SkillsPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
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
            className="inline-flex items-center text-sm text-muted-foreground hover:text-python-yellow mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>

          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-in">
              My <span className="text-gradient-python">Skills</span>
            </h1>
            <p className="text-xl text-muted-foreground animate-in">
              A comprehensive overview of my technical skills and expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      {/* <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          {skillsData.map((category) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-2xl font-bold text-left mb-6 text-python-yellow">
                {category.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, index) => (
                  <div key={skill.name} className="animate-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <Card className="h-full group hover:shadow-md hover:shadow-python-yellow/10 transition-all duration-300">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-4xl group-hover:animate-bounce">{skill.icon}</div>
                          <h3 className="text-xl font-bold">{skill.name}</h3>
                        </div>
                        <p className="text-muted-foreground">{skill.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section> */}
      {/* Skills Grid */}
      {/* Skills Grid */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          {skillsData.map((category, catIdx) => {
            return (
              <CategorySection key={category.category} category={category} defaultOpen={true} />
            )
          })}
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-python-blue/10 via-transparent to-python-yellow/10" />
        </div>

        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-in">
              <h2 className="text-3xl font-bold mb-4">Interested in Working Together?</h2>
              <p className="text-muted-foreground mb-8">
                Let's collaborate on your next project and create something amazing together.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-python-blue to-python-yellow text-white hover:opacity-90"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CategorySection({
  category,
  defaultOpen = true,
}: {
  category: { category: string; skills: { name: string; icon: string; description: string }[] }
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="mb-12">
      {/* Category Header with Collapse Toggle */}
      <div
        className="flex items-center justify-between cursor-pointer group mb-4"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-2xl md:text-3xl font-semibold group-hover:text-python-yellow transition-colors text-foreground dark:text-white">
          {category.category}
        </h2>
        <button
          className="text-lg font-semibold text-muted-foreground bg-muted px-2 py-1 rounded hover:bg-muted/80 transition"
          aria-label={`Toggle ${category.category}`}
        >
          {open ? "➖" : "➕"}
        </button>
      </div>

      {/* Skills Cards Grid */}
      {open && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.skills.map((skill, index) => (
            <div
              key={skill.name}
              className="animate-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Card className="h-full group hover:shadow-md hover:shadow-python-yellow/10 transition-all duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 relative">
                      <Image
                        src={`/icons/skills/${skill.icon}`}
                        alt={`${skill.name} icon`}
                        loading="lazy"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold">{skill.name}</h3>
                  </div>
                  <p className="text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

