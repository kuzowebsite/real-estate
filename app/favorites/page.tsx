"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MapPin, Bed, Bath, Square, Search, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock favorite listings data
const favoriteListings = [
  {
    id: "3",
    title: "Шинэ барилгын 2 өрөөтэй байр",
    price: "380,000,000₮",
    location: "Баянзүрх дүүрэг, 3-р хороо",
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    type: "Орон сууц",
    status: "Зарах",
    image: "/modern-apartment.png",
    likedDate: "2024-01-12",
  },
]

export default function FavoritesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredListings = favoriteListings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || listing.type === filterType

    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-foreground mb-2">Таалагдсан зарууд</h1>
          <p className="text-muted-foreground">Таны таалагдсан үл хөдлөх хөрөнгийн зарууд</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4 animate-fade-in-up animate-delay-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Зар хайх..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Төрөл" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Бүгд</SelectItem>
                <SelectItem value="Орон сууц">Орон сууц</SelectItem>
                <SelectItem value="Байшин">Байшин</SelectItem>
                <SelectItem value="Оффис">Оффис</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 animate-fade-in-up animate-delay-200">
          <p className="text-muted-foreground">{filteredListings.length} зар олдлоо</p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing, index) => (
            <Card
              key={listing.id}
              className="group hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                <Image
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="default">{listing.status}</Badge>
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="w-8 h-8 bg-background/80 hover:bg-background hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {listing.title}
                    </h3>
                    <div className="flex items-center text-muted-foreground text-sm mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {listing.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        {listing.bedrooms}
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        {listing.bathrooms}
                      </div>
                      <div className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        {listing.area}м²
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-primary">{listing.price}</div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Таалагдсан: {new Date(listing.likedDate).toLocaleDateString("mn-MN")}
                  </div>

                  <Link href={`/property/${listing.id}`}>
                    <Button className="w-full mt-2">Дэлгэрэнгүй үзэх</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12 animate-fade-in-up">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Таалагдсан зар байхгүй</h3>
            <p className="text-muted-foreground mb-4">Та одоогоор ямар нэг зарт дуртай гэж тэмдэглээгүй байна</p>
            <Link href="/rent">
              <Button>Зар хайх</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
