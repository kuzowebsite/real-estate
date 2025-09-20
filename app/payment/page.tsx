"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Calendar, Download, Eye, CheckCircle, Clock, XCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

// Mock payment data
const paymentHistory = [
  {
    id: "pay_001",
    date: "2024-01-15",
    amount: 50000,
    description: "Зарын онцлох байршил - 7 хоног",
    status: "completed",
    invoice: "INV-2024-001",
  },
  {
    id: "pay_002",
    date: "2024-01-10",
    amount: 25000,
    description: "Зарын сэргээх - 3 хоног",
    status: "completed",
    invoice: "INV-2024-002",
  },
  {
    id: "pay_003",
    date: "2024-01-05",
    amount: 75000,
    description: "Premium зар - 14 хоног",
    status: "pending",
    invoice: "INV-2024-003",
  },
]

const pricingPlans = [
  {
    name: "Үндсэн зар",
    price: 0,
    duration: "30 хоног",
    features: ["Үндсэн зар нийтлэх", "5 зураг хүртэл", "Энгийн байршил", "Үндсэн статистик"],
    popular: false,
  },
  {
    name: "Онцлох зар",
    price: 50000,
    duration: "7 хоног",
    features: ["Онцлох байршилд гарах", "10 зураг хүртэл", "Дэлгэрэнгүй статистик", "Хурдан хариу"],
    popular: true,
  },
  {
    name: "Premium зар",
    price: 75000,
    duration: "14 хоног",
    features: [
      "Хамгийн дээд байршил",
      "Хязгааргүй зураг",
      "Бүрэн статистик",
      "Тусгай дэмжлэг",
      "Социал сүлжээнд сурталчлах",
    ],
    popular: false,
  },
]

export default function PaymentPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  if (!user) {
    router.push("/login")
    return null
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Төлөгдсөн
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-500/20 text-yellow-600">
            <Clock className="w-3 h-3 mr-1" />
            Хүлээгдэж буй
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Амжилтгүй
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-foreground mb-2">Төлбөр</h1>
            <p className="text-muted-foreground">Зарын төлбөр болон түүхийг харах</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pricing Plans */}
            <div className="lg:col-span-2">
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <CardTitle>Зарын төрлүүд</CardTitle>
                  <CardDescription>Таны зарыг илүү олон хүнд хүргэх</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {pricingPlans.map((plan, index) => (
                      <div
                        key={plan.name}
                        className={`relative p-6 rounded-lg border transition-all duration-300 hover:shadow-lg cursor-pointer animate-fade-in-up ${
                          plan.popular
                            ? "border-primary bg-primary/5 scale-105"
                            : "border-border hover:border-primary/50"
                        } ${selectedPlan === plan.name ? "ring-2 ring-primary" : ""}`}
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={() => setSelectedPlan(plan.name)}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-primary text-primary-foreground">Алдартай</Badge>
                          </div>
                        )}

                        <div className="text-center mb-4">
                          <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                          <div className="text-3xl font-bold text-primary mb-1">
                            {plan.price === 0 ? "Үнэгүй" : `${plan.price.toLocaleString()}₮`}
                          </div>
                          <p className="text-sm text-muted-foreground">{plan.duration}</p>
                        </div>

                        <ul className="space-y-2 mb-6">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <Button
                          className="w-full"
                          variant={plan.popular ? "default" : "outline"}
                          disabled={plan.price === 0}
                        >
                          {plan.price === 0 ? "Идэвхтэй" : "Сонгох"}
                        </Button>
                      </div>
                    ))}
                  </div>

                  {selectedPlan && selectedPlan !== "Үндсэн зар" && (
                    <div className="mt-6 p-4 bg-accent/10 rounded-lg animate-fade-in-up">
                      <h4 className="font-semibold mb-2">Төлбөр төлөх</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Та {selectedPlan}-г сонгосон байна. Төлбөр төлөхийн тулд доорх товчийг дарна уу.
                      </p>
                      <Button className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Төлбөр төлөх
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Account Summary */}
            <div className="space-y-6">
              <Card className="animate-fade-in-up animate-delay-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Акаунтын хураангуй
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Идэвхтэй зар:</span>
                    <span className="font-semibold">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Онцлох зар:</span>
                    <span className="font-semibold">1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Нийт зарлага:</span>
                    <span className="font-semibold text-primary">150,000₮</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Дараагийн төлбөр:</span>
                    <span className="text-sm">2024-01-25</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in-up animate-delay-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Төлбөрийн түүх
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentHistory.slice(0, 3).map((payment, index) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{payment.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(payment.date).toLocaleDateString("mn-MN")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{payment.amount.toLocaleString()}₮</p>
                          {getStatusBadge(payment.status)}
                        </div>
                      </div>
                    ))}

                    <Button variant="outline" className="w-full flex items-center gap-2 bg-transparent">
                      <Eye className="w-4 h-4" />
                      Бүх түүх үзэх
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Payment History Table */}
          <Card className="mt-8 animate-fade-in-up animate-delay-300">
            <CardHeader>
              <CardTitle>Дэлгэрэнгүй төлбөрийн түүх</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Огноо</th>
                      <th className="text-left py-3 px-4">Тайлбар</th>
                      <th className="text-left py-3 px-4">Дүн</th>
                      <th className="text-left py-3 px-4">Төлөв</th>
                      <th className="text-left py-3 px-4">Нэхэмжлэх</th>
                      <th className="text-left py-3 px-4">Үйлдэл</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id} className="border-b hover:bg-accent/5">
                        <td className="py-3 px-4">{new Date(payment.date).toLocaleDateString("mn-MN")}</td>
                        <td className="py-3 px-4">{payment.description}</td>
                        <td className="py-3 px-4 font-semibold">{payment.amount.toLocaleString()}₮</td>
                        <td className="py-3 px-4">{getStatusBadge(payment.status)}</td>
                        <td className="py-3 px-4 text-muted-foreground">{payment.invoice}</td>
                        <td className="py-3 px-4">
                          <Button size="sm" variant="outline" className="flex items-center gap-1 bg-transparent">
                            <Download className="w-3 h-3" />
                            Татах
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
