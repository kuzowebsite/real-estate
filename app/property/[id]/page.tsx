"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Phone,
  MessageCircle,
  ArrowLeft,
  User,
  Shield,
  Star,
  Share2,
  Bookmark,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useFavorites } from "@/contexts/favorites-context"

// Mock data - in real app this would come from API
const propertyData = {
  1: {
    id: 1,
    title: "Орчин үеийн 2 өрөө байр",
    location: "Сүхбаатар дүүрэг, 1-р хороо",
    price: "1,200,000₮/сар",
    beds: 2,
    baths: 1,
    area: "65м²",
    images: ["/modern-apartment.png", "/modern-family-house.png", "/modern-office.png"],
    features: ["Тавилгатай", "Лифт", "Аюулгүй байдал", "WiFi", "Зогсоол", "Цэцэрлэг"],
    available: "Одоо боломжтой",
    landlord: "Б.Батбаяр",
    phone: "99887766",
    posted: "2 өдрийн өмнө",
    type: "rent",
    description:
      "Энэхүү орчин үеийн 2 өрөө байр нь хотын төвд байрлах бөгөөд бүх төрлийн тохь тухтай байдлаар хангагдсан. Шинэ засвар хийгдсэн, тавилгаар бүрэн хангагдсан.",
    coordinates: { lat: 47.9184, lng: 106.9177 },
    floor: "5/12",
    yearBuilt: "2020",
    heating: "Төвлөрсөн дулаалга",
    parking: "1 машины зогсоол",
  },
  2: {
    id: 2,
    title: "Гэр бүлийн том байшин",
    location: "Баянзүрх дүүрэг, 5-р хороо",
    price: "2,500,000₮/сар",
    beds: 4,
    baths: 3,
    area: "150м²",
    images: ["/modern-family-house.png", "/modern-apartment.png", "/modern-office.png"],
    features: ["Гараж", "Цэцэрлэг", "Барбекю", "Аюулгүй байдал", "WiFi"],
    available: "1-р сараас",
    landlord: "Д.Дорж",
    phone: "95551234",
    posted: "1 өдрийн өмнө",
    type: "rent",
    description: "Гэр бүлд тохиромжтой том байшин. Хувийн цэцэрлэгтэй, гаражтай. Амар амгалан орчинд байрладаг.",
    coordinates: { lat: 47.9335, lng: 106.9134 },
    floor: "2 давхар",
    yearBuilt: "2018",
    heating: "Шатахуун",
    parking: "2 машины гараж",
  },
}

export default function PropertyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toggleSaved, toggleFavorite, isSaved, isFavorite } = useFavorites()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [property, setProperty] = useState<any>(null)

  useEffect(() => {
    const id = params.id as string
    const propertyInfo = propertyData[id as unknown as keyof typeof propertyData]
    setProperty(propertyInfo)
  }, [params.id])

  const handleSave = () => {
    if (!user) {
      router.push("/login")
      return
    }
    toggleSaved(property.id.toString())
  }

  const handleFavorite = () => {
    if (!user) {
      router.push("/login")
      return
    }
    toggleFavorite(property.id.toString())
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Зар олдсонгүй</h2>
          <Link href="/rent">
            <Button>Буцах</Button>
          </Link>
        </div>
      </div>
    )
  }

  const propertyId = property.id.toString()
  const saved = isSaved(propertyId)
  const favorite = isFavorite(propertyId)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={property.type === "rent" ? "/rent" : "/sell"}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Буцах
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Хуваалцах
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSave} className={saved ? "text-primary" : ""}>
                <Bookmark className={`w-4 h-4 mr-2 ${saved ? "fill-current" : ""}`} />
                {saved ? "Хадгалсан" : "Хадгалах"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative mb-4">
                <img
                  src={property.images[currentImageIndex] || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {property.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${property.title} ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                      currentImageIndex === index ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">{property.price}</div>
                </div>
                <Badge className="bg-green-500 text-white">{property.available}</Badge>
              </div>

              <div className="flex items-center space-x-6 mb-6">
                {property.beds > 0 && (
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span className="font-medium">{property.beds} өрөө</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Bath className="w-5 h-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">{property.baths} угаалгын өрөө</span>
                </div>
                <div className="flex items-center">
                  <Square className="w-5 h-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">{property.area}</span>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Тайлбар</h3>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Онцлог шинж чанарууд</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature: string) => (
                    <div key={feature} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Нэмэлт мэдээлэл</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Давхар:</span>
                    <span className="font-medium">{property.floor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Баригдсан он:</span>
                    <span className="font-medium">{property.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Дулаалга:</span>
                    <span className="font-medium">{property.heating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Зогсоол:</span>
                    <span className="font-medium">{property.parking}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Байршил</h3>
              <Card>
                <CardContent className="p-0">
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100"></div>
                    <div className="relative z-10 text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                      <p className="font-medium">{property.location}</p>
                      <p className="text-sm text-muted-foreground">
                        {property.coordinates.lat}, {property.coordinates.lng}
                      </p>
                    </div>
                    {/* Decorative elements to simulate map */}
                    <div className="absolute top-4 left-4 w-8 h-8 bg-blue-200 rounded-full opacity-60"></div>
                    <div className="absolute bottom-6 right-6 w-6 h-6 bg-green-200 rounded-full opacity-60"></div>
                    <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-yellow-200 rounded-full opacity-60"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{property.landlord}</h3>
                  <p className="text-sm text-muted-foreground">
                    {property.type === "rent" ? "Түрээслэгч" : "Зуучлагч"}
                  </p>
                  <div className="flex items-center justify-center mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-gray-300" />
                    <span className="ml-2 text-sm text-muted-foreground">4.0</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <Button size="lg" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    {property.phone} - Залгах
                  </Button>
                  <Button variant="outline" size="lg" className="w-full bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Мессеж илгээх
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center justify-between mb-2">
                    <span>Нийтэлсэн:</span>
                    <span>{property.posted}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Зарын дугаар:</span>
                    <span>#{property.id.toString().padStart(6, "0")}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Shield className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm font-medium">Баталгаажсан зар</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Энэ зар нь манай баг шалгаж баталгаажуулсан.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
