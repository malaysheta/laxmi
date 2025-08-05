import mongoose from "mongoose"

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "/placeholder.svg?height=200&width=200",
  },
  specialization: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.TeamMember || mongoose.model("TeamMember", TeamMemberSchema)
