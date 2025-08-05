"use client"
import { TeamMember } from "@/components/team-member"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { UserMenu } from "@/components/user-menu"

interface TeamMemberData {
  name: string
  position: string
  experience: string
  photo: string
  specialization?: string
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/team")
      if (response.ok) {
        const data = await response.json()
        setTeamMembers(data)
      }
    } catch (error) {
      console.error("Failed to fetch team members:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Remove the Dialog and add member functionality since it's admin-only
  // Show loading state while fetching
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sl-brown mx-auto mb-4"></div>
          <p className="text-sl-brown">Loading team members...</p>
        </div>
      </div>
    )
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
              <Link href="/team" className="text-sl-brown font-semibold">
                Our Team
              </Link>
              <Link href="/contact" className="text-sl-black hover:text-sl-brown transition-colors">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Team Section */}
      <section className="py-20 bg-sl-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-sl-black mb-6">Our Expert Team</h1>
            <p className="text-xl text-sl-brown max-w-2xl mx-auto">
              Meet our experienced financial advisors dedicated to your financial success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
