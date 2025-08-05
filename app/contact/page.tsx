"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { UserMenu } from "@/components/user-menu"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-sl-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/logo.jpeg"
                alt="Shree Laxmi Financial Services"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <h1 className="text-xl font-bold text-sl-black">Shree Laxmi</h1>
                <p className="text-sm text-sl-brown">Financial Services</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/#about" className="text-sl-black hover:text-sl-brown transition-colors">
                About Us
              </Link>
              <Link href="/#services" className="text-sl-black hover:text-sl-brown transition-colors">
                Services
              </Link>
              <Link href="/team" className="text-sl-black hover:text-sl-brown transition-colors">
                Our Team
              </Link>
              <Link href="/contact" className="text-sl-brown font-semibold">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Contact Section */}
      <section className="py-20 bg-sl-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-sl-black mb-6">Contact Us</h1>
            <p className="text-xl text-sl-brown max-w-2xl mx-auto">
              Ready to take the next step? We're here to help. Reach out through any channel that works best for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Get in Touch */}
            <Card className="bg-white border-sl-brown/20 p-8">
              <CardContent className="space-y-8">
                <h2 className="text-3xl font-bold text-sl-black mb-8">Get in Touch</h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-sl-yellow rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-sl-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-sl-black mb-1">Email Us</h3>
                      <p className="text-sl-brown">info@shreelaxmifinance.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-sl-yellow rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-sl-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-sl-black mb-1">Call Us</h3>
                      <p className="text-sl-brown">+91 9023928717</p>
                      <p className="text-sl-brown">+91 0261 3142287</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-sl-yellow rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-sl-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-sl-black mb-1">Visit Us</h3>
                      <p className="text-sl-brown">
                        Plot 13/14, Shree Laxmi House, BI-91, Udhana - Magdalla Rd,
                        <br />
                        near Dharti Namkeen, Chandramani Society,
                        <br />
                        Surat, Gujarat 395007
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="mt-8">
                  <div className="w-full h-64 bg-sl-gray rounded-lg flex items-center justify-center">
                    <p className="text-sl-brown">Google Maps Integration</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="bg-white border-sl-brown/20 p-8">
              <CardContent>
                <h2 className="text-3xl font-bold text-sl-black mb-8">Send us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="fullName" className="text-sl-brown font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="mt-2 border-sl-brown/30 focus:border-sl-brown"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sl-brown font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2 border-sl-brown/30 focus:border-sl-brown"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sl-brown font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="mt-2 border-sl-brown/30 focus:border-sl-brown"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sl-brown font-medium">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="mt-2 border-sl-brown/30 focus:border-sl-brown resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-sl-brown text-white hover:bg-sl-brown/90 py-3 text-lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
