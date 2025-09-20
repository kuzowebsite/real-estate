"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Building2, Upload, X, MapPin, Camera, Video, Youtube, Music, FileText, Map } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function CreateListingPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const [formData, setFormData] = useState({
    // Category selection
    mainCategory: "", // sell, rent, projects
    subCategory: "",

    // Location
    province: "",
    district: "",
    khoroo: "",
    detailedAddress: "",
    mapLocation: { lat: 0, lng: 0 },

    // Basic info
    title: "",
    roomCount: "",
    balconyCount: "",
    doorType: "",
    garageType: "",
    windowType: "",
    floorType: "",
    area: "",
    windowCount: "",
    totalFloors: "",
    buildingFloor: "",
    yearBuilt: "",
    paymentConditions: "",
    price: "",
    priceNegotiable: false,

    // Media
    images: [] as string[],
    floorPlan: "",
    youtubeUrl: "",
    tiktokUrl: "",
    videoFile: "",

    // Description
    description: "",

    // Contact
    contactName: user?.name || "",
    contactEmail: user?.email || "",
    contactPhone: user?.phone || "",
    contactPreference: "both", // chat, phone, both
  })

  const mainCategories = [
    { value: "sell", label: "Үл хөдлөх зарах" },
    { value: "rent", label: "Үл хөдлөх түрээслэх" },
    { value: "projects", label: "Төлөвлөт" },
  ]

  const sellSubCategories = [
    "Орон сууц зарна",
    "Монгол гэр зарна",
    "Хашаа байшин зарна",
    "Газар зарна",
    "Оффис зарна",
    "Гараж / контейнер / з-сууц зарна",
    "АОС / хаус / зуслан / амралтын газар зарна",
    "Худалдаа / үйлчилгээний талбай зарна",
  ]

  const rentSubCategories = [
    "Орон сууц түрээслүүлнэ",
    "Хашаа байшин / гэр түрээслүүлнэ",
    "Оффис түрээслүүлнэ",
    "Худалдаа үйлчилгээний талбай түрээслүүлнэ",
    "Үйлдвэр / агуулах / обьект түрээслүүлнэ",
    "Нийтийн байр / дотуур байр түрээслүүлнэ",
    "Гараж, контейнер, з-сууц түрээслүүлнэ",
    "АОС, хаус, зуслан, амралтын газар түрээслүүлнэ",
    "00-н өрөө, В1, подвал түрээслүүлнэ",
    "Хурлын өрөө, заал түрээслүүлнэ",
    "Газар түрээслүүлнэ",
    "Хоногоор байр, байшин түрээслүүлнэ",
    "Hostel/Хостел",
  ]

  const projectsSubCategories = ["1 өрөө", "2 өрөө", "3 өрөө", "4 өрөө", "5+ өрөө"]

  const provinces = [
    "Улаанбаатар",
    "Баян-Өлгий",
    "Архангай",
    "Баянхонгор",
    "Булган",
    "Говь-Алтай",
    "Говьсүмбэр",
    "Дархан-Уул",
    "Дорноговь",
    "Дорнод",
    "Дундговь",
    "Завхан",
    "Орхон",
    "Өвөрхангай",
    "Өмнөговь",
    "Сүхбаатар",
    "Сэлэнгэ",
    "Төв",
    "Увс",
    "Ховд",
    "Хөвсгөл",
    "Хэнтий",
  ]

  const ulaanbaatarDistricts = [
    "Багануур",
    "Багахангай",
    "Баянгол",
    "Баянзүрх",
    "Налайх",
    "Сонгинохайрхан",
    "Сүхбаатар",
    "Хан-Уул",
    "Чингэлтэй",
  ]

  const khoroosByDistrict: { [key: string]: string[] } = {
    Багануур: ["1-р хороо", "2-р хороо", "3-р хороо", "4-р хороо", "5-р хороо"],
    Багахангай: ["1-р хороо", "2-р хороо"],
    Баянгол: [
      "1-р хороо",
      "2-р хороо",
      "3-р хороо",
      "4-р хороо",
      "5-р хороо",
      "6-р хороо",
      "7-р хороо",
      "8-р хороо",
      "9-р хороо",
      "10-р хороо",
      "11-р хороо",
      "12-р хороо",
      "13-р хороо",
      "14-р хороо",
      "15-р хороо",
      "16-р хороо",
      "17-р хороо",
      "18-р хороо",
      "19-р хороо",
      "20-р хороо",
    ],
    // Add more districts and their khoroos as needed
  }

  const doorTypes = ["Мод", "Төмөр", "Бүргэд", "Вакум"]
  const garageTypes = ["Байгаа", "Байхгүй"]
  const windowTypes = ["Модон", "Хуванцар", "Алюмини"]
  const floorTypes = ["Модон", "Хивс", "Керамик", "Ламинат", "Линолеум"]

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getSubCategories = () => {
    switch (formData.mainCategory) {
      case "sell":
        return sellSubCategories
      case "rent":
        return rentSubCategories
      case "projects":
        return projectsSubCategories
      default:
        return []
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map(
        (file, index) => `/placeholder.svg?height=300&width=400&query=property-${Date.now()}-${index}`,
      )
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 10),
      }))
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Listing data:", formData)
      router.push("/my-listings")
    } catch (error) {
      console.error("Error creating listing:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-foreground mb-2">Зар оруулах</h1>
            <p className="text-muted-foreground">Үл хөдлөх хөрөнгийн зар нийтлэх</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Category Selection */}
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  1. Категори сонгох
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Үндсэн категори *</Label>
                  <Select
                    value={formData.mainCategory}
                    onValueChange={(value) => {
                      handleInputChange("mainCategory", value)
                      handleInputChange("subCategory", "")
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Сонгоно уу" />
                    </SelectTrigger>
                    <SelectContent>
                      {mainCategories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.mainCategory && (
                  <div className="space-y-2">
                    <Label>Дэд категори *</Label>
                    <Select
                      value={formData.subCategory}
                      onValueChange={(value) => handleInputChange("subCategory", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Сонгоно уу" />
                      </SelectTrigger>
                      <SelectContent>
                        {getSubCategories().map((sub) => (
                          <SelectItem key={sub} value={sub}>
                            {sub}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {formData.subCategory && (
                  <Button type="button" onClick={() => setCurrentStep(2)} className="w-full">
                    Үргэлжлүүлэх
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Step 2: Location Selection */}
            {currentStep >= 2 && (
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    2. Байршил сонгох
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Аймаг/Хот *</Label>
                      <Select
                        value={formData.province}
                        onValueChange={(value) => {
                          handleInputChange("province", value)
                          handleInputChange("district", "")
                          handleInputChange("khoroo", "")
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Сонгоно уу" />
                        </SelectTrigger>
                        <SelectContent>
                          {provinces.map((province) => (
                            <SelectItem key={province} value={province}>
                              {province}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.province === "Улаанбаатар" && (
                      <div className="space-y-2">
                        <Label>Дүүрэг *</Label>
                        <Select
                          value={formData.district}
                          onValueChange={(value) => {
                            handleInputChange("district", value)
                            handleInputChange("khoroo", "")
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Сонгоно уу" />
                          </SelectTrigger>
                          <SelectContent>
                            {ulaanbaatarDistricts.map((district) => (
                              <SelectItem key={district} value={district}>
                                {district}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {formData.district && khoroosByDistrict[formData.district] && (
                      <div className="space-y-2">
                        <Label>Хороо</Label>
                        <Select value={formData.khoroo} onValueChange={(value) => handleInputChange("khoroo", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Сонгоно уу" />
                          </SelectTrigger>
                          <SelectContent>
                            {khoroosByDistrict[formData.district].map((khoroo) => (
                              <SelectItem key={khoroo} value={khoroo}>
                                {khoroo}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  {/* Map Location Selector */}
                  <div className="space-y-2">
                    <Label>Газрын зураг дээрх байршил</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center bg-muted/10">
                      <Map className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">Газрын зураг дээр байршил сонгох</p>
                      <Button type="button" variant="outline">
                        Зураг нээх
                      </Button>
                    </div>
                  </div>

                  {formData.province && (
                    <Button type="button" onClick={() => setCurrentStep(3)} className="w-full">
                      Үргэлжлүүлэх
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 3: Property Details */}
            {currentStep >= 3 && (
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <CardTitle>3. Зарын дэлгэрэнгүй</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Зарын гарчиг *</Label>
                    <Input
                      id="title"
                      placeholder="Жишээ: Орчин үеийн 3 өрөөтэй байр"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                    />
                  </div>

                  {/* Property specifications */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Өрөө тоо</Label>
                      <Select
                        value={formData.roomCount}
                        onValueChange={(value) => handleInputChange("roomCount", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Сонгох" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 өрөө</SelectItem>
                          <SelectItem value="2">2 өрөө</SelectItem>
                          <SelectItem value="3">3 өрөө</SelectItem>
                          <SelectItem value="4">4 өрөө</SelectItem>
                          <SelectItem value="5+">5+ өрөө</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Тагт</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={formData.balconyCount}
                        onChange={(e) => handleInputChange("balconyCount", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Хаалга</Label>
                      <Select value={formData.doorType} onValueChange={(value) => handleInputChange("doorType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Сонгох" />
                        </SelectTrigger>
                        <SelectContent>
                          {doorTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Гараж</Label>
                      <Select
                        value={formData.garageType}
                        onValueChange={(value) => handleInputChange("garageType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Сонгох" />
                        </SelectTrigger>
                        <SelectContent>
                          {garageTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Цонх</Label>
                      <Select
                        value={formData.windowType}
                        onValueChange={(value) => handleInputChange("windowType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Сонгох" />
                        </SelectTrigger>
                        <SelectContent>
                          {windowTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Шал</Label>
                      <Select
                        value={formData.floorType}
                        onValueChange={(value) => handleInputChange("floorType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Сонгох" />
                        </SelectTrigger>
                        <SelectContent>
                          {floorTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Талбай (м²) *</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={formData.area}
                        onChange={(e) => handleInputChange("area", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Цонхны тоо</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={formData.windowCount}
                        onChange={(e) => handleInputChange("windowCount", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Хэдэн давхар</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={formData.totalFloors}
                        onChange={(e) => handleInputChange("totalFloors", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Барилгын давхар</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={formData.buildingFloor}
                        onChange={(e) => handleInputChange("buildingFloor", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Ашиглалтанд орсон он</Label>
                      <Input
                        type="number"
                        placeholder="2020"
                        value={formData.yearBuilt}
                        onChange={(e) => handleInputChange("yearBuilt", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Төлбөрийн нөхцөл</Label>
                      <Select
                        value={formData.paymentConditions}
                        onValueChange={(value) => handleInputChange("paymentConditions", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Сонгох" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Бэлэн мөнгө</SelectItem>
                          <SelectItem value="loan">Зээлээр</SelectItem>
                          <SelectItem value="installment">Хуваан төлбөр</SelectItem>
                          <SelectItem value="negotiable">Тохиролцоно</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Үнэ (₮) *</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-8">
                      <Checkbox
                        id="priceNegotiable"
                        checked={formData.priceNegotiable}
                        onCheckedChange={(checked) => handleInputChange("priceNegotiable", checked as boolean)}
                      />
                      <Label htmlFor="priceNegotiable">Үнэ тохирно</Label>
                    </div>
                  </div>

                  <Button type="button" onClick={() => setCurrentStep(4)} className="w-full">
                    Үргэлжлүүлэх
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Media Upload */}
            {currentStep >= 4 && (
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    4. Зураг болон медиа
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Images */}
                  <div className="space-y-4">
                    <Label>Зураг оруулах (файлаар оруулах)</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Зураг оруулахын тулд энд дарна уу</p>
                      </label>
                    </div>

                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Property ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              size="icon"
                              variant="destructive"
                              className="absolute top-1 right-1 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Floor Plan */}
                  <div className="space-y-2">
                    <Label>План зураг</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">План зураг оруулах</p>
                    </div>
                  </div>

                  {/* YouTube URL */}
                  <div className="space-y-2">
                    <Label htmlFor="youtubeUrl">YouTube URL:</Label>
                    <div className="flex">
                      <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                        <Youtube className="w-4 h-4 text-red-500" />
                      </div>
                      <Input
                        id="youtubeUrl"
                        placeholder="https://youtube.com/watch?v=..."
                        value={formData.youtubeUrl}
                        onChange={(e) => handleInputChange("youtubeUrl", e.target.value)}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>

                  {/* TikTok Link */}
                  <div className="space-y-2">
                    <Label htmlFor="tiktokUrl">TikTok link:</Label>
                    <div className="flex">
                      <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                        <Music className="w-4 h-4" />
                      </div>
                      <Input
                        id="tiktokUrl"
                        placeholder="https://tiktok.com/@username/video/..."
                        value={formData.tiktokUrl}
                        onChange={(e) => handleInputChange("tiktokUrl", e.target.value)}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>

                  {/* Video Upload */}
                  <div className="space-y-2">
                    <Label>Видео:</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Санал болгож буй бараа үйлчилгээнийхээ бичлэгийг оруулах боломжтой. Файлын хэмжээ 500MB хүртэл
                      байна. Боломжит формат: .mpg, .mp4, .mov
                    </p>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Видео файл оруулах</p>
                    </div>
                  </div>

                  <Button type="button" onClick={() => setCurrentStep(5)} className="w-full">
                    Үргэлжлүүлэх
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 5: Description and Contact */}
            {currentStep >= 5 && (
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <CardTitle>5. Тайлбар болон холбоо барих</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Тайлбар:</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Тайлбар хэсэгт зарлаж буй бараа, үйлчилгээнийхээ тухай товч тайлбар болон нэмэлт мэдээллээ бичнэ.
                      Тайлбарт утасны дугаар оруулахгүй. Гарчиг болон тайлбар нь хоорондоо уялдаатай байна. Том үсэг
                      болон товчлол ашиглахгүй байхыг хүсье!
                    </p>
                    <Textarea
                      id="description"
                      placeholder="Үл хөдлөх хөрөнгийн дэлгэрэнгүй тайлбар..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={6}
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Холбоо барих мэдээлэл</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Нэр *</Label>
                        <Input
                          id="contactName"
                          value={formData.contactName}
                          onChange={(e) => handleInputChange("contactName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Е-Мэйл хаяг</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          value={formData.contactEmail}
                          onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPhone">Утас *</Label>
                        <Input
                          id="contactPhone"
                          value={formData.contactPhone}
                          onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Contact Preference */}
                    <div className="space-y-2">
                      <Label>Холбоо барих хэлбэр</Label>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="chatOnly"
                            checked={formData.contactPreference === "chat"}
                            onCheckedChange={(checked) => checked && handleInputChange("contactPreference", "chat")}
                          />
                          <Label htmlFor="chatOnly">Утас чатаар</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="phoneOnly"
                            checked={formData.contactPreference === "phone"}
                            onCheckedChange={(checked) => checked && handleInputChange("contactPreference", "phone")}
                          />
                          <Label htmlFor="phoneOnly">Зөвхөн утасаар</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="both"
                            checked={formData.contactPreference === "both"}
                            onCheckedChange={(checked) => checked && handleInputChange("contactPreference", "both")}
                          />
                          <Label htmlFor="both">Хоёуланг нь</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submit Button */}
            {currentStep >= 5 && (
              <div className="flex justify-end space-x-4 animate-fade-in-up">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Цуцлах
                </Button>
                <Button type="submit" disabled={isSubmitting} className="min-w-32">
                  {isSubmitting ? "Хадгалж байна..." : "Зар нийтлэх"}
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
