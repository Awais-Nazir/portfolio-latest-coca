"use client"

import { useEffect } from "react"
import { measureWebVitals, detectSlowNetwork, detectMemoryLeaks, measureTimeToInteractive } from "@/lib/performance"

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV === "production" && typeof window !== "undefined") {
      // Measure Core Web Vitals
      measureWebVitals()

      // Check for slow network
      const isSlowNetwork = detectSlowNetwork()
      if (isSlowNetwork) {
        console.log("Slow network detected. Optimizing for low bandwidth.")
      }

      // Set up periodic memory leak detection
      const memoryCheckInterval = setInterval(() => {
        detectMemoryLeaks()
      }, 30000) // Check every 30 seconds

      // Measure time to interactive
      measureTimeToInteractive()

      // Cleanup
      return () => {
        clearInterval(memoryCheckInterval)
      }
    }
  }, [])

  // This component doesn't render anything
  return null
}
