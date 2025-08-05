"use client";

import type React from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Users, Shield, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { toast } from "react-toastify";

// Define custom session type
interface CustomUser {
  name?: string | null;
  role?: string | null;
}

interface CustomSession extends Session {
  user: CustomUser;
}

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

// Define form data type
interface FormData {
  name: string;
  position: string;
  experience: string;
  photo: string;
  specialization: string;
}

export default function AdminPanel() {
  const { data: session, status } = useSession() as { data: CustomSession | null; status: string };
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    position: "",
    experience: "",
    photo: "",
    specialization: "",
  });

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role !== "admin") {
      router.push("/auth/signin");
      return;
    }

    fetchTeamMembers();
  }, [session, status]);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/team");
      if (response.ok) {
        const data = await response.json();
        setTeamMembers(data);
      } else {
        toast.error("Failed to fetch team members");
      }
    } catch (error) {
      console.error("Failed to fetch team members:", error);
      toast.error("An error occurred while fetching team members");
    } finally {
      setIsLoading(false);
    }
  };

  const validatePhotoUrl = (url: string) => {
    if (!url) return true; // Allow empty URLs since photo is optional
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|gif)$/i.test(url); // Basic image extension check
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.position || !formData.experience) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (formData.photo && !validatePhotoUrl(formData.photo)) {
      toast.error("Please provide a valid image URL");
      return;
    }
    setIsSubmitting(true);
    try {
      const url = editingMember ? `/api/team/${editingMember._id}` : "/api/team";
      const method = editingMember ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if ((method === "POST" && response.status === 201) || (method === "PUT" && response.status === 200)) {
        await fetchTeamMembers();
        setIsDialogOpen(false);
        setEditingMember(null);
        setFormData({ name: "", position: "", experience: "", photo: "", specialization: "" });
        toast.success(editingMember ? "Team member updated" : "Team member added");
      } else {
        toast.error("Failed to save team member");
      }
    } catch (error) {
      console.error("Failed to save team member:", error);
      toast.error("An error occurred while saving the team member");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      experience: member.experience,
      photo: member.photo,
      specialization: member.specialization || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      const response = await fetch(`/api/team/${id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        await fetchTeamMembers();
        toast.success("Team member deleted");
      } else {
        toast.error("Failed to delete team member");
      }
    } catch (error) {
      console.error("Failed to delete team member:", error);
      toast.error("An error occurred while deleting the team member");
    }
  };

  const handleAddNew = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      position: "",
      experience: "",
      photo: "",
      specialization: "",
    });
    setIsDialogOpen(true);
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-sl-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sl-brown mx-auto mb-4"></div>
          <p className="text-sl-brown">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-sl-gray">
      {/* Add ToastContainer in your root layout or here */}
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-sl-brown/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Image
                src={process.env.NEXT_PUBLIC_LOGO_PATH || "/images/logo.jpeg"}
                alt="Shree Laxmi Financial Services"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <h1 className="text-xl font-bold text-sl-black">Admin Panel</h1>
                <p className="text-sm text-sl-brown">Shree Laxmi Financial Services</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-sl-yellow text-sl-black">
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </Badge>
              <span className="text-sl-brown">Welcome, {session.user.name}</span>
              <Button
                onClick={() => signOut({ callbackUrl: process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT || "/" })}
                variant="outline"
                size="sm"
                className="border-sl-brown/30 text-sl-brown hover:bg-sl-brown hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-sl-black">Team Management</h2>
              <p className="text-sl-brown">Manage your team members and their information</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddNew} className="bg-sl-brown text-white hover:bg-sl-brown/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Team Member
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md" aria-describedby="dialog-description">
                <DialogHeader>
                  <DialogTitle className="text-sl-black">
                    {editingMember ? "Edit Team Member" : "Add New Team Member"}
                  </DialogTitle>
                  <div id="dialog-description" className="sr-only">
                    Form to {editingMember ? "edit an existing" : "add a new"} team member
                  </div>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sl-brown">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="position" className="text-sl-brown">
                      Position *
                    </Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      placeholder="Enter position"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience" className="text-sl-brown">
                      Experience *
                    </Label>
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="e.g., 10+ Years Experience"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="photo" className="text-sl-brown">
                      Photo URL
                    </Label>
                    <Input
                      id="photo"
                      value={formData.photo}
                      onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                      placeholder="Enter photo URL (optional)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialization" className="text-sl-brown">
                      Specialization
                    </Label>
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
                    className="w-full bg-sl-yellow text-sl-black hover:bg-sl-yellow/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : editingMember ? "Update Member" : "Add Member"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white border-sl-brown/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-sl-brown">Total Team Members</CardTitle>
                <Users className="h-4 w-4 text-sl-brown" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-sl-black">{teamMembers.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Team Members Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card key={member._id} className="bg-white border-sl-brown/20">
                <CardHeader className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <Image
                      src={member.photo || "https://via.placeholder.com/200"}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover border-2 border-sl-yellow"
                    />
                  </div>
                  <CardTitle className="text-lg text-sl-black">{member.name}</CardTitle>
                  <CardDescription className="text-sl-brown">{member.position}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <Badge variant="secondary" className="bg-sl-yellow text-sl-black">
                    {member.experience}
                  </Badge>
                  {member.specialization && <p className="text-sm text-sl-brown">{member.specialization}</p>}
                  <p className="text-sm text-sl-brown">Status: {member.isActive ? "Active" : "Inactive"}</p>
                  <p className="text-sm text-sl-brown">
                    Added: {new Date(member.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex justify-center space-x-2 pt-4">
                    <Button
                      onClick={() => handleEdit(member)}
                      size="sm"
                      variant="outline"
                      className="border-sl-brown/30 text-sl-brown hover:bg-sl-brown hover:text-white"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(member._id)}
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-600 hover:text-white"
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
              <Users className="w-12 h-12 text-sl-brown/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-sl-black mb-2">No team members found</h3>
              <p className="text-sl-brown mb-4">
                Add team members to showcase your staff and their expertise on your website.
              </p>
              <Button onClick={handleAddNew} className="bg-sl-brown text-white hover:bg-sl-brown/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}