"use client"

import type React from "react"

import { useEffect, useState } from "react"

export default function AnimatedBackground() {
  const [shapes, setShapes] = useState<Array<{ id: number; style: React.CSSProperties }>>([])

  useEffect(() => {
    // Create random shapes
    const newShapes = []
    const colors = ["shape-blue", "shape-yellow"]
    const animations = ["animate-float-shape", "animate-float-shape-reverse", "animate-float-shape-alt"]

    for (let i = 0; i < 10; i++) {
      const size = Math.random() * 300 + 100
      const shape = {
        id: i,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.2 + 0.05,
          animationDuration: `${Math.random() * 20 + 10}s`,
          animationDelay: `${Math.random() * 5}s`,
        },
        color: colors[Math.floor(Math.random() * colors.length)],
        animation: animations[Math.floor(Math.random() * animations.length)],
      }
      newShapes.push(shape)
    }

    setShapes(newShapes)
  }, [])

  return (
    <div className="animated-background">
      {shapes.map((shape) => (
        <div key={shape.id} className={`animated-shape ${shape.color} ${shape.animation}`} style={shape.style} />
      ))}
    </div>
  )
}
