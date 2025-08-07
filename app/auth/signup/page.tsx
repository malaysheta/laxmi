"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Mail, Lock, Chrome, Eye, EyeOff, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const validatePassword = (password: string) => {
    const minLength = password.length >= 6
    const hasNumber = /\d/.test(password)
    const hasLetter = /[a-zA-Z]/.test(password)
    return { minLength, hasNumber, hasLetter, isValid: minLength && hasNumber && hasLetter }
  }

  const passwordValidation = validatePassword(password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    console.log("📝 Attempting signup with:", { name, email, password: password ? "***" : "empty" })

    if (!acceptTerms) {
      setError("Please accept the Terms of Service and Privacy Policy")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (!passwordValidation.isValid) {
      setError("Password must be at least 6 characters and contain both letters and numbers")
      setIsLoading(false)
      return
    }

    try {
      console.log("📡 Sending signup request...")
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      console.log("📥 Signup response status:", response.status)
      const data = await response.json()
      console.log("📥 Signup response data:", data)

      if (response.ok) {
        setSuccess("Account created successfully! Signing you in...")
        console.log("✅ Account created, attempting auto sign in...")
        
        // Auto sign in after successful registration
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        })

        console.log("🔐 Auto sign in result:", result)

        if (result?.ok) {
          console.log("✅ Auto sign in successful")
          router.push("/")
        } else {
          console.log("⚠️  Auto sign in failed, user can sign in manually")
          setSuccess("Account created successfully! You can now sign in.")
        }
      } else {
        console.error("❌ Signup failed:", data.error)
        setError(data.error || "Something went wrong")
      }
    } catch (error) {
      console.error("❌ Signup exception:", error)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    try {
      console.log("🌐 Attempting Google sign up...")
      await signIn("google", { callbackUrl: "/" })
    } catch (error) {
      console.error("❌ Google sign-up error:", error)
      setError("Google sign-up failed. Please try again.")
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
            <CardTitle className="text-2xl text-sl-black">Create Your Account</CardTitle>
            <CardDescription className="text-sl-brown">
              Join thousands of satisfied clients and start your financial journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Google Sign Up */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              variant="outline"
              className="w-full border-sl-brown/30 hover:bg-sl-yellow/10 bg-transparent h-12"
            >
              <Chrome className="w-5 h-5 mr-3" />
              {isGoogleLoading ? "Creating account..." : "Continue with Google"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-sl-brown font-medium">Or create with email</span>
              </div>
            </div>

            {/* Error/Success Alerts */}
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50">
                <Check className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sl-brown font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-sl-brown/50" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-12 border-sl-brown/30 focus:border-sl-brown"
                    required
                  />
                </div>
              </div>

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
                    placeholder="Create a password"
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

                {/* Password Requirements */}
                {password && (
                  <div className="text-xs space-y-1 mt-2">
                    <div
                      className={`flex items-center space-x-2 ${passwordValidation.minLength ? "text-green-600" : "text-red-600"}`}
                    >
                      <div
                        className={`w-1 h-1 rounded-full ${passwordValidation.minLength ? "bg-green-600" : "bg-red-600"}`}
                      />
                      <span>At least 6 characters</span>
                    </div>
                    <div
                      className={`flex items-center space-x-2 ${passwordValidation.hasLetter ? "text-green-600" : "text-red-600"}`}
                    >
                      <div
                        className={`w-1 h-1 rounded-full ${passwordValidation.hasLetter ? "bg-green-600" : "bg-red-600"}`}
                      />
                      <span>Contains letters</span>
                    </div>
                    <div
                      className={`flex items-center space-x-2 ${passwordValidation.hasNumber ? "text-green-600" : "text-red-600"}`}
                    >
                      <div
                        className={`w-1 h-1 rounded-full ${passwordValidation.hasNumber ? "bg-green-600" : "bg-red-600"}`}
                      />
                      <span>Contains numbers</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sl-brown font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-sl-brown/50" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-sl-brown/30 focus:border-sl-brown"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 text-sl-brown/50 hover:text-sl-brown"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-600">Passwords do not match</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className="border-sl-brown/30"
                />
                <Label htmlFor="terms" className="text-xs text-sl-brown leading-relaxed">
                  I agree to the{" "}
                  <Link href="/terms" className="text-sl-brown font-semibold hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-sl-brown font-semibold hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-sl-brown text-white hover:bg-sl-brown/90 h-12 font-medium"
                disabled={isLoading || !acceptTerms}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-sl-brown">Already have an account? </span>
              <Link href="/auth/signin" className="text-sl-brown font-semibold hover:underline">
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center text-xs text-sl-brown/70">
          <p>Your information is secure and will never be shared with third parties</p>
        </div>
      </div>
    </div>
  )
}
