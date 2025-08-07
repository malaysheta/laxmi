import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

export async function GET() {
  try {
    console.log("🧪 Testing database connection...")
    
    await dbConnect()
    console.log("✅ Database connected successfully")
    
    // Test creating a user
    const testUser = await User.findOne({ email: "test@example.com" })
    console.log("✅ User query successful")
    
    return NextResponse.json({ 
      status: "success", 
      message: "Database connection working",
      userCount: await User.countDocuments()
    })
  } catch (error) {
    console.error("❌ Database test failed:", error)
    return NextResponse.json({ 
      status: "error", 
      message: error.message 
    }, { status: 500 })
  }
} 