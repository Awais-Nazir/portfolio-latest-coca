"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={`fixed bottom-8 right-8 z-40 transition-all duration-300 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      <Button
        asChild
        size="lg"
        className="rounded-full shadow-lg bg-gradient-to-r from-python-blue to-python-yellow hover:shadow-xl hover:scale-105 transition-all duration-300 group"
      >
        <Link href="/contact" className="flex items-center gap-2 px-6">
          <MessageSquare className="h-5 w-5 group-hover:animate-bounce" />
          <span>Get in Touch</span>
        </Link>
      </Button>
    </div>
  )
}
