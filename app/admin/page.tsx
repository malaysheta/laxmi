"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Users, 
  Settings, 
  BarChart3, 
  Shield, 
  Crown, 
  LogOut, 
  Home,
  UserCheck,
  Database,
  Activity,
  Plus,
  Edit,
  Trash2,
  Mail
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Define TeamMember interface
interface TeamMember {
  _id: string;
  name: string;
  position: string;
  experience: string;
  photo: string;
  specialization?: string;
  isActive: boolean;
  createdAt: string;
}

// Define Contact interface
interface Contact {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  status: "new" | "read" | "replied" | "closed";
  createdAt: string;
  updatedAt: string;
}

// Define form data type
interface FormData {
  name: string;
  position: string;
  experience: string;
  photo: string;
  specialization: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    position: "",
    experience: "",
    photo: "",
    specialization: "",
  })

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/admin/signin")
      return
    }

    if ((session.user as any)?.role !== "admin") {
      router.push("/auth/signin")
      return
    }

    fetchTeamMembers()
    fetchContacts()
  }, [session, status, router])

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/team")
      if (response.ok) {
        const data = await response.json()
        setTeamMembers(data)
      } else {
        console.error("Failed to fetch team members")
      }
    } catch (error) {
      console.error("Failed to fetch team members:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contact")
      if (response.ok) {
        const data = await response.json()
        setContacts(data)
      } else {
        console.error("Failed to fetch contacts")
      }
    } catch (error) {
      console.error("Failed to fetch contacts:", error)
    }
  }

  const validatePhotoUrl = (url: string) => {
    if (!url) return true // Allow empty URLs since photo is optional
    try {
      new URL(url)
      return /\.(jpg|jpeg|png|gif)$/i.test(url) // Basic image extension check
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.position || !formData.experience) {
      alert("Please fill in all required fields")
      return
    }
    if (formData.photo && !validatePhotoUrl(formData.photo)) {
      alert("Please provide a valid image URL")
      return
    }
    setIsSubmitting(true)
    try {
      const url = editingMember ? `/api/team/${editingMember._id}` : "/api/team"
      const method = editingMember ? "PUT" : "POST"
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if ((method === "POST" && response.status === 201) || (method === "PUT" && response.status === 200)) {
        await fetchTeamMembers()
        setIsDialogOpen(false)
        setEditingMember(null)
        setFormData({ name: "", position: "", experience: "", photo: "", specialization: "" })
        alert(editingMember ? "Team member updated" : "Team member added")
      } else {
        alert("Failed to save team member")
      }
    } catch (error) {
      console.error("Failed to save team member:", error)
      alert("An error occurred while saving the team member")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      position: member.position,
      experience: member.experience,
      photo: member.photo,
      specialization: member.specialization || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return

    try {
      const response = await fetch(`/api/team/${id}`, {
        method: "DELETE",
      })
      if (response.status === 200) {
        await fetchTeamMembers()
        alert("Team member deleted")
      } else {
        alert("Failed to delete team member")
      }
    } catch (error) {
      console.error("Failed to delete team member:", error)
      alert("An error occurred while deleting the team member")
    }
  }

  const handleAddNew = () => {
    setEditingMember(null)
    setFormData({
      name: "",
      position: "",
      experience: "",
      photo: "",
      specialization: "",
    })
    setIsDialogOpen(true)
  }

  const handleContactStatusUpdate = async (id: string, status: Contact["status"]) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (response.ok) {
        await fetchContacts()
        alert("Contact status updated")
      } else {
        alert("Failed to update contact status")
      }
    } catch (error) {
      console.error("Failed to update contact status:", error)
      alert("An error occurred while updating contact status")
    }
  }

  const handleContactDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact submission?")) return

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        await fetchContacts()
        alert("Contact deleted")
      } else {
        alert("Failed to delete contact")
      }
    } catch (error) {
      console.error("Failed to delete contact:", error)
      alert("An error occurred while deleting the contact")
    }
  }

  const handleSignOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" })
    router.push("/admin/signin")
  }

  if (isLoading || status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session || (session.user as any)?.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src="/images/logo.jpeg"
                    alt="Shree Laxmi Financial Services"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <div className="absolute -top-1 -right-1 bg-amber-500 rounded-full p-1">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Shree Laxmi</h1>
                  <p className="text-sm text-gray-600">Admin Dashboard</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome,</p>
                <p className="text-gray-900 font-medium">{session.user?.name}</p>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Team Management</h2>
          <p className="text-gray-600">Manage your team members and their information</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Team Members</p>
                  <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Members</p>
                  <p className="text-2xl font-bold text-gray-900">{teamMembers.filter(m => m.isActive).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Database className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Positions</p>
                  <p className="text-2xl font-bold text-gray-900">{new Set(teamMembers.map(m => m.position)).size}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <Activity className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">System Status</p>
                  <p className="text-2xl font-bold text-green-600">Online</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Mail className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">New Messages</p>
                  <p className="text-2xl font-bold text-gray-900">{contacts.filter(c => c.status === "new").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Management Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Team Members</h3>
              <p className="text-gray-600">Add, edit, and manage your team members</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddNew} className="bg-amber-600 text-white hover:bg-amber-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Team Member
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingMember ? "Edit Team Member" : "Add New Team Member"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">Position *</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      placeholder="Enter position"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Experience *</Label>
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="e.g., 10+ Years Experience"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="photo">Photo URL</Label>
                    <Input
                      id="photo"
                      value={formData.photo}
                      onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                      placeholder="Enter photo URL (optional)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialization">Specialization</Label>
                    <Textarea
                      id="specialization"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      placeholder="Enter specialization"
                      rows={3}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-amber-600 text-white hover:bg-amber-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : editingMember ? "Update Member" : "Add Member"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Team Members Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card key={member._id} className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <Image
                      src={member.photo || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover border-2 border-amber-500"
                    />
                  </div>
                  <CardTitle className="text-lg text-gray-900">{member.name}</CardTitle>
                  <CardDescription className="text-gray-600">{member.position}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                    {member.experience}
                  </Badge>
                  {member.specialization && <p className="text-sm text-gray-600">{member.specialization}</p>}
                  <p className="text-sm text-gray-600">Status: {member.isActive ? "Active" : "Inactive"}</p>
                  <p className="text-sm text-gray-600">
                    Added: {new Date(member.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex justify-center space-x-2 pt-4">
                    <Button
                      onClick={() => handleEdit(member)}
                      size="sm"
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(member._id)}
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {teamMembers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No team members found</h3>
              <p className="text-gray-600 mb-4">
                Add team members to showcase your staff and their expertise on your website.
              </p>
              <Button onClick={handleAddNew} className="bg-amber-600 text-white hover:bg-amber-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
            </div>
          )}
        </div>

        {/* Contact Submissions Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Contact Submissions</h3>
              <p className="text-gray-600">View and manage contact form submissions</p>
            </div>
          </div>

          {/* Contact Submissions List */}
          <div className="space-y-4">
            {contacts.map((contact) => (
              <Card key={contact._id} className="bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">{contact.fullName}</h4>
                        <Badge 
                          variant="secondary" 
                          className={
                            contact.status === "new" ? "bg-red-100 text-red-800 border-red-200" :
                            contact.status === "read" ? "bg-blue-100 text-blue-800 border-blue-200" :
                            contact.status === "replied" ? "bg-green-100 text-green-800 border-green-200" :
                            "bg-gray-100 text-gray-800 border-gray-200"
                          }
                        >
                          {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="text-gray-900">{contact.email || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="text-gray-900">{contact.phone}</p>
                        </div>
                      </div>
                      
                      {contact.message && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600">Message</p>
                          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{contact.message}</p>
                        </div>
                      )}
                      
                      <div className="text-sm text-gray-500">
                        Submitted: {new Date(contact.createdAt).toLocaleString()}
                        {contact.updatedAt !== contact.createdAt && (
                          <span className="ml-4">
                            Updated: {new Date(contact.updatedAt).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleContactStatusUpdate(contact._id, "read")}
                          size="sm"
                          variant="outline"
                          className="border-blue-300 text-blue-600 hover:bg-blue-50"
                          disabled={contact.status === "read"}
                        >
                          Mark Read
                        </Button>
                        <Button
                          onClick={() => handleContactStatusUpdate(contact._id, "replied")}
                          size="sm"
                          variant="outline"
                          className="border-green-300 text-green-600 hover:bg-green-50"
                          disabled={contact.status === "replied"}
                        >
                          Mark Replied
                        </Button>
                        <Button
                          onClick={() => handleContactStatusUpdate(contact._id, "closed")}
                          size="sm"
                          variant="outline"
                          className="border-gray-300 text-gray-600 hover:bg-gray-50"
                          disabled={contact.status === "closed"}
                        >
                          Close
                        </Button>
                      </div>
                      <Button
                        onClick={() => handleContactDelete(contact._id)}
                        size="sm"
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {contacts.length === 0 && (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No contact submissions found</h3>
              <p className="text-gray-600">
                Contact form submissions will appear here when users send messages.
              </p>
            </div>
          )}
        </div>

        {/* Back to Site */}
        <div className="text-center">
          <Link href="/">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
              <Home className="w-4 h-4 mr-2" />
              Back to Website
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}