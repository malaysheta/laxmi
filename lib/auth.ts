import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import dbConnect from "./mongodb"
import User from "../models/User"

// Use default values for development if not set
const NEXTAUTH_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "your-super-secret-key-here-make-it-long-and-random-at-least-32-characters";

// Check for required environment variables
if (!process.env.NEXTAUTH_SECRET) {
  console.warn("⚠️  NEXTAUTH_SECRET environment variable is not set. Using default secret for development.");
  console.warn("📝 Please create a .env.local file with a secure secret for production.");
  console.warn("Example: NEXTAUTH_SECRET=your-super-secret-key-here-make-it-long-and-random");
}

if (!process.env.NEXTAUTH_URL) {
  console.warn("⚠️  NEXTAUTH_URL environment variable is not set. Using default URL for development.");
  console.warn("📝 Please create a .env.local file with your app URL for production.");
  console.warn("Example: NEXTAUTH_URL=http://localhost:3001");
}

export const authOptions: NextAuthOptions = {
  providers: [
    // Only add Google provider if credentials are available
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    ] : (() => {
      console.warn("⚠️  Google OAuth credentials not found. Google sign-in will be disabled.");
      console.warn("📝 To enable Google sign-in, add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to your .env.local file");
      return [];
    })()),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials:", { email: !!credentials?.email, password: !!credentials?.password })
          return null
        }

        try {
          console.log("🔗 Connecting to database for authentication...")
          await dbConnect()
          console.log("✅ Database connected for authentication")

          console.log("🔍 Looking for user:", credentials.email)
          const user = await User.findOne({ email: credentials.email })

          if (!user) {
            console.log("❌ User not found:", credentials.email)
            return null
          }

          if (!user.password) {
            console.log("❌ User has no password (Google user):", credentials.email)
            return null
          }

          console.log("🔐 Verifying password...")
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

          if (!isPasswordValid) {
            console.log("❌ Invalid password for user:", credentials.email)
            return null
          }

          console.log("✅ Authentication successful for user:", credentials.email)
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error("❌ Authentication error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          await dbConnect()

          const existingUser = await User.findOne({ email: user.email })

          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              googleId: account.providerAccountId,
              image: user.image,
              role: "user",
            })
          }
        } catch (error) {
          console.error("❌ Google sign-in error:", error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        try {
          await dbConnect()
          const dbUser = await User.findOne({ email: user.email })
          if (dbUser) {
            token.role = dbUser.role
            token.id = dbUser._id.toString()
          }
        } catch (error) {
          console.error("❌ JWT callback error:", error)
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string
        (session.user as any).role = token.role as string
      }
      return session
    },
  },
  pages: {      
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
}
