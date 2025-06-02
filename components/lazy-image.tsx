"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imgRef.current || priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(imgRef.current)

    return () => observer.disconnect()
  }, [priority])

  const shouldLoad = priority || isInView

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Skeleton loader */}
      {!isLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}

      {shouldLoad && (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </div>
  )
}
