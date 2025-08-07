import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

export async function POST() {
  try {
    console.log("👑 Creating admin user...")
    
    await dbConnect()
    
    // Admin credentials
    const adminEmail = "admin@shreelaxmi.com"
    const adminPassword = "admin123456"
    const adminName = "Admin User"
    
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail })
    
    if (existingAdmin) {
      console.log("✅ Admin user already exists")
      return NextResponse.json({ 
        status: "success", 
        message: "Admin user already exists",
        user: {
          email: existingAdmin.email,
          name: existingAdmin.name,
          role: existingAdmin.role
        },
        loginCredentials: {
          email: adminEmail,
          password: adminPassword
        }
      })
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash(adminPassword, 12)
    
    const adminUser = await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    })
    
    console.log("✅ Admin user created successfully")
    
    return NextResponse.json({ 
      status: "success", 
      message: "Admin user created successfully",
      user: {
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role
      },
      loginCredentials: {
        email: adminEmail,
        password: adminPassword
      }
    })
  } catch (error) {
    console.error("❌ Admin user creation failed:", error)
    return NextResponse.json({ 
      status: "error", 
      message: error.message 
    }, { status: 500 })
  }
} 