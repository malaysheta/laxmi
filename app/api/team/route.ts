import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import TeamMember from "@/models/TeamMember"

export async function GET() {
  try {
    await dbConnect()
    const teamMembers = await TeamMember.find({ isActive: true }).sort({ createdAt: -1 })
    return NextResponse.json(teamMembers)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, position, experience, photo, specialization } = body

    if (!name || !position || !experience) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await dbConnect()

    const teamMember = await TeamMember.create({
      name,
      position,
      experience,
      photo: photo || "/placeholder.svg?height=200&width=200",
      specialization,
    })

    return NextResponse.json(teamMember, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 })
  }
}
