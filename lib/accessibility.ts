// Accessibility utilities

// Function to check contrast ratio between two colors
export function getContrastRatio(foreground: string, background: string): number {
  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 }
  }

  // Calculate relative luminance
  const getLuminance = (color: { r: number; g: number; b: number }) => {
    const { r, g, b } = color
    const a = [r, g, b].map((v) => {
      v /= 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
  }

  const color1 = hexToRgb(foreground)
  const color2 = hexToRgb(background)

  const luminance1 = getLuminance(color1)
  const luminance2 = getLuminance(color2)

  const brightest = Math.max(luminance1, luminance2)
  const darkest = Math.min(luminance1, luminance2)

  return (brightest + 0.05) / (darkest + 0.05)
}

// Function to check if contrast ratio meets WCAG standards
export function meetsContrastGuidelines(ratio: number): {
  AA: boolean
  AAA: boolean
  AALarge: boolean
  AAALarge: boolean
} {
  return {
    AA: ratio >= 4.5,
    AAA: ratio >= 7,
    AALarge: ratio >= 3,
    AAALarge: ratio >= 4.5,
  }
}

// Function to detect if reduced motion is preferred
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

// Function to detect if high contrast mode is enabled
export function prefersHighContrast(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(forced-colors: active)").matches
}

// Function to check if an element is keyboard focusable
export function isKeyboardFocusable(element: HTMLElement): boolean {
  const tabIndex = element.getAttribute("tabindex")
  if (tabIndex && Number.parseInt(tabIndex) < 0) return false

  const nodeName = element.nodeName.toLowerCase()
  const isDisabled = element.hasAttribute("disabled")
  const isHidden = element.getAttribute("aria-hidden") === "true"

  if (isDisabled || isHidden) return false

  const focusableElements = ["a", "button", "input", "textarea", "select", "details", '[tabindex]:not([tabindex="-1"])']

  return focusableElements.some((selector) => element.matches(selector) || element.querySelector(selector) !== null)
}

// Function to check if an element has proper ARIA attributes
export function checkAriaAttributes(element: HTMLElement): string[] {
  const issues: string[] = []

  // Check for images without alt text
  const images = element.querySelectorAll("img")
  images.forEach((img) => {
    if (!img.hasAttribute("alt")) {
      issues.push("Image missing alt text")
    }
  })

  // Check for buttons without accessible names
  const buttons = element.querySelectorAll("button")
  buttons.forEach((button) => {
    if (!button.textContent && !button.getAttribute("aria-label") && !button.getAttribute("aria-labelledby")) {
      issues.push("Button missing accessible name")
    }
  })

  // Check for form inputs without labels
  const inputs = element.querySelectorAll("input, textarea, select")
  inputs.forEach((input) => {
    const id = input.getAttribute("id")
    if (id) {
      const label = element.querySelector(`label[for="${id}"]`)
      if (!label && !input.getAttribute("aria-label") && !input.getAttribute("aria-labelledby")) {
        issues.push("Form input missing label")
      }
    } else {
      if (!input.getAttribute("aria-label") && !input.getAttribute("aria-labelledby")) {
        issues.push("Form input missing label and id")
      }
    }
  })

  return issues
}

// Function to announce messages to screen readers
export function announceToScreenReader(message: string): void {
  if (typeof document === "undefined") return

  const announcer = document.getElementById("sr-announcer")
  let liveRegion: HTMLElement

  if (announcer) {
    liveRegion = announcer
  } else {
    liveRegion = document.createElement("div")
    liveRegion.id = "sr-announcer"
    liveRegion.setAttribute("aria-live", "polite")
    liveRegion.setAttribute("aria-atomic", "true")
    liveRegion.style.position = "absolute"
    liveRegion.style.width = "1px"
    liveRegion.style.height = "1px"
    liveRegion.style.padding = "0"
    liveRegion.style.overflow = "hidden"
    liveRegion.style.clip = "rect(0, 0, 0, 0)"
    liveRegion.style.whiteSpace = "nowrap"
    liveRegion.style.border = "0"
    document.body.appendChild(liveRegion)
  }

  liveRegion.textContent = message
}
