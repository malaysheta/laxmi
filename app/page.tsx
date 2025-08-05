"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { UserMenu } from "@/components/user-menu"
import {
  TrendingUp,
  Shield,
  Target,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Youtube,
  Linkedin,
  Instagram,
  Smartphone,
  FileText,
  Clock,
  BarChart3,
  Globe,
  Calculator,
  PieChart,
  Menu,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { TeamSlider } from "@/components/team-slider"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [teamMembers, setTeamMembers] = useState([
    {
      name: "Bipinbhai Bhalani",
      position: "Senior Financial Advisor",
      experience: "25+ Years Experience",
      photo: "/placeholder.svg?height=200&width=200",
      specialization: "Stock Market Expert & Wealth Management",
    },
    {
      name: "Rajesh Patel",
      position: "Investment Consultant",
      experience: "15+ Years Experience",
      photo: "/placeholder.svg?height=200&width=200",
      specialization: "Mutual Funds & Portfolio Management",
    },
    {
      name: "Priya Sharma",
      position: "Financial Planner",
      experience: "12+ Years Experience",
      photo: "/placeholder.svg?height=200&width=200",
      specialization: "Retirement & Tax Planning",
    },
    {
      name: "Amit Kumar",
      position: "Wealth Advisor",
      experience: "10+ Years Experience",
      photo: "/placeholder.svg?height=200&width=200",
      specialization: "Estate Planning & Insurance",
    },
  ])

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/team")
      if (response.ok) {
        const data = await response.json()
        setTeamMembers(data.slice(0, 4)) // Show only first 4 on homepage
      }
    } catch (error) {
      console.error("Failed to fetch team members:", error)
    }
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
              <Link href="#about" className="text-sl-black hover:text-sl-brown transition-colors">
                About Us
              </Link>
              <Link href="#services" className="text-sl-black hover:text-sl-brown transition-colors">
                Services
              </Link>
              <Link href="/team" className="text-sl-black hover:text-sl-brown transition-colors">
                Our Team
              </Link>
              <Link href="/contact" className="text-sl-black hover:text-sl-brown transition-colors">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <UserMenu />
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-bg.jpg" alt="Financial Background" fill className="object-cover opacity-90" />
          <div className="absolute inset-0 bg-sl-black/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="bg-sl-yellow text-sl-black mb-6">🏆 Trusted Financial Partner Since 1998</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Redefining Financial
              <span className="text-sl-yellow"> Freedom</span> for Over a Decade
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              A leading wealth management firm delivering comprehensive financial solutions to individuals, families,
              and businesses across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-sl-yellow text-sl-black hover:bg-sl-yellow/90">
                  Start Your Journey
                </Button>
              </Link>
              <Link href="#services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-sl-black bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Glimpse Section */}
      <section className="py-20 bg-sl-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sl-black mb-4">Quick Glimpse</h2>
            <p className="text-xl text-sl-brown max-w-2xl mx-auto">
              We are a leading financial services firm dedicated to providing the best solutions for our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white border-sl-brown/20 text-center p-8">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-sl-brown mb-2">₹100+ Cr</div>
                <p className="text-sl-black font-semibold">AUM Above</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-sl-brown/20 text-center p-8">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-sl-brown mb-2">10,000+</div>
                <p className="text-sl-black font-semibold">Clients</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-sl-brown/20 text-center p-8">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-sl-brown mb-2">72+</div>
                <p className="text-sl-black font-semibold">Advisors</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white border-sl-brown/20 text-center p-8">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-sl-brown mb-2">3,000+</div>
                <p className="text-sl-black font-semibold">Families Managed</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-sl-brown/20 text-center p-8">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-sl-brown mb-2">25+</div>
                <p className="text-sl-black font-semibold">Years of Excellence</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our 360° Services */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sl-black mb-4">Our 360° Services</h2>
            <p className="text-xl text-sl-brown max-w-2xl mx-auto">
              We provide a complete range of financial services to help you achieve your goals with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-sl-gray border-sl-brown/20 hover:shadow-lg transition-shadow text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-sl-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-sl-black" />
                </div>
                <h3 className="text-xl font-bold text-sl-black mb-3">Wealth Creation</h3>
                <p className="text-sl-brown">Strategic investment planning for long-term wealth building</p>
              </CardContent>
            </Card>

            <Card className="bg-sl-gray border-sl-brown/20 hover:shadow-lg transition-shadow text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-sl-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-sl-black" />
                </div>
                <h3 className="text-xl font-bold text-sl-black mb-3">Wealth Preservation</h3>
                <p className="text-sl-brown">Protecting and preserving your accumulated wealth</p>
              </CardContent>
            </Card>

            <Card className="bg-sl-gray border-sl-brown/20 hover:shadow-lg transition-shadow text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-sl-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-sl-black" />
                </div>
                <h3 className="text-xl font-bold text-sl-black mb-3">Estate Planning</h3>
                <p className="text-sl-brown">Comprehensive estate and succession planning</p>
              </CardContent>
            </Card>

            <Card className="bg-sl-gray border-sl-brown/20 hover:shadow-lg transition-shadow text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-sl-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <PieChart className="w-8 h-8 text-sl-black" />
                </div>
                <h3 className="text-xl font-bold text-sl-black mb-3">Financing</h3>
                <p className="text-sl-brown">Customized financing solutions for your needs</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-sl-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sl-black mb-4">Why Choose Us</h2>
            <p className="text-xl text-sl-brown max-w-2xl mx-auto">
              We combine innovative solutions to provide superior financial services tailored to your unique needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white border-sl-brown/20 hover:shadow-lg transition-shadow text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-sl-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-sl-black" />
                </div>
                <h3 className="text-lg font-bold text-sl-black mb-3">Customized Financial Solutions</h3>
                <p className="text-sm text-sl-brown">Bespoke financial strategies to secure and grow your wealth.</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-sl-brown/20 hover:shadow-lg transition-shadow text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-sl-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-sl-black" />
                </div>
                <h3 className="text-lg font-bold text-sl-black mb-3">Comprehensive Wealth Advisory</h3>
                <p className="text-sm text-sl-brown">
                  Expert guidance to optimize your investments and financial decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-sl-brown/20 hover:shadow-lg transition-shadow text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-sl-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-sl-black" />
                </div>
                <h3 className="text-lg font-bold text-sl-black mb-3">Portfolio Management Services</h3>
                <p className="text-sm text-sl-brown">Expert investment management for growth and stability.</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-sl-brown/20 hover:shadow-lg transition-shadow text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-sl-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-sl-black" />
                </div>
                <h3 className="text-lg font-bold text-sl-black mb-3">Handpicking the Right Fund</h3>
                <p className="text-sm text-sl-brown">
                  Personalized fund choices that match your financial goals and risk level.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sl-black mb-4">Our Expert Team</h2>
            <p className="text-xl text-sl-brown max-w-2xl mx-auto">
              Meet our experienced financial advisors dedicated to your financial success
            </p>
          </div>

          <TeamSlider teamMembers={teamMembers} />

          <div className="text-center mt-12">
            <Link href="/team">
              <Button className="bg-sl-brown text-white hover:bg-sl-brown/90">View All Team Members</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-sl-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sl-black mb-4">Frequently Asked Questions (FAQ)</h2>
            <p className="text-xl text-sl-brown">Find answers to the most common questions we receive.</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white border border-sl-brown/20 rounded-lg px-6">
                <AccordionTrigger className="text-sl-black hover:text-sl-brown">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-sl-yellow" />
                    <span>When should I start investing?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sl-brown">
                  The best time to start investing is now. The power of compounding works best when you give it time.
                  Even small amounts invested regularly can grow significantly over time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white border border-sl-brown/20 rounded-lg px-6">
                <AccordionTrigger className="text-sl-black hover:text-sl-brown">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-5 h-5 text-sl-yellow" />
                    <span>How do I choose the right mutual fund?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sl-brown">
                  Consider your investment goals, risk tolerance, time horizon, and fund performance history. Our
                  experts can help you select funds that align with your financial objectives.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white border border-sl-brown/20 rounded-lg px-6">
                <AccordionTrigger className="text-sl-black hover:text-sl-brown">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-sl-yellow" />
                    <span>Can NRIs invest in India?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sl-brown">
                  Yes, NRIs can invest in Indian mutual funds, stocks, and other financial instruments. We provide
                  specialized NRI investment services with proper documentation and compliance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white border border-sl-brown/20 rounded-lg px-6">
                <AccordionTrigger className="text-sl-black hover:text-sl-brown">
                  <div className="flex items-center space-x-3">
                    <Calculator className="w-5 h-5 text-sl-yellow" />
                    <span>What is Financial Planning?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sl-brown">
                  Financial planning is a comprehensive approach to managing your finances to achieve life goals. It
                  includes budgeting, investing, insurance, tax planning, and retirement planning.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white border border-sl-brown/20 rounded-lg px-6">
                <AccordionTrigger className="text-sl-black hover:text-sl-brown">
                  <div className="flex items-center space-x-3">
                    <PieChart className="w-5 h-5 text-sl-yellow" />
                    <span>What are the benefits of Portfolio Management?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sl-brown">
                  Professional portfolio management provides diversification, risk management, regular monitoring, and
                  expert decision-making to optimize returns while managing risk.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-white border border-sl-brown/20 rounded-lg px-6">
                <AccordionTrigger className="text-sl-black hover:text-sl-brown">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-sl-yellow" />
                    <span>How can I plan for retirement?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sl-brown">
                  Start early, calculate your retirement needs, invest in a mix of equity and debt instruments, consider
                  tax-saving options, and review your plan regularly with professional guidance.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sl-brown">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Start Your Financial Journey?</h2>
            <p className="text-xl text-sl-gray">
              Join thousands of satisfied clients who trust Shree Laxmi Financial Services for their wealth management
              needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-sl-yellow text-sl-black hover:bg-sl-yellow/90">
                  Get Started Today
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-sl-brown bg-transparent"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-sl-black text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-sl-yellow">Get In Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-sl-yellow" />
                  <span className="text-gray-300">info@shreelaxmifinance.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-sl-yellow" />
                  <span className="text-gray-300">+91 9023928717</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-sl-yellow mt-1" />
                  <span className="text-gray-300">
                    Plot 13/14, Shree Laxmi House, BI-91,
                    <br />
                    Udhana - Magdalla Rd, near
                    <br />
                    Dharti Namkeen, Chandramani
                    <br />
                    Society, Surat, Gujarat 395007
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-sl-yellow mb-4">Important Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="#" className="hover:text-sl-yellow transition-colors">
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-sl-yellow transition-colors">
                    Disclosure
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-sl-yellow transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-sl-yellow transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-sl-yellow mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-300 hover:text-sl-yellow transition-colors">
                  <Facebook className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-gray-300 hover:text-sl-yellow transition-colors">
                  <Youtube className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-gray-300 hover:text-sl-yellow transition-colors">
                  <Linkedin className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-gray-300 hover:text-sl-yellow transition-colors">
                  <Instagram className="w-6 h-6" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-sl-yellow mb-4">Download Our App</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-5 h-5 text-sl-yellow" />
                  <span className="text-gray-300">iOS App</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-5 h-5 text-sl-yellow" />
                  <span className="text-gray-300">Android App</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                <p>AMFI Registered Mutual Fund Distributor since 22/10/2013</p>
                <p>ARN No - 215118 | ARN Validity - 20/02/2028</p>
              </div>
              <div className="flex items-center space-x-3">
                <Image
                  src="/images/logo.jpeg"
                  alt="Shree Laxmi Financial Services"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="text-right">
                  <p className="text-sl-yellow font-bold">SHREE LAXMI</p>
                  <p className="text-gray-300 text-sm">Financial Services</p>
                </div>
              </div>
            </div>
            <div className="text-center text-gray-400 text-sm mt-4">
              <p>&copy; {new Date().getFullYear()} Shree Laxmi Financial Services. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
