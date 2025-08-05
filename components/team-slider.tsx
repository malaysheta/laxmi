"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { TeamMember } from "@/components/team-member"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TeamMemberData {
  name: string
  position: string
  experience: string
  photo: string
  specialization?: string
}

interface TeamSliderProps {
  teamMembers: TeamMemberData[]
}

export function TeamSlider({ teamMembers }: TeamSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else if (window.innerWidth < 1280) {
        setItemsPerView(3)
      } else {
        setItemsPerView(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, teamMembers.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  if (teamMembers.length <= 4) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {teamMembers.map((member, index) => (
            <div key={index} className="flex-shrink-0" style={{ width: `${100 / itemsPerView}%` }}>
              <div className="px-4">
                <TeamMember {...member} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white border-sl-brown text-sl-brown hover:bg-sl-brown hover:text-white"
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white border-sl-brown text-sl-brown hover:bg-sl-brown hover:text-white"
        onClick={nextSlide}
        disabled={currentIndex >= maxIndex}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-sl-brown" : "bg-sl-brown/30"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
