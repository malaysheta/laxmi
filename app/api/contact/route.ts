import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Contact from "@/models/Contact"

export async function POST(request: NextRequest) {
  try {
    console.log("📝 Contact form submission received")
    
    const { fullName, email, phone, message } = await request.json()

    if (!fullName || !phone) {
      console.log("❌ Missing required fields:", { fullName: !!fullName, phone: !!phone })
      return NextResponse.json({ error: "Full name and phone number are required" }, { status: 400 })
    }

    console.log("🔗 Connecting to database...")
    await dbConnect()
    console.log("✅ Database connected")

    console.log("📧 Creating contact submission...")
    const contact = await Contact.create({
      fullName,
      email: email || "",
      phone,
      message: message || "",
      status: "new",
    })

    console.log("✅ Contact submission created successfully:", contact.fullName)
    return NextResponse.json(
      {
        message: "Message sent successfully! We'll get back to you soon.",
        contact: {
          id: contact._id,
          fullName: contact.fullName,
          email: contact.email,
          phone: contact.phone,
          status: contact.status,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("❌ Contact submission error:", error)
    return NextResponse.json({ 
      error: "Failed to send message. Please try again.",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    console.log("📋 Fetching contact submissions...")
    
    await dbConnect()
    
    const contacts = await Contact.find({}).sort({ createdAt: -1 })
    
    console.log("✅ Contact submissions fetched successfully")
    return NextResponse.json(contacts)
  } catch (error) {
    console.error("❌ Failed to fetch contact submissions:", error)
    return NextResponse.json({ 
      error: "Failed to fetch contact submissions",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    }, { status: 500 })
  }
} 