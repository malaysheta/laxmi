"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface TeamMemberProps {
  name: string
  position: string
  experience: string
  photo: string
  specialization?: string
}

export function TeamMember({ name, position, experience, photo, specialization }: TeamMemberProps) {
  return (
    <Card className="bg-sl-gray border-sl-brown/20 hover:shadow-lg transition-shadow">
      <CardContent className="p-6 text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={photo || "/placeholder.svg"}
            alt={name}
            fill
            className="rounded-full object-cover border-4 border-sl-yellow"
          />
        </div>
        <h3 className="text-xl font-bold text-sl-black mb-2">{name}</h3>
        <p className="text-sl-brown font-semibold mb-2">{position}</p>
        <Badge variant="secondary" className="bg-sl-yellow text-sl-black mb-3">
          {experience}
        </Badge>
        {specialization && <p className="text-sm text-sl-brown/80">{specialization}</p>}
      </CardContent>
    </Card>
  )
}
