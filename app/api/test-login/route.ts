import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

export async function POST() {
  try {
    console.log("🧪 Creating test user for login verification...")
    
    await dbConnect()
    
    // Check if test user already exists
    const existingUser = await User.findOne({ email: "test@example.com" })
    
    if (existingUser) {
      console.log("✅ Test user already exists")
      return NextResponse.json({ 
        status: "success", 
        message: "Test user already exists",
        user: {
          email: existingUser.email,
          name: existingUser.name,
          role: existingUser.role
        }
      })
    }
    
    // Create test user
    const hashedPassword = await bcrypt.hash("password123", 12)
    
    const testUser = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
      role: "user",
    })
    
    console.log("✅ Test user created successfully")
    
    return NextResponse.json({ 
      status: "success", 
      message: "Test user created successfully",
      user: {
        email: testUser.email,
        name: testUser.name,
        role: testUser.role
      },
      loginCredentials: {
        email: "test@example.com",
        password: "password123"
      }
    })
  } catch (error) {
    console.error("❌ Test user creation failed:", error)
    return NextResponse.json({ 
      status: "error", 
      message: error.message 
    }, { status: 500 })
  }
} 