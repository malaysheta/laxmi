import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("🧪 Testing Google OAuth configuration...")
    
    // Check environment variables
    const googleClientId = process.env.GOOGLE_CLIENT_ID
    const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
    const nextAuthUrl = process.env.NEXTAUTH_URL
    
    console.log("📋 Environment variables check:")
    console.log("- GOOGLE_CLIENT_ID:", googleClientId ? "Set" : "Not set")
    console.log("- GOOGLE_CLIENT_SECRET:", googleClientSecret ? "Set" : "Not set")
    console.log("- NEXTAUTH_URL:", nextAuthUrl || "Not set")
    
    // Check if credentials are properly formatted
    const isClientIdValid = googleClientId && googleClientId.includes('.apps.googleusercontent.com')
    const isClientSecretValid = googleClientSecret && googleClientSecret.length > 0
    
    const issues = []
    
    if (!googleClientId) {
      issues.push("GOOGLE_CLIENT_ID is not set")
    } else if (!isClientIdValid) {
      issues.push("GOOGLE_CLIENT_ID format is invalid (should end with .apps.googleusercontent.com)")
    }
    
    if (!googleClientSecret) {
      issues.push("GOOGLE_CLIENT_SECRET is not set")
    } else if (!isClientSecretValid) {
      issues.push("GOOGLE_CLIENT_SECRET format is invalid")
    }
    
    if (!nextAuthUrl) {
      issues.push("NEXTAUTH_URL is not set")
    }
    
    // Check if Google provider would be loaded
    const googleProviderEnabled = googleClientId && googleClientSecret
    
    return NextResponse.json({
      status: "success",
      googleOAuthEnabled: googleProviderEnabled,
      environmentVariables: {
        googleClientId: googleClientId ? "Set" : "Not set",
        googleClientSecret: googleClientSecret ? "Set" : "Not set",
        nextAuthUrl: nextAuthUrl || "Not set"
      },
      validation: {
        clientIdValid: isClientIdValid,
        clientSecretValid: isClientSecretValid,
        nextAuthUrlValid: !!nextAuthUrl
      },
      issues: issues,
      redirectUri: nextAuthUrl ? `${nextAuthUrl}/api/auth/callback/google` : "Cannot determine",
      recommendations: issues.length > 0 ? [
        "Fix the issues listed above",
        "Ensure Google+ API is enabled in Google Cloud Console",
        "Configure OAuth consent screen in Google Cloud Console",
        "Add the redirect URI to authorized redirect URIs in Google Cloud Console"
      ] : [
        "Environment variables look good",
        "Check Google Cloud Console for API and consent screen configuration",
        "Verify redirect URI is added to authorized redirect URIs"
      ]
    })
  } catch (error) {
    console.error("❌ Google OAuth test failed:", error)
    return NextResponse.json({ 
      status: "error", 
      message: error.message 
    }, { status: 500 })
  }
} 