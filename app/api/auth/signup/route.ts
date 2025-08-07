import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: NextRequest) {
  try {
    console.log("📝 Signup request received")
    
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      console.log("❌ Missing required fields:", { name: !!name, email: !!email, password: !!password })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (password.length < 6) {
      console.log("❌ Password too short")
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    console.log("🔗 Connecting to database...")
    await dbConnect()
    console.log("✅ Database connected")

    console.log("🔍 Checking for existing user...")
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log("❌ User already exists:", email)
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    console.log("🔐 Hashing password...")
    const hashedPassword = await bcrypt.hash(password, 12)

    console.log("👤 Creating new user...")
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    })

    console.log("✅ User created successfully:", user.email)
    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("❌ Signup error:", error)
    return NextResponse.json({ 
      error: "Failed to create user",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    }, { status: 500 })
  }
}
