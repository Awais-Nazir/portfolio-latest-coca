"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Product Manager at TechFlow Inc.",
    content:
      "Awais delivered an exceptional data analysis solution that transformed how we understand our customer behavior. His Python expertise and attention to detail are remarkable.",
    rating: 5,
    avatar: "SC",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "CTO at DataVision Labs",
    content:
      "Working with Awais on our machine learning project was fantastic. He not only delivered high-quality code but also provided valuable insights that improved our model's accuracy by 23%.",
    rating: 5,
    avatar: "MR",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "Startup Founder at InnovateTech",
    content:
      "Awais built our entire web platform from scratch. His full-stack development skills and modern approach to UI/UX design exceeded our expectations. Highly recommended!",
    rating: 5,
    avatar: "EJ",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Data Scientist at Analytics Pro",
    content:
      "Collaborating with Awais on data visualization projects has been incredible. His ability to translate complex data into intuitive, interactive dashboards is unmatched.",
    rating: 5,
    avatar: "DK",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Marketing Director at GrowthHack",
    content:
      "Awais created a beautiful, responsive website that perfectly captures our brand. The performance optimizations he implemented resulted in 40% faster load times.",
    rating: 5,
    avatar: "LT",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    id: 6,
    name: "Ahmed Hassan",
    role: "Tech Lead at CodeCraft Studios",
    content:
      "His expertise in Python and machine learning helped us automate our entire workflow. The solution he built saves us 15+ hours per week. Outstanding work!",
    rating: 5,
    avatar: "AH",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  },
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [cardPositions, setCardPositions] = useState<{ [key: number]: { x: number; y: number; rotation: number } }>({})
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Function to calculate positions based on number of testimonials
  const calculatePositions = (count: number, activeIndex: number) => {
    const positions: { [key: number]: { x: number; y: number; rotation: number } } = {}

    // If no testimonials, return empty object
    if (count === 0) return positions

    // If only one testimonial, center it
    if (count === 1) {
      positions[0] = { x: 0, y: 0, rotation: 0 }
      return positions
    }

    // For 2 testimonials, place them side by side
    if (count === 2) {
      positions[0] = {
        x: activeIndex === 0 ? 0 : -150,
        y: 0,
        rotation: activeIndex === 0 ? 0 : -15,
      }
      positions[1] = {
        x: activeIndex === 1 ? 0 : 150,
        y: 0,
        rotation: activeIndex === 1 ? 0 : 15,
      }
      return positions
    }

    // For 3 or more, arrange in a circle with active card in center
    const radius = Math.min(200, count * 40)

    for (let i = 0; i < count; i++) {
      // If this card is active, bring it to center
      if (i === activeIndex) {
        positions[i] = { x: 0, y: 0, rotation: 0 }
      } else {
        const angle = (i * 360) / count
        const x = Math.cos((angle * Math.PI) / 180) * radius
        const y = Math.sin((angle * Math.PI) / 180) * radius
        const rotation = i % 2 === 0 ? -15 : 15
        positions[i] = { x, y, rotation }
      }
    }

    return positions
  }

  useEffect(() => {
    // Initialize card positions
    setCardPositions(calculatePositions(testimonials.length, currentIndex))
  }, [currentIndex])

  // Update positions when currentIndex changes
  useEffect(() => {
    setCardPositions(calculatePositions(testimonials.length, currentIndex))
  }, [currentIndex, testimonials.length])

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    if (isMobile) return
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
    setCurrentIndex(index)
  }

  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    if (isMobile) return
    setIsDragging(true)
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    setCurrentIndex(index)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isMobile) return

    const deltaX = e.clientX - dragStart.x

    // Check for left/right drag to change testimonial
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        // Dragged right - go to previous
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
      } else {
        // Dragged left - go to next
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }
      setIsDragging(false)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isMobile) return

    const deltaX = e.touches[0].clientX - dragStart.x

    // Check for left/right drag to change testimonial
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        // Dragged right - go to previous
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
      } else {
        // Dragged left - go to next
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }
      setIsDragging(false)
    }
  }

  const handleMouseUp = () => {
    if (isMobile) return
    setIsDragging(false)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  // If there are no testimonials, show a placeholder
  if (testimonials.length === 0) {
    return (
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-python">What Clients Say</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              No testimonials yet. Be the first to work with me and share your experience!
            </p>
          </div>
        </div>
      </section>
    )
  }

  // Mobile simple carousel
  if (isMobile) {
    return (
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
          <div className="absolute inset-0 bg-gradient-to-br from-python-blue/5 via-transparent to-python-yellow/5" />
        </div>

        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What <span className="text-gradient-python">Clients Say</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take my word for it. Here's what clients and collaborators have to say about working with me.
            </p>
          </div>

          {/* Simple mobile carousel */}
          <div className="relative max-w-md mx-auto">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4"
                  style={{ background: testimonials[currentIndex].gradient }}
                >
                  {testimonials[currentIndex].avatar}
                </div>
                <div>
                  <div className="font-bold text-foreground">{testimonials[currentIndex].name}</div>
                  <div className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</div>
                </div>
              </div>

              <div className="flex mb-4">{renderStars(testimonials[currentIndex].rating)}</div>

              <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonials[currentIndex].content}"</p>

              {/* Navigation arrows */}
              <div className="flex justify-between items-center">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-python-blue/20 hover:bg-python-blue/30 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex ? "bg-python-blue w-6" : "bg-muted-foreground/30"
                      }`}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-python-blue/20 hover:bg-python-blue/30 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-python-blue/10 to-python-yellow/10 rounded-2xl p-8 border border-python-blue/20 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Work Together?</h3>
              <p className="text-muted-foreground mb-6">
                Join these satisfied clients and let's create something amazing together. I'm always excited to take on
                new challenges and deliver exceptional results.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-python-blue to-python-yellow text-white hover:opacity-90 h-11 px-8 btn-hover-effect"
              >
                Start Your Project
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Desktop interactive carousel
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-br from-python-blue/5 via-transparent to-python-yellow/5" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What <span className="text-gradient-python">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it. Here's what clients and collaborators have to say about working with me.
          </p>
        </div>

        <div
          ref={containerRef}
          className="testimonials-container mx-auto select-none"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          style={{ userSelect: "none", WebkitUserSelect: "none", MozUserSelect: "none" }}
        >
          {testimonials.map((testimonial, index) => {
            const position = cardPositions[index] || { x: 0, y: 0, rotation: 0 }
            const isActive = index === currentIndex
            const zIndex = isActive ? 30 : 10 - Math.abs(index - currentIndex)

            return (
              <div
                key={testimonial.id}
                className="testimonial-card select-none"
                data-testimonial-index={index}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg) ${isActive ? "scale(1.1)" : "scale(0.9)"}`,
                  zIndex,
                  opacity: isActive ? 1 : 0.7,
                  left: "50%",
                  top: "50%",
                  marginLeft: "-175px",
                  marginTop: "-200px",
                  backgroundColor: isActive ? "hsl(var(--card))" : "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: isActive ? "1px solid hsl(var(--border))" : "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: isActive ? "0 25px 50px rgba(0, 0, 0, 0.4)" : "0 10px 20px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  color: isActive ? "hsl(var(--card-foreground))" : "white",
                  cursor: "grab",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                }}
                onMouseDown={(e) => handleMouseDown(e, index)}
                onTouchStart={(e) => handleTouchStart(e, index)}
              >
                <div className="testimonial-avatar select-none" style={{ background: testimonial.gradient }}>
                  {testimonial.avatar}
                </div>

                <div className="testimonial-stars select-none">{renderStars(testimonial.rating)}</div>

                <div className="relative mb-4 select-none">
                  <Quote className="absolute -top-2 -left-2 w-6 h-6 text-python-yellow/30" />
                  <p
                    className="testimonial-content pl-4 select-none"
                    style={{ color: isActive ? "hsl(var(--muted-foreground))" : "rgba(255, 255, 255, 0.8)" }}
                  >
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="select-none">
                  <div
                    className="testimonial-author select-none"
                    style={{ color: isActive ? "hsl(var(--card-foreground))" : "white" }}
                  >
                    {testimonial.name}
                  </div>
                  <div
                    className="testimonial-role select-none"
                    style={{ color: isActive ? "hsl(var(--muted-foreground))" : "rgba(255, 255, 255, 0.8)" }}
                  >
                    {testimonial.role}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation dots with instruction */}
        <div className="flex flex-col items-center gap-4 mt-12">
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-python-blue w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Drag left/right for navigation</p>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-python-blue/10 to-python-yellow/10 rounded-2xl p-8 border border-python-blue/20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Work Together?</h3>
            <p className="text-muted-foreground mb-6">
              Join these satisfied clients and let's create something amazing together. I'm always excited to take on
              new challenges and deliver exceptional results.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-python-blue to-python-yellow text-white hover:opacity-90 h-11 px-8 btn-hover-effect"
            >
              Start Your Project
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
