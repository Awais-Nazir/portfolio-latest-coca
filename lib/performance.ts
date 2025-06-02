// Performance monitoring utilities

// Function to measure and report Core Web Vitals
export function measureWebVitals() {
  if (typeof window === "undefined" || !("performance" in window)) {
    return
  }

  // First Contentful Paint (FCP)
  const reportFCP = () => {
    const fcpEntry = performance.getEntriesByName("first-contentful-paint")[0]
    if (fcpEntry) {
      console.log(`FCP: ${fcpEntry.startTime.toFixed(2)}ms`)
      // You can send this to your analytics service
    }
  }

  // Largest Contentful Paint (LCP)
  const reportLCP = (entries: any[]) => {
    entries.forEach((entry) => {
      console.log(`LCP: ${entry.startTime.toFixed(2)}ms`)
      // You can send this to your analytics service
    })
  }

  // First Input Delay (FID)
  const reportFID = (entries: any[]) => {
    entries.forEach((entry) => {
      console.log(`FID: ${entry.processingStart - entry.startTime}ms`)
      // You can send this to your analytics service
    })
  }

  // Cumulative Layout Shift (CLS)
  const reportCLS = (entries: any[]) => {
    entries.forEach((entry) => {
      if (!entry.hadRecentInput) {
        console.log(`CLS: ${entry.value.toFixed(4)}`)
        // You can send this to your analytics service
      }
    })
  }

  // Time to First Byte (TTFB)
  const reportTTFB = () => {
    const navigationEntries = performance.getEntriesByType("navigation")
    if (navigationEntries.length > 0) {
      const ttfb = (navigationEntries[0] as PerformanceNavigationTiming).responseStart
      console.log(`TTFB: ${ttfb.toFixed(2)}ms`)
      // You can send this to your analytics service
    }
  }

  // Setup Performance Observers
  if ("PerformanceObserver" in window) {
    // FCP
    new PerformanceObserver(() => {
      reportFCP()
    }).observe({ type: "paint", buffered: true })

    // LCP
    new PerformanceObserver((entryList) => {
      reportLCP(entryList.getEntries())
    }).observe({ type: "largest-contentful-paint", buffered: true })

    // FID
    new PerformanceObserver((entryList) => {
      reportFID(entryList.getEntries())
    }).observe({ type: "first-input", buffered: true })

    // CLS
    new PerformanceObserver((entryList) => {
      reportCLS(entryList.getEntries())
    }).observe({ type: "layout-shift", buffered: true })
  }

  // Report TTFB
  window.addEventListener("load", reportTTFB)
}

// Function to detect slow network
export function detectSlowNetwork() {
  if (typeof navigator === "undefined" || !("connection" in navigator)) {
    return false
  }

  const connection = (navigator as any).connection

  if (connection) {
    // Check if the user has enabled data saver
    if (connection.saveData) {
      return true
    }

    // Check connection type
    const slowConnections = ["slow-2g", "2g", "3g"]
    if (connection.effectiveType && slowConnections.includes(connection.effectiveType)) {
      return true
    }
  }

  return false
}

// Function to optimize images based on network speed
export function getOptimizedImageSize() {
  const isSlowNetwork = detectSlowNetwork()

  if (isSlowNetwork) {
    return {
      quality: 60,
      size: "small",
    }
  }

  return {
    quality: 85,
    size: "original",
  }
}

// Function to measure component render time
export function measureRenderTime(componentName: string) {
  const startTime = performance.now()

  return () => {
    const endTime = performance.now()
    console.log(`${componentName} render time: ${(endTime - startTime).toFixed(2)}ms`)
  }
}

// Function to detect memory leaks
export function detectMemoryLeaks() {
  if (typeof window === "undefined" || !("performance" in window) || !("memory" in performance)) {
    return
  }

  const memory = (performance as any).memory

  if (memory) {
    console.log(`Used JS Heap: ${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`)
    console.log(`JS Heap Limit: ${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`)

    // Alert if memory usage is high
    if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.9) {
      console.warn("High memory usage detected!")
    }
  }
}

// Function to measure time to interactive
export function measureTimeToInteractive() {
  if (typeof window === "undefined") {
    return
  }

  const startTime = Date.now()

  window.addEventListener("DOMContentLoaded", () => {
    const dcl = Date.now() - startTime
    console.log(`DOMContentLoaded: ${dcl}ms`)
  })

  window.addEventListener("load", () => {
    const load = Date.now() - startTime
    console.log(`Load: ${load}ms`)

    // Time to Interactive is approximated as load time + 50ms
    // For a more accurate TTI, you would need a more complex calculation
    setTimeout(() => {
      const tti = Date.now() - startTime
      console.log(`Approximate Time to Interactive: ${tti}ms`)
    }, 50)
  })
}
