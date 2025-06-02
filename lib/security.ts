// Security utilities for the application

// Function to sanitize user input to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// Function to validate email format
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Function to check password strength
export function checkPasswordStrength(password: string): {
  score: number
  feedback: string
} {
  let score = 0
  let feedback = ""

  // Length check
  if (password.length < 8) {
    feedback = "Password is too short"
  } else {
    score += 1
  }

  // Complexity checks
  if (/[A-Z]/.test(password)) score += 1
  if (/[a-z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1

  // Provide feedback based on score
  if (score === 5) {
    feedback = "Password strength: Excellent"
  } else if (score === 4) {
    feedback = "Password strength: Strong"
  } else if (score === 3) {
    feedback = "Password strength: Good"
  } else if (score === 2) {
    feedback = "Password strength: Fair"
  } else {
    feedback = "Password strength: Weak"
  }

  return { score, feedback }
}

// Function to generate a secure random token
export function generateSecureToken(length = 32): string {
  if (typeof window === "undefined") {
    // Server-side implementation
    const crypto = require("crypto")
    return crypto.randomBytes(length).toString("hex")
  } else {
    // Client-side implementation
    const array = new Uint8Array(length)
    window.crypto.getRandomValues(array)
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
  }
}

// Function to check for common security headers
export function checkSecurityHeaders(): { [key: string]: boolean } {
  if (typeof window === "undefined") return {}

  const headers = {
    "Content-Security-Policy": false,
    "X-Content-Type-Options": false,
    "X-Frame-Options": false,
    "X-XSS-Protection": false,
    "Strict-Transport-Security": false,
    "Referrer-Policy": false,
  }

  // This is just a check - we can't actually access response headers from the client
  // This would need to be implemented server-side
  console.log("Security headers should be checked server-side")

  return headers
}

// Function to prevent clickjacking
export function preventClickjacking(): void {
  if (typeof window === "undefined") return

  // Check if page is loaded in an iframe
  if (window.self !== window.top) {
    // Page is in an iframe
    console.warn("This page is loaded in an iframe, which may pose security risks.")

    // You could redirect to the top level or show a warning
    // window.top.location = window.self.location
  }
}

// Function to check if HTTPS is being used
export function isHttps(): boolean {
  if (typeof window === "undefined") return false
  return window.location.protocol === "https:"
}

// Function to detect potential security issues
export function detectSecurityIssues(): string[] {
  const issues: string[] = []

  if (typeof window === "undefined") return issues

  // Check if using HTTPS
  if (!isHttps()) {
    issues.push("Site is not using HTTPS")
  }

  // Check localStorage for sensitive data
  const sensitiveKeys = ["password", "token", "auth", "key", "secret"]
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i) || ""
    if (sensitiveKeys.some((sensitive) => key.toLowerCase().includes(sensitive))) {
      issues.push(`Potentially sensitive data stored in localStorage: ${key}`)
    }
  }

  return issues
}
