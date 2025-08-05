import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import TeamMember from "@/models/TeamMember"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, position, experience, photo, specialization } = body

    await dbConnect()

    const teamMember = await TeamMember.findByIdAndUpdate(
      params.id,
      {
        name,
        position,
        experience,
        photo,
        specialization,
        updatedAt: new Date(),
      },
      { new: true },
    )

    if (!teamMember) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 })
    }

    return NextResponse.json(teamMember)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const teamMember = await TeamMember.findByIdAndUpdate(
      params.id,
      { isActive: false, updatedAt: new Date() },
      { new: true },
    )

    if (!teamMember) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Team member deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 })
  }
}
