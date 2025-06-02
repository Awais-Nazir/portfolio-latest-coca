"use client"

import type React from "react"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarouselProps {
  children: ReactNode[]
  autoSlideInterval?: number
  showControls?: boolean
  showDots?: boolean
  className?: string
}

export default function Carousel({
  children,
  autoSlideInterval = 5000,
  showControls = true,
  showDots = true,
  className = "",
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const totalSlides = children.length

  // Handle auto sliding
  useEffect(() => {
    if (autoSlideInterval <= 0 || isPaused) return

    const interval = setInterval(() => {
      nextSlide()
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [currentIndex, autoSlideInterval, isPaused, totalSlides])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Touch events for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  // Mouse drag events
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragEnd, setDragEnd] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setDragEnd(e.clientX)
  }

  const handleMouseUp = () => {
    if (!isDragging) return

    const distance = dragStart - dragEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }

    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  return (
    <div
      className={`carousel relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={containerRef}
        className="carousel-container"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {children.map((child, index) => (
          <div key={index} className="carousel-item w-full flex-shrink-0 px-4">
            {child}
          </div>
        ))}
      </div>

      {showControls && (
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2 z-10 pointer-events-none">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-python-blue/20 hover:text-python-blue transition-all duration-300 shadow-lg pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation()
              prevSlide()
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-python-blue/20 hover:text-python-blue transition-all duration-300 shadow-lg pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation()
              nextSlide()
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}

      {showDots && (
        <div className="carousel-controls mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation()
                goToSlide(index)
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
