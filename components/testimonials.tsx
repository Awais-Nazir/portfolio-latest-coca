"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechFlow Inc.",
    content:
      "Awais delivered an exceptional data analysis solution that transformed how we understand our customer behavior. His Python expertise and attention to detail are remarkable.",
    rating: 5,
    avatar: "SC",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "CTO",
    company: "DataVision Labs",
    content:
      "Working with Awais on our machine learning project was fantastic. He not only delivered high-quality code but also provided valuable insights that improved our model's accuracy by 23%.",
    rating: 5,
    avatar: "MR",
    gradient: "from-green-500 to-teal-600",
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "Startup Founder",
    company: "InnovateTech",
    content:
      "Awais built our entire web platform from scratch. His full-stack development skills and modern approach to UI/UX design exceeded our expectations. Highly recommended!",
    rating: 5,
    avatar: "EJ",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Data Scientist",
    company: "Analytics Pro",
    content:
      "Collaborating with Awais on data visualization projects has been incredible. His ability to translate complex data into intuitive, interactive dashboards is unmatched.",
    rating: 5,
    avatar: "DK",
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Marketing Director",
    company: "GrowthHack Solutions",
    content:
      "Awais created a beautiful, responsive website that perfectly captures our brand. The performance optimizations he implemented resulted in 40% faster load times.",
    rating: 5,
    avatar: "LT",
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    id: 6,
    name: "Ahmed Hassan",
    role: "Tech Lead",
    company: "CodeCraft Studios",
    content:
      "His expertise in Python and machine learning helped us automate our entire workflow. The solution he built saves us 15+ hours per week. Outstanding work!",
    rating: 5,
    avatar: "AH",
    gradient: "from-cyan-500 to-blue-600",
  },
]

export default function Testimonials() {
  const [isClient, setIsClient] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 2))
    }, 5000)

    return () => clearInterval(interval)
  }, [isClient])

  if (!isClient) {
    return null
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-br from-python-blue/5 via-transparent to-python-yellow/5" />
      </div>

      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What <span className="text-gradient-python">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it. Here's what clients and collaborators have to say about working with me.
          </p>
        </motion.div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="testimonial-card h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`testimonial-avatar bg-gradient-to-br ${testimonial.gradient}`}>
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground truncate">{testimonial.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-4">{renderStars(testimonial.rating)}</div>

                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-6 h-6 text-python-yellow/20" />
                    <p className="text-muted-foreground leading-relaxed pl-4">"{testimonial.content}"</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: Math.ceil(testimonials.length / 2) }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 px-2">
                  <div className="grid grid-cols-1 gap-4">
                    {testimonials.slice(slideIndex * 2, slideIndex * 2 + 2).map((testimonial) => (
                      <Card key={testimonial.id} className="testimonial-card">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <div
                              className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm`}
                            >
                              {testimonial.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-base truncate">{testimonial.name}</h3>
                              <p className="text-xs text-muted-foreground truncate">{testimonial.role}</p>
                              <p className="text-xs text-muted-foreground truncate">{testimonial.company}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 mb-3">{renderStars(testimonial.rating)}</div>

                          <div className="relative">
                            <Quote className="absolute -top-1 -left-1 w-4 h-4 text-python-yellow/20" />
                            <p className="text-sm text-muted-foreground leading-relaxed pl-3">
                              "{testimonial.content}"
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.ceil(testimonials.length / 2) }, (_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-python-blue w-6" : "bg-muted-foreground/30"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-python-blue/10 to-python-yellow/10 rounded-2xl p-8 border border-python-blue/20">
            <h3 className="text-2xl font-bold mb-4">Ready to Work Together?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join these satisfied clients and let's create something amazing together. I'm always excited to take on
              new challenges and deliver exceptional results.
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-python-blue to-python-yellow text-white hover:opacity-90 h-11 px-8 btn-hover-effect"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
