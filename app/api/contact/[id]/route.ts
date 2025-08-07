import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Contact from "@/models/Contact"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("📝 Updating contact submission:", params.id)
    
    const { status } = await request.json()

    if (!status || !["new", "read", "replied", "closed"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    await dbConnect()
    
    const contact = await Contact.findByIdAndUpdate(
      params.id,
      { 
        status,
        updatedAt: new Date()
      },
      { new: true }
    )

    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    console.log("✅ Contact status updated successfully")
    return NextResponse.json(contact)
  } catch (error) {
    console.error("❌ Failed to update contact:", error)
    return NextResponse.json({ 
      error: "Failed to update contact",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("🗑️ Deleting contact submission:", params.id)
    
    await dbConnect()
    
    const contact = await Contact.findByIdAndDelete(params.id)

    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    console.log("✅ Contact deleted successfully")
    return NextResponse.json({ message: "Contact deleted successfully" })
  } catch (error) {
    console.error("❌ Failed to delete contact:", error)
    return NextResponse.json({ 
      error: "Failed to delete contact",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    }, { status: 500 })
  }
} 