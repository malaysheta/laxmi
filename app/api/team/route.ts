import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import TeamMember from "@/models/TeamMember"
import path from "path"
import { promises as fs } from "fs"

export async function GET() {
  try {
    await dbConnect()
    const teamMembers = await TeamMember.find({ isActive: true }).sort({ createdAt: 1 })
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

    const contentType = request.headers.get("content-type") || ""
    let name = ""
    let position = ""
    let experience = ""
    let specialization = ""
    let photoPath: string | undefined

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData()
      name = String(formData.get("name") || "")
      position = String(formData.get("position") || "")
      experience = String(formData.get("experience") || "")
      specialization = String(formData.get("specialization") || "")

      const directPhoto = formData.get("photo")
      if (directPhoto && typeof directPhoto === "string" && directPhoto.trim().length > 0) {
        photoPath = directPhoto
      }

      const photoFile = formData.get("photoFile") as unknown as File | null
      if (photoFile && typeof (photoFile as any).arrayBuffer === "function") {
        const buffer = Buffer.from(await photoFile.arrayBuffer())
        const uploadDir = path.join(process.cwd(), "public", "uploads", "team")
        await fs.mkdir(uploadDir, { recursive: true })
        const sanitizedName = photoFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")
        const filename = `${Date.now()}-${sanitizedName}`
        const destPath = path.join(uploadDir, filename)
        await fs.writeFile(destPath, buffer)
        photoPath = `/uploads/team/${filename}`
      }
    } else {
      const body = await request.json()
      name = body.name
      position = body.position
      experience = body.experience
      specialization = body.specialization || ""
      photoPath = body.photo
    }

    if (!name || !position || !experience) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await dbConnect()

    const teamMember = await TeamMember.create({
      name,
      position,
      experience,
      photo: photoPath || "/placeholder.svg?height=200&width=200",
      specialization,
    })

    return NextResponse.json(teamMember, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 })
  }
}
