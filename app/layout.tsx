import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import AnimatedBackground from "@/components/animated-background"
import ScrollToTop from "@/components/scroll-to-top"
import StickyCTA from "@/components/sticky-cta"
import PerformanceMonitor from "@/components/performance-monitor"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
})

export const metadata: Metadata = {
  icons: {icon: '/favicon.ico',},
  title: "Awais Nazir - Software Engineer & Python Developer",
  description:
    "Personal portfolio of Awais Nazir, a Software Engineering student at UET Taxila specializing in Python, Data Science, and Web Development.",
  keywords: [
    "Awais Nazir",
    "Software Engineer",
    "Python Developer",
    "Data Science",
    "Web Development",
    "Software Development",
    "Desktop Development",
    "UET Taxila",
    "Machine Learning",
    "Full Stack Developer",
    "Portfolio",
    "Pakistan Developer",
  ],
  authors: [{ name: "Awais Nazir", url: "https://mawaisnazir.me" }],
  creator: "Awais Nazir",
  publisher: "Awais Nazir",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://mawaisnazir.me"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mawaisnazir.me",
    title: "Awais Nazir - Software Engineer & Python Developer",
    description:
      "Personal portfolio of Awais Nazir, a Software Engineering student at UET Taxila specializing in Python, Data Science, and Web Development.",
    siteName: "Awais Nazir Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Awais Nazir - Software Engineer & Python Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Awais Nazir - Software Engineer & Python Developer",
    description:
      "Personal portfolio of Awais Nazir, a Software Engineering student at UET Taxila specializing in Python, Data Science, and Web Development.",
    creator: "@awaisnazir",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token",
    yandex: "verification_token",
  },
  generator: "v0.dev",
}

function HeaderWithSuspense() {
  return (
    <Suspense fallback={<div className="h-20 bg-background/80" />}>
      <Header />
    </Suspense>
  )
}

function AnalyticsWithSuspense() {
  return (
    <Suspense fallback={null}>
      <Analytics />
    </Suspense>
  )
}

function PerformanceMonitorWithSuspense() {
  return (
    <Suspense fallback={null}>
      <PerformanceMonitor />
    </Suspense>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Preload critical assets */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Awais Nazir",
              url: "https://mawaisnazir.me",
              jobTitle: "Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "University of Engineering & Technology, Taxila",
              },
              alumniOf: {
                "@type": "Organization",
                name: "University of Engineering & Technology, Taxila",
              },
              description: "Software Engineer specializing in Python and Data Science",
              sameAs: [
                "https://github.com/mawaisnazir",
                "https://linkedin.com/in/mawaisnazir",
                "https://twitter.com/awaisnazir",
              ],
              knowsAbout: ["Python", "Data Science", "Machine Learning", "Web Development", "Software Engineering"],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="dark">
          <PerformanceMonitorWithSuspense />
          <AnimatedBackground />
          <div className="flex min-h-screen flex-col">
            <HeaderWithSuspense />
            <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
              <main className="flex-1">{children}</main>
            </Suspense>
            <Footer />
          </div>
          <ScrollToTop />
          <StickyCTA />
          <Toaster />
          <AnalyticsWithSuspense />
        </ThemeProvider>
      </body>
    </html>
  )
}
