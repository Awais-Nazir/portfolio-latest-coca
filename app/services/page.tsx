"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle } from "lucide-react"

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

export default function ServicesPage() {
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
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-in">
              My <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground animate-in">
              Specialized solutions tailored to meet your specific needs and challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={service.title} className="animate-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 h-full">
                  <CardContent className="p-8 h-full">
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                    <p className="text-muted-foreground mb-6">{service.description}</p>

                    <div className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button asChild className="group mt-auto">
                      <Link href="/contact">
                        Request Service
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-600/5" />
        </div>

        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-in">
              <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
              <p className="text-muted-foreground mb-8">
                Don't see exactly what you're looking for? Contact me to discuss your specific requirements and how I
                can help.
              </p>
              <Button asChild size="lg">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
