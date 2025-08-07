"use client"

import type React from "react"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Shield, Crown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AdminSignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    console.log("👑 Admin sign in attempt:", { email, password: password ? "***" : "empty" })

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      console.log("📝 Admin sign in result:", result)

      if (result?.error) {
        console.error("❌ Admin sign in error:", result.error)
        setError("Invalid admin credentials. Please try again.")
      } else if (result?.ok) {
        console.log("✅ Admin sign in successful")
        const session = await getSession()
        console.log("📋 Admin session:", session)
        
        if ((session?.user as any)?.role === "admin") {
          router.push("/admin")
        } else {
          setError("Access denied. Admin privileges required.")
          await signIn("credentials", { redirect: false }) // Sign out
        }
      } else {
        console.log("⚠️  Admin sign in result unclear:", result)
        setError("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("❌ Admin sign in exception:", error)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Admin Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <Image
                src="/images/logo.jpeg"
                alt="Shree Laxmi Financial Services"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                <Crown className="w-4 h-4 text-slate-900" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Shree Laxmi</h1>
              <p className="text-sm text-white/70">Financial Services</p>
            </div>
          </div>
          
          {/* Admin Badge */}
          <div className="inline-flex items-center space-x-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-2">
            <Shield className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-medium text-sm">Admin Portal</span>
          </div>
        </div>

        <Card className="border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl text-white">Admin Access</CardTitle>
            <CardDescription className="text-white/70">
              Sign in to access administrative functions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="border-red-500/30 bg-red-500/10">
                <AlertDescription className="text-red-300">{error}</AlertDescription>
              </Alert>
            )}

            {/* Admin Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90 font-medium">
                  Admin Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-white/50" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter admin email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-yellow-500 focus:bg-white/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/90 font-medium">
                  Admin Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-white/50" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-yellow-500 focus:bg-white/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-white/50 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-500 text-slate-900 hover:bg-yellow-400 h-12 font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Admin Sign In"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-white/70">Need help? </span>
              <Link href="/contact" className="text-yellow-400 font-semibold hover:underline">
                Contact Support
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Admin Credentials Info */}
        <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <div className="text-center">
            <h3 className="text-yellow-400 font-medium mb-2">Admin Credentials</h3>
            <div className="text-sm text-white/70 space-y-1">
              <p><strong>Email:</strong> admin@shreelaxmi.com</p>
              <p><strong>Password:</strong> admin123456</p>
            </div>
            <p className="text-xs text-white/50 mt-2">
              Use these credentials to access the admin panel
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center text-xs text-white/50">
          <p>This is a secure admin portal. Unauthorized access is prohibited.</p>
        </div>
      </div>
    </div>
  )
} 