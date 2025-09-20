"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Building2, Home, Building, Store, X } from "lucide-react"

export function RentFilters() {
  const [priceRange, setPriceRange] = useState([200000, 1500000])
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const propertyTypes = [
    { id: "apartment", name: "Байр", icon: Building2 },
    { id: "house", name: "Байшин", icon: Home },
    { id: "office", name: "Оффис", icon: Building },
    { id: "commercial", name: "Худалдаа", icon: Store },
  ]

  const roomOptions = [
    { value: "1", label: "1 өрөө" },
    { value: "2", label: "2 өрөө" },
    { value: "3", label: "3 өрөө" },
    { value: "4", label: "4 өрөө" },
    { value: "5+", label: "5+ өрөө" },
    { value: "adjacent", label: "Хажуу өрөө" },
  ]

  const garageOptions = [
    { value: "available", label: "Байгаа" },
    { value: "not-available", label: "Байхгүй" },
  ]

  const quickFilters = ["Шинэ барилга", "Тавилгатай", "Лифт", "Аюулгүй байдал", "Зөөлөн амьтан зөвшөөрөх"]

  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter))
  }

  return (
    <section className="py-8 bg-card/20 border-b">
      <div className="container mx-auto px-4">
        <Card className="animate-fade-in-up">
          <CardContent className="p-6">
            {/* Property Types */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Үл хөдлөх хөрөнгийн төрөл</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {propertyTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant="outline"
                    className="flex items-center justify-center space-x-2 h-12 hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent"
                  >
                    <type.icon className="w-5 h-5" />
                    <span>{type.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Дүүрэг</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Дүүрэг сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sukhbaatar">Сүхбаатар дүүрэг</SelectItem>
                    <SelectItem value="bayanzurkh">Баянзүрх дүүрэг</SelectItem>
                    <SelectItem value="chingeltei">Чингэлтэй дүүрэг</SelectItem>
                    <SelectItem value="khan-uul">Хан-Уул дүүрэг</SelectItem>
                    <SelectItem value="songino-khairkhan">Сонгино-Хайрхан дүүрэг</SelectItem>
                    <SelectItem value="bayangol">Баянгол дүүрэг</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Өрөөний тоо</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Өрөө сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomOptions.map((room) => (
                      <SelectItem key={room.value} value={room.value}>
                        {room.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Гараж</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Гараж" />
                  </SelectTrigger>
                  <SelectContent>
                    {garageOptions.map((garage) => (
                      <SelectItem key={garage.value} value={garage.value}>
                        {garage.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Угаалгын өрөө</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Угаалгын өрөө" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Талбай (м²)</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Талбай" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50">0-50 м²</SelectItem>
                    <SelectItem value="50-100">50-100 м²</SelectItem>
                    <SelectItem value="100-150">100-150 м²</SelectItem>
                    <SelectItem value="150+">150+ м²</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-4 block">
                Түрээсийн үнэ: {priceRange[0].toLocaleString()}₮ - {priceRange[1].toLocaleString()}₮
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={2000000}
                min={100000}
                step={50000}
                className="w-full"
              />
            </div>

            {/* Quick Filters */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Нэмэлт шүүлтүүр</h3>
              <div className="flex flex-wrap gap-2">
                {quickFilters.map((filter) => (
                  <Button
                    key={filter}
                    variant="outline"
                    size="sm"
                    onClick={() => addFilter(filter)}
                    className="hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>

            {/* Selected Filters */}
            {selectedFilters.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-3">Сонгосон шүүлтүүр</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedFilters.map((filter) => (
                    <Badge key={filter} variant="secondary" className="flex items-center space-x-1 px-3 py-1">
                      <span>{filter}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeFilter(filter)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Apply Filters Button */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setSelectedFilters([])}
                className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-300"
              >
                Шүүлтүүр арилгах
              </Button>
              <Button className="px-8 hover:scale-105 transition-all duration-300">Шүүлтүүр хэрэглэх</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
