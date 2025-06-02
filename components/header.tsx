"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "./mode-toggle"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"

const navItems = [
  { name: "About", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Services", path: "/services" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md dark:shadow-primary/5" : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="relative group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-python-blue/20 to-python-yellow/20 opacity-0 blur-md group-hover:opacity-100 transition-all duration-500" />
          <span className="relative text-3xl font-bold tracking-tighter font-space">
            <span className="text-gradient-python">Awais</span>
            <span className="text-python-yellow">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} className="group relative">
              <span
                className={`text-sm font-medium transition-colors ${
                  pathname === item.path ? "text-python-yellow" : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {item.name}
              </span>
              {pathname === item.path && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-python-blue to-python-yellow" />
              )}
            </Link>
          ))}
          <ModeToggle />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ModeToggle />
          <button
            className="relative z-50 h-11 w-11 flex items-center justify-center rounded-md border border-border/50 bg-background/80 backdrop-blur-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={item.path}
                  className={`text-2xl font-medium transition-colors touch-manipulation ${
                    pathname === item.path ? "text-python-yellow" : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
