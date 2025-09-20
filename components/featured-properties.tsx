"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react"

export function FeaturedProperties() {
  const properties = [
    {
      id: 1,
      title: "Орчин үеийн 3 өрөө байр",
      location: "Сүхбаатар дүүрэг",
      price: "450,000,000₮",
      type: "Зарах",
      beds: 3,
      baths: 2,
      area: "85м²",
      image: "/modern-apartment.png",
      featured: true,
    },
    {
      id: 2,
      title: "Гэр бүлийн байшин",
      location: "Баянзүрх дүүрэг",
      price: "1,200,000₮/сар",
      type: "Түрээслэх",
      beds: 4,
      baths: 3,
      area: "120м²",
      image: "/modern-family-house.png",
      featured: false,
    },
    {
      id: 3,
      title: "Бизнес төвийн оффис",
      location: "Чингэлтэй дүүрэг",
      price: "2,800,000₮/сар",
      type: "Түрээслэх",
      beds: 0,
      baths: 1,
      area: "65м²",
      image: "/modern-office.png",
      featured: true,
    },
    {
      id: 4,
      title: "Шинэ барилгын студи",
      location: "Хан-Уул дүүрэг",
      price: "280,000,000₮",
      type: "Зарах",
      beds: 1,
      baths: 1,
      area: "45м²",
      image: "/placeholder-d72ds.png",
      featured: false,
    },
  ]

  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">Онцлох зарууд</h2>
          <p className="text-lg text-muted-foreground animate-fade-in-up animate-delay-100">
            Хамгийн сайн үл хөдлөх хөрөнгийн саналууд
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <Card
              key={property.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {property.featured && (
                  <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">Онцлох</Badge>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-background/80 hover:bg-background transition-all duration-300"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Badge
                  variant={property.type === "Зарах" ? "default" : "secondary"}
                  className="absolute bottom-3 left-3"
                >
                  {property.type}
                </Badge>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                  {property.title}
                </h3>

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

                <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  Дэлгэрэнгүй үзэх
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="px-8 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 bg-transparent"
          >
            Бүх зарыг үзэх
          </Button>
        </div>
      </div>
    </section>
  )
}
