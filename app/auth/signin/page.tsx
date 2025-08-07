"use client"

import type React from "react"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock, Chrome, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    console.log("🔐 Attempting sign in with:", { email, password: password ? "***" : "empty" })

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      console.log("📝 Sign in result:", result)

      if (result?.error) {
        console.error("❌ Sign in error:", result.error)
        setError("Invalid email or password. Please try again.")
      } else if (result?.ok) {
        console.log("✅ Sign in successful")
        const session = await getSession()
        console.log("📋 Session:", session)
        
        if ((session?.user as any)?.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/")
        }
      } else {
        console.log("⚠️  Sign in result unclear:", result)
        setError("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("❌ Sign in exception:", error)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    try {
      console.log("🌐 Attempting Google sign in...")
      const result = await signIn("google", { callbackUrl: "/", redirect: false })
      
      if (result?.error) {
        console.error("❌ Google sign-in error:", result.error)
        if (result.error === "OAuthSignin") {
          setError("Google OAuth is not configured. Please use email/password login or contact administrator.")
        } else if (result.error === "redirect_uri_mismatch") {
          setError("Google OAuth redirect URI mismatch. Please check Google Cloud Console configuration.")
        } else if (result.error === "access_denied") {
          setError("Access denied. Please make sure you're a test user or the app is published.")
        } else if (result.error === "invalid_client") {
          setError("Invalid Google OAuth credentials. Please check your configuration.")
        } else {
          setError(`Google sign-in failed: ${result.error}. Please try again.`)
        }
      } else if (result?.ok) {
        console.log("✅ Google sign-in successful")
        window.location.href = "/"
      }
    } catch (error) {
      console.error("❌ Google sign-in exception:", error)
      setError("Google sign-in failed. Please try again.")
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sl-gray to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sl-brown hover:text-sl-black transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Logo and Title */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-3 mb-6">
            <Image
              src="/images/logo.jpeg"
              alt="Shree Laxmi Financial Services"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-sl-black">Shree Laxmi</h1>
              <p className="text-sm text-sl-brown">Financial Services</p>
            </div>
          </Link>
        </div>

        <Card className="border-sl-brown/20 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl text-sl-black">Welcome Back</CardTitle>
            <CardDescription className="text-sl-brown">
              Sign in to your account to access our financial services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Google Sign In */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              variant="outline"
              className="w-full border-sl-brown/30 hover:bg-sl-yellow/10 bg-transparent h-12"
            >
              <Chrome className="w-5 h-5 mr-3" />
              {isGoogleLoading ? "Signing in..." : "Continue with Google"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-sl-brown font-medium">Or continue with email</span>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sl-brown font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-sl-brown/50" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-sl-brown/30 focus:border-sl-brown"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sl-brown font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-sl-brown/50" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-sl-brown/30 focus:border-sl-brown"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-sl-brown/50 hover:text-sl-brown"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link href="/auth/forgot-password" className="text-sl-brown hover:text-sl-black hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-sl-brown text-white hover:bg-sl-brown/90 h-12 font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-sl-brown">Don't have an account? </span>
              <Link href="/auth/signup" className="text-sl-brown font-semibold hover:underline">
                Sign up here
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center text-xs text-sl-brown/70">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}
