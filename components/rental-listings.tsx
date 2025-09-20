"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Bed, Bath, Square, Heart, Phone, MessageCircle, ArrowUpDown, Grid3X3, List } from "lucide-react"
import Link from "next/link"

export function RentalListings() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const rentalProperties = [
    {
      id: 1,
      title: "Орчин үеийн 2 өрөө байр",
      location: "Сүхбаатар дүүрэг, 1-р хороо",
      price: "1,200,000₮/сар",
      beds: 2,
      baths: 1,
      area: "65м²",
      image: "/modern-apartment.png",
      features: ["Тавилгатай", "Лифт", "Аюулгүй байдал"],
      available: "Одоо боломжтой",
      landlord: "Б.Батбаяр",
      phone: "99887766",
      posted: "2 өдрийн өмнө",
    },
    {
      id: 2,
      title: "Гэр бүлийн том байшин",
      location: "Баянзүрх дүүрэг, 5-р хороо",
      price: "2,500,000₮/сар",
      beds: 4,
      baths: 3,
      area: "150м²",
      image: "/modern-family-house.png",
      features: ["Гараж", "Цэцэрлэг", "Барбекю"],
      available: "1-р сараас",
      landlord: "Д.Дорж",
      phone: "95551234",
      posted: "1 өдрийн өмнө",
    },
    {
      id: 3,
      title: "Бизнес төвийн оффис",
      location: "Чингэлтэй дүүрэг, Төв хэсэг",
      price: "3,800,000₮/сар",
      beds: 0,
      baths: 2,
      area: "120м²",
      image: "/modern-office.png",
      features: ["Зогсоол", "Интернет", "Аюулгүй байдал"],
      available: "Одоо боломжтой",
      landlord: "ООО Бизнес Центр",
      phone: "70001234",
      posted: "3 өдрийн өмнө",
    },
    {
      id: 4,
      title: "Студи байр төв хэсэгт",
      location: "Сүхбаатар дүүрэг, 8-р хороо",
      price: "800,000₮/сар",
      beds: 1,
      baths: 1,
      area: "35м²",
      image: "/placeholder-d72ds.png",
      features: ["Тавилгатай", "WiFi", "Цахилгаан орсон"],
      available: "15-наас",
      landlord: "С.Сайхан",
      phone: "88776655",
      posted: "5 өдрийн өмнө",
    },
    {
      id: 5,
      title: "Шинэ барилгын 3 өрөө",
      location: "Хан-Уул дүүрэг, 4-р хороо",
      price: "1,800,000₮/сар",
      beds: 3,
      baths: 2,
      area: "95м²",
      image: "/modern-apartment.png",
      features: ["Шинэ барилга", "Лифт", "Зогсоол"],
      available: "Одоо боломжтой",
      landlord: "Ж.Жавхлан",
      phone: "99123456",
      posted: "1 өдрийн өмнө",
    },
    {
      id: 6,
      title: "Худалдааны талбай",
      location: "Баянгол дүүрэг, Нарантуул",
      price: "5,000,000₮/сар",
      beds: 0,
      baths: 1,
      area: "200м²",
      image: "/modern-office.png",
      features: ["Том талбай", "Зогсоол", "Ачаа буулгах"],
      available: "Ярилцана",
      landlord: "М.Мөнхбат",
      phone: "94445555",
      posted: "4 өдрийн өмнө",
    },
  ]

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Түрээсийн зарууд</h2>
            <p className="text-muted-foreground">{rentalProperties.length} зар олдлоо</p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Sort */}
            <Select defaultValue="newest">
              <SelectTrigger className="w-48">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Шинээс хуучин</SelectItem>
                <SelectItem value="price-low">Үнэ: Бага → Өндөр</SelectItem>
                <SelectItem value="price-high">Үнэ: Өндөр → Бага</SelectItem>
                <SelectItem value="area-large">Талбай: Том → Жижиг</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div
          className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
        >
          {rentalProperties.map((property, index) => (
            <Link key={property.id} href={`/property/${property.id}`}>
              <Card
                className={`group overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up cursor-pointer ${
                  viewMode === "list" ? "md:flex" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`relative overflow-hidden ${viewMode === "list" ? "md:w-80 md:flex-shrink-0" : ""}`}>
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className={`object-cover group-hover:scale-110 transition-transform duration-500 ${
                      viewMode === "list" ? "w-full h-48 md:h-full" : "w-full h-48"
                    }`}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-background/80 hover:bg-background transition-all duration-300"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Badge className="absolute top-3 left-3 bg-green-500 text-white">{property.available}</Badge>
                </div>

                <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                      {property.title}
                    </h3>
                    <span className="text-xs text-muted-foreground">{property.posted}</span>
                  </div>

                  <div className="flex items-center text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <div className="text-xl font-bold text-primary mb-3">{property.price}</div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    {property.beds > 0 && (
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span>{property.beds}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      <span>{property.baths}</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      <span>{property.area}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {property.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Landlord Info */}
                  <div className="text-sm text-muted-foreground mb-4">
                    <span className="font-medium">Түрээслэгч:</span> {property.landlord}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Залгах
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 hover:scale-105 transition-all duration-300"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Мессеж
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="px-8 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 bg-transparent"
          >
            Илүү ихийг үзэх
          </Button>
        </div>
      </div>
    </section>
  )
}
