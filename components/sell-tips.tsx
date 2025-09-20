"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Camera, MapPin, DollarSign, Users, Clock } from "lucide-react"

export function SellTips() {
  const tips = [
    {
      icon: Camera,
      title: "Чанартай зураг",
      description: "Гэрэл сайтай, тод зургууд авч, бүх өрөөг харуулна уу",
    },
    {
      icon: DollarSign,
      title: "Зах зээлийн үнэ",
      description: "Ойролцоох үл хөдлөх хөрөнгийн үнэтэй харьцуулж үнэ тогтооно уу",
    },
    {
      icon: MapPin,
      title: "Байршлын давуу тал",
      description: "Сургууль, эмнэлэг, дэлгүүр зэрэг ойролцоох байгууламжийг дурдана уу",
    },
    {
      icon: Users,
      title: "Хурдан хариулт",
      description: "Сонирхогчдын асуултанд хурдан хариулж, уулзалт товлоно уу",
    },
    {
      icon: Clock,
      title: "Цаг хугацаа",
      description: "Зарыг тогтмол шинэчилж, идэвхтэй байлгана уу",
    },
    {
      icon: CheckCircle,
      title: "Бичиг баримт",
      description: "Бүх шаардлагатай бичиг баримтыг бэлэн байлгана уу",
    },
  ]

  return (
    <section className="py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Амжилттай зарах зөвлөмжүүд</h2>
            <p className="text-lg text-muted-foreground">
              Үл хөдлөх хөрөнгөө хурдан, өндөр үнээр зарахын тулд эдгээр зөвлөмжийг дагана уу
            </p>
          </div>

          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up bg-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                    <tip.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{tip.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
