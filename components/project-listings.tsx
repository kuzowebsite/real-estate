"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Calendar, Building, Users, Phone, MessageCircle, Heart } from "lucide-react"

export function ProjectListings() {
  const projects = [
    {
      id: 1,
      title: "Sky Tower Residence",
      location: "Сүхбаатар дүүрэг, 1-р хороо",
      developer: "Sky Development LLC",
      completion: "2025 оны 6-р сар",
      progress: 75,
      totalUnits: 240,
      availableUnits: 45,
      priceRange: "350-800 сая₮",
      image: "/modern-apartment.png",
      features: ["Лифт", "Зогсоол", "Аюулгүй байдал", "Цэцэрлэг"],
      status: "Урьдчилан захиалга",
      phone: "99887766",
      posted: "1 өдрийн өмнө",
    },
    {
      id: 2,
      title: "Green Valley Complex",
      location: "Баянзүрх дүүрэг, 5-р хороо",
      developer: "Green Valley Construction",
      completion: "2024 оны 12-р сар",
      progress: 90,
      totalUnits: 180,
      availableUnits: 12,
      priceRange: "450-950 сая₮",
      image: "/modern-family-house.png",
      features: ["Цэцэрлэг", "Спорт заал", "Худалдааны төв"],
      status: "Урьдчилан захиалга",
      phone: "95551234",
      posted: "2 өдрийн өмнө",
    },
    {
      id: 3,
      title: "Business Hub Center",
      location: "Чингэлтэй дүүрэг, Төв хэсэг",
      developer: "Business Hub LLC",
      completion: "2025 оны 3-р сар",
      progress: 60,
      totalUnits: 120,
      availableUnits: 78,
      priceRange: "800-2000 сая₮",
      image: "/modern-office.png",
      features: ["Оффис", "Худалдаа", "Зогсоол", "Аюулгүй байдал"],
      status: "Урьдчилан захиалга",
      phone: "70001234",
      posted: "3 өдрийн өмнө",
    },
    {
      id: 4,
      title: "Luxury Living Towers",
      location: "Хан-Уул дүүрэг, 4-р хороо",
      developer: "Luxury Development",
      completion: "2026 оны 8-р сар",
      progress: 25,
      totalUnits: 300,
      availableUnits: 280,
      priceRange: "600-1200 сая₮",
      image: "/modern-apartment.png",
      features: ["Усан сан", "Спорт заал", "Лифт", "Цэцэрлэг"],
      status: "Урьдчилан захиалга",
      phone: "99123456",
      posted: "1 өдрийн өмнө",
    },
  ]

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Төлөвлөт төслүүд</h2>
          <p className="text-muted-foreground">{projects.length} төсөл олдлоо</p>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-background/80 hover:bg-background transition-all duration-300"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Badge className="absolute top-3 left-3 bg-orange-500 text-white">{project.status}</Badge>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-background/90 backdrop-blur-sm rounded-lg p-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Барилгын явц</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-xl group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-xs text-muted-foreground">{project.posted}</span>
                </div>

                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{project.location}</span>
                </div>

                <div className="text-lg font-bold text-primary mb-4">{project.priceRange}</div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{project.developer}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{project.completion}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{project.totalUnits} нийт нэгж</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <span className="font-medium">{project.availableUnits} боломжтой</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.features.slice(0, 4).map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Залгах
                  </Button>
                  <Button size="sm" className="flex-1 hover:scale-105 transition-all duration-300">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Захиалах
                  </Button>
                </div>
              </CardContent>
            </Card>
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
