"use client"

import { useState, useEffect } from "react"
import { signIn, getSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DebugPage() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [testResult, setTestResult] = useState<any>(null)
  const [loginResult, setLoginResult] = useState<any>(null)
  const [googleResult, setGoogleResult] = useState<any>(null)
  const [adminResult, setAdminResult] = useState<any>(null)
  const [email, setEmail] = useState("test@example.com")
  const [password, setPassword] = useState("password123")
  const [adminEmail, setAdminEmail] = useState("admin@shreelaxmi.com")
  const [adminPassword, setAdminPassword] = useState("admin123456")

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const sessionData = await getSession()
      setSession(sessionData)
    } catch (error) {
      console.error("Session check error:", error)
    } finally {
      setLoading(false)
    }
  }

  const testDatabase = async () => {
    try {
      const response = await fetch("/api/test-db")
      const data = await response.json()
      setTestResult(data)
    } catch (error) {
      setTestResult({ error: error.message })
    }
  }

  const testLogin = async () => {
    try {
      setLoginResult({ loading: true })
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      setLoginResult(result)
      await checkSession()
    } catch (error) {
      setLoginResult({ error: error.message })
    }
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    await checkSession()
  }

  const testGoogleSignIn = async () => {
    try {
      setGoogleResult({ loading: true })
      const result = await signIn("google", { redirect: false })
      setGoogleResult(result)
    } catch (error) {
      setGoogleResult({ error: error.message })
    }
  }

  const testAdminSignIn = async () => {
    try {
      setAdminResult({ loading: true })
      const result = await signIn("credentials", {
        email: adminEmail,
        password: adminPassword,
        redirect: false,
      })
      setAdminResult(result)
      await checkSession()
    } catch (error) {
      setAdminResult({ error: error.message })
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Authentication Debug Page</h1>
      
      {/* Current Session */}
      <Card>
        <CardHeader>
          <CardTitle>Current Session</CardTitle>
          <CardDescription>Check if user is authenticated</CardDescription>
        </CardHeader>
        <CardContent>
          {session ? (
            <div className="space-y-2">
              <p><strong>Status:</strong> Authenticated</p>
              <p><strong>Email:</strong> {session.user?.email}</p>
              <p><strong>Name:</strong> {session.user?.name}</p>
              <p><strong>Role:</strong> {session.user?.role}</p>
              <Button onClick={handleSignOut} variant="destructive">
                Sign Out
              </Button>
            </div>
          ) : (
            <p>Not authenticated</p>
          )}
        </CardContent>
      </Card>

      {/* Database Test */}
      <Card>
        <CardHeader>
          <CardTitle>Database Connection Test</CardTitle>
          <CardDescription>Test MongoDB connection</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={testDatabase}>Test Database</Button>
          {testResult && (
            <pre className="mt-4 p-4 bg-gray-100 rounded">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          )}
        </CardContent>
      </Card>

      {/* Login Test */}
      <Card>
        <CardHeader>
          <CardTitle>Login Test</CardTitle>
          <CardDescription>Test login with test credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={testLogin} disabled={loginResult?.loading}>
            {loginResult?.loading ? "Testing..." : "Test Login"}
          </Button>
          {loginResult && (
            <pre className="mt-4 p-4 bg-gray-100 rounded">
              {JSON.stringify(loginResult, null, 2)}
            </pre>
          )}
        </CardContent>
      </Card>

      {/* Google OAuth Test */}
      <Card>
        <CardHeader>
          <CardTitle>Google OAuth Test</CardTitle>
          <CardDescription>Test Google sign-in functionality</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={testGoogleSignIn} disabled={googleResult?.loading}>
            {googleResult?.loading ? "Testing..." : "Test Google Sign In"}
          </Button>
          {googleResult && (
            <pre className="mt-4 p-4 bg-gray-100 rounded">
              {JSON.stringify(googleResult, null, 2)}
            </pre>
          )}
        </CardContent>
      </Card>

      {/* Admin Login Test */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Login Test</CardTitle>
          <CardDescription>Test admin login with admin credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="adminEmail">Admin Email</Label>
            <Input
              id="adminEmail"
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="adminPassword">Admin Password</Label>
            <Input
              id="adminPassword"
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
          </div>
          <Button onClick={testAdminSignIn} disabled={adminResult?.loading}>
            {adminResult?.loading ? "Testing..." : "Test Admin Login"}
          </Button>
          {adminResult && (
            <pre className="mt-4 p-4 bg-gray-100 rounded">
              {JSON.stringify(adminResult, null, 2)}
            </pre>
          )}
        </CardContent>
      </Card>

      {/* Environment Info */}
      <Card>
        <CardHeader>
          <CardTitle>Environment Information</CardTitle>
          <CardDescription>Check environment variables</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>NEXTAUTH_URL:</strong> {process.env.NEXT_PUBLIC_NEXTAUTH_URL || "Not set"}</p>
            <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
            <p><strong>MongoDB URI:</strong> {process.env.MONGODB_URI ? "Set" : "Not set"}</p>
            <p><strong>Google Client ID:</strong> {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? "Set" : "Not set"}</p>
            <p><strong>Google Client Secret:</strong> {process.env.GOOGLE_CLIENT_SECRET ? "Set" : "Not set"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Troubleshooting Guide</CardTitle>
          <CardDescription>Common issues and solutions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                <strong>Issue:</strong> Login not working<br/>
                <strong>Solution:</strong> Check if MongoDB is running and environment variables are set
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertDescription>
                <strong>Issue:</strong> Session not persisting<br/>
                <strong>Solution:</strong> Ensure NEXTAUTH_SECRET is set and NEXTAUTH_URL matches your app URL
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertDescription>
                <strong>Test Credentials:</strong><br/>
                Email: test@example.com<br/>
                Password: password123
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 