"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Building2, Home, Store, Warehouse, TreePine } from "lucide-react"

interface CategoryHeroSectionProps {
  title: string
  subtitle: string
  category: string
  type: "rent" | "sell" | "projects"
}

export function CategoryHeroSection({ title, subtitle, category, type }: CategoryHeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")

  const districts = [
    "Баянзүрх дүүрэг",
    "Баянгол дүүрэг",
    "Сүхбаатар дүүрэг",
    "Хан-Уул дүүрэг",
    "Чингэлтэй дүүрэг",
    "Сонгинохайрхан дүүрэг",
  ]

  const getCategoryIcon = () => {
    switch (category) {
      case "apartments":
        return Building2
      case "houses":
        return Home
      case "offices":
        return Store
      case "commercial":
        return Store
      case "warehouse":
        return Warehouse
      case "land":
        return TreePine
      default:
        return Building2
    }
  }

  const CategoryIcon = getCategoryIcon()

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Category Icon */}
          <div className="flex justify-center mb-6 animate-fade-in-up">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <CategoryIcon className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in-up animate-delay-200">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 animate-fade-in-up animate-delay-400">
            {subtitle}
          </p>

          {/* Search Form */}
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg animate-fade-in-up animate-delay-600">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Хайх үгээ оруулна уу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-background/50 border-border focus:border-primary transition-colors"
                />
              </div>

              {/* District Select */}
              <div className="md:w-64">
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger className="h-12 bg-background/50 border-border focus:border-primary">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Дүүрэг сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <Button className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover:scale-105">
                <Search className="w-5 h-5 mr-2" />
                Хайх
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 animate-fade-in-up animate-delay-800">
            <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-primary">1,234</div>
              <div className="text-sm text-muted-foreground">Нийт зар</div>
            </div>
            <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">Шинэ зар</div>
            </div>
            <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-primary">₮2.5M</div>
              <div className="text-sm text-muted-foreground">Дундаж үнэ</div>
            </div>
            <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-primary">89%</div>
              <div className="text-sm text-muted-foreground">Идэвхтэй</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
