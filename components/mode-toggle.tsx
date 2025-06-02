"use client"

import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative h-10 w-10 rounded-full bg-gradient-to-br from-python-blue/20 to-python-yellow/20 p-0.5 shadow-lg transition-all duration-300 hover:shadow-python-yellow/20 dark:from-python-blue/30 dark:to-python-yellow/30"
      aria-label="Toggle theme"
    >
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full">
        <div className={`transition-all duration-300 ${theme === "dark" ? "opacity-100" : "opacity-0"}`}>
          <Moon className="h-5 w-5 text-python-yellow" />
        </div>
        <div className={`absolute transition-all duration-300 ${theme === "light" ? "opacity-100" : "opacity-0"}`}>
          <Sun className="h-5 w-5 text-python-yellow" />
        </div>
      </div>
    </button>
  )
}
