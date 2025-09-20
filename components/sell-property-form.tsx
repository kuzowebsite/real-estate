"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, MapPin, Home, DollarSign, Camera } from "lucide-react"

export function SellPropertyForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    propertyType: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    contact: "",
  })

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Үл хөдлөх хөрөнгийн мэдээлэл</h2>
            <p className="text-lg text-muted-foreground">Таны үл хөдлөх хөрөнгийн дэлгэрэнгүй мэдээллийг оруулна уу</p>
          </div>

          <Card className="shadow-xl border-0 bg-card animate-fade-in-up animate-delay-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Home className="w-6 h-6 text-primary" />
                <span>Зарын мэдээлэл</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Property Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Зарын гарчиг *</Label>
                <Input
                  id="title"
                  placeholder="Жишээ: 3 өрөө орон сууц, төв хэсэгт"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="h-12"
                />
              </div>

              {/* Property Type and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Үл хөдлөх хөрөнгийн төрөл *</Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Төрлөө сонгоно уу" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Орон сууц</SelectItem>
                      <SelectItem value="house">Байшин</SelectItem>
                      <SelectItem value="office">Оффис</SelectItem>
                      <SelectItem value="commercial">Худалдааны талбай</SelectItem>
                      <SelectItem value="land">Газар</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Байршил *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Дүүрэг, хороо"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="h-12 pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Унтлагын өрөө</Label>
                  <Select
                    value={formData.bedrooms}
                    onValueChange={(value) => setFormData({ ...formData, bedrooms: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Тоо" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Угаалгын өрөө</Label>
                  <Select
                    value={formData.bathrooms}
                    onValueChange={(value) => setFormData({ ...formData, bathrooms: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Тоо" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4+">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Талбай (м²)</Label>
                  <Input
                    id="area"
                    placeholder="Жишээ: 85"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="h-12"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Үнэ (₮) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="price"
                    placeholder="Жишээ: 250,000,000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="h-12 pl-10"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Дэлгэрэнгүй тайлбар</Label>
                <Textarea
                  id="description"
                  placeholder="Үл хөдлөх хөрөнгийн онцлог, давуу тал, орчны мэдээлэл..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-32"
                />
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>Зургууд</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">Зургуудаа энд чирж оруулна уу</p>
                  <Button variant="outline" className="mt-2 bg-transparent">
                    <Upload className="w-4 h-4 mr-2" />
                    Зураг сонгох
                  </Button>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <Label htmlFor="contact">Холбоо барих утас *</Label>
                <Input
                  id="contact"
                  placeholder="Жишээ: 99112233"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="h-12"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Зар нийтлэх
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
