import mongoose from "mongoose"

const ContactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["new", "read", "replied", "closed"],
    default: "new",
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

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema) 