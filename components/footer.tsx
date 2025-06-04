import Link from "next/link"
import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-3xl font-bold tracking-tighter font-space">
              <span className="text-gradient-python">Awais</span>
              <span className="text-python-yellow">.</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              A passionate software engineer specializing in Python and Data Science, creating innovative solutions to
              real-world problems.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link
                href="https://github.com/Awais-Nazir"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="footer-social bg-muted/80 p-2 rounded-full hover:bg-python-blue/10 transition-all"
              >
                <Github className="h-5 w-5 text-muted-foreground hover:text-python-blue transition-colors" />
              </Link>
              <Link
                href="https://linkedin.com/in/mawaisnazir"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="footer-social bg-muted/80 p-2 rounded-full hover:bg-python-blue/10 transition-all"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-python-blue transition-colors" />
              </Link>
              <Link
                href="https://www.instagram.com/itx_me_awais.n3/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="footer-social bg-muted/80 p-2 rounded-full hover:bg-python-yellow/10 transition-all"
              >
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-python-blue transition-colors" />
              </Link>
              <Link
                href="mailto:uetawais42@gmail.com"
                aria-label="Email"
                className="footer-social bg-muted/80 p-2 rounded-full hover:bg-python-yellow/10 transition-all"
              >
                <Mail className="h-5 w-5 text-muted-foreground hover:text-python-yellow transition-colors" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="footer-link text-muted-foreground hover:text-python-yellow transition-all inline-block"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="footer-link text-muted-foreground hover:text-python-yellow transition-all inline-block"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/skills"
                  className="footer-link text-muted-foreground hover:text-python-yellow transition-all inline-block"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="footer-link text-muted-foreground hover:text-python-yellow transition-all inline-block"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="footer-link text-muted-foreground hover:text-python-yellow transition-all inline-block"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="footer-link text-muted-foreground hover:text-python-yellow transition-all inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-muted-foreground">
                <span className="block">Email:</span>
                <a
                  href="mailto:uetawais42@gmail.com"
                  className="footer-link hover:text-python-yellow transition-all inline-block"
                >
                  uetawais42@gmail.com
                </a>
              </li>
              <li className="text-muted-foreground">
                <span className="block">Phone:</span>
                <a
                  href="tel:+923257877381"
                  className="footer-link hover:text-python-yellow transition-all inline-block"
                >
                  +92 325 7******
                </a>
              </li>
              <li className="text-muted-foreground">
                <span className="block">Location:</span>
                <span>Taxila, Pakistan</span><br />
                <span>Khanewal, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Awais Nazir. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">Built by Awais with ❤️ & 💻</p>
        </div>
      </div>
    </footer>
  )
}
