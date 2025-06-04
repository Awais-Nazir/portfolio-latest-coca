"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { submitContactForm } from "@/app/actions/contact"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // Honeypot field to catch bots
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create FormData object
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value)
      })

      // Submit form using server action
      const result = await submitContactForm(formDataObj)

      if (result.success) {
        toast({
          title: "Message sent!",
          description: result.message,
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          honeypot: "",
        })
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isClient) {
    return null // Return nothing during SSR to prevent hydration errors
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        </div>

        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-in">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground animate-in">
              Have a question or want to work together? Feel free to reach out!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-in">
              <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
              <p className="text-muted-foreground mb-8">
                I'm always open to new opportunities and collaborations. Whether you have a project in mind or just want
                to say hello, I'd love to hear from you!
              </p>

              <div className="space-y-6">
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-primary/5">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <a
                        href="mailto:contact@mawaisnazir.me"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        uetawais42@gmail.com
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-primary/5">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <a
                        href="tel:+923257877381"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +92 325 7******
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-primary/5">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p className="text-muted-foreground">Taxila, Pakistan</p>
                      <p className="text-muted-foreground">Khanewal, Pakistan</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="animate-in" style={{ animationDelay: "0.2s" }}>
              <Card className="overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot field to catch bots */}
                    <div className="hidden">
                      <label htmlFor="honeypot">Leave this field empty</label>
                      <input
                        id="honeypot"
                        name="honeypot"
                        value={formData.honeypot}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className="transition-all duration-300 focus:border-primary focus:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email"
                          required
                          className="transition-all duration-300 focus:border-primary focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        required
                        className="transition-all duration-300 focus:border-primary focus:ring-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message"
                        rows={6}
                        required
                        className="transition-all duration-300 focus:border-primary focus:ring-primary"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full group" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
