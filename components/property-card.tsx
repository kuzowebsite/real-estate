"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Bed, Bath, Square, Bookmark } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { useFavorites } from "@/contexts/favorites-context"
import { useRouter } from "next/navigation"

interface PropertyCardProps {
  id: string
  title: string
  price: string
  location: string
  bedrooms?: number
  bathrooms?: number
  area: number
  type: string
  status: string
  image: string
  className?: string
  style?: React.CSSProperties
}

export function PropertyCard({
  id,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  type,
  status,
  image,
  className = "",
  style,
}: PropertyCardProps) {
  const { user } = useAuth()
  const { toggleSaved, toggleFavorite, isSaved, isFavorite } = useFavorites()
  const router = useRouter()

  const saved = isSaved(id)
  const favorite = isFavorite(id)

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      router.push("/login")
      return
    }
    toggleSaved(id)
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      router.push("/login")
      return
    }
    toggleFavorite(id)
  }

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up ${className}`}
      style={style}
    >
      <div className="relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={250}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={status === "Зарах" ? "default" : "secondary"}>{status}</Badge>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            className={`w-8 h-8 bg-background/80 hover:bg-background transition-colors ${saved ? "text-primary" : ""}`}
            onClick={handleSave}
          >
            <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className={`w-8 h-8 bg-background/80 hover:bg-background transition-colors ${favorite ? "text-red-500" : ""}`}
            onClick={handleFavorite}
          >
            <Heart className={`w-4 h-4 ${favorite ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{title}</h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {location}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              {bedrooms && bedrooms > 0 && (
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-1" />
                  {bedrooms}
                </div>
              )}
              {bathrooms && bathrooms > 0 && (
                <div className="flex items-center">
                  <Bath className="w-4 h-4 mr-1" />
                  {bathrooms}
                </div>
              )}
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                {area}м²
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-primary">{price}</div>
          </div>

          <Link href={`/property/${id}`}>
            <Button className="w-full mt-2">Дэлгэрэнгүй үзэх</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
