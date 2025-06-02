import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to check if we're running on the client side
export function isClient() {
  return typeof window !== "undefined"
}

// Utility function to check if we're running on the server side
export function isServer() {
  return typeof window === "undefined"
}

// Utility function to safely parse JSON
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T
  } catch (e) {
    return fallback
  }
}

// Utility function to format date
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Utility function to truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

// Utility function to generate random ID
export function generateId(length = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, length + 2)
}

// Utility function to debounce function calls
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Utility function to throttle function calls
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

// Utility function to get viewport dimensions
export function getViewportDimensions() {
  if (!isClient()) return { width: 0, height: 0 }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

// Utility function to check if element is in viewport
export function isInViewport(element: HTMLElement): boolean {
  if (!isClient()) return false

  const rect = element.getBoundingClientRect()

  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth
}

// Utility function to get contrast color (black or white) based on background
export function getContrastColor(hexColor: string): string {
  // Remove # if present
  const hex = hexColor.replace("#", "")

  // Convert hex to RGB
  const r = Number.parseInt(hex.substring(0, 2), 16)
  const g = Number.parseInt(hex.substring(2, 4), 16)
  const b = Number.parseInt(hex.substring(4, 6), 16)

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Return black for bright colors, white for dark colors
  return luminance > 0.5 ? "#000000" : "#FFFFFF"
}
