"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, MapPin, Filter, TrendingUp, MessageCircle } from "lucide-react"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")

  const stats = [
    { label: "Нийт зар", value: "15,000+", icon: TrendingUp },
    { label: "Амжилттай арилжаа", value: "8,500+", icon: TrendingUp },
    { label: "Идэвхтэй хэрэглэгч", value: "25,000+", icon: TrendingUp },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card to-background overflow-hidden pt-16 sm:pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] bg-repeat opacity-20"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 lg:py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 animate-fade-in-up leading-tight">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Үл хөдлөх хөрөнгө
            </span>
            <br />
            <span className="text-foreground">олох хялбар арга</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 animate-fade-in-up animate-delay-100 px-2">
            Монгол дахь хамгийн том үл хөдлөх хөрөнгийн платформоос таны хүссэн орон сууцыг олоорой
          </p>

          {/* Search Bar */}
          <Card className="p-3 sm:p-4 lg:p-6 mb-8 sm:mb-12 animate-fade-in-up animate-delay-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
                <Input
                  placeholder="Хаяг, дүүрэг эсвэл байршил..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 sm:pl-10 h-10 sm:h-12 text-sm sm:text-base lg:text-lg border-0 bg-input focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Button
                  size="lg"
                  className="h-10 sm:h-12 px-6 sm:px-8 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 text-sm sm:text-base flex-1 sm:flex-none"
                >
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Хайх
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-10 sm:h-12 px-4 sm:px-6 hover:bg-accent/10 transition-all duration-300 bg-transparent text-sm sm:text-base flex-1 sm:flex-none"
                >
                  <Filter className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Шүүлтүүр
                </Button>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                className="p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
                <div className="text-xl sm:text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-muted-foreground text-sm sm:text-base">{stat.label}</div>
              </Card>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up animate-delay-400 px-4 sm:px-0">
            <Button
              size="lg"
              className="px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg bg-secondary hover:bg-secondary/90 transition-all duration-300 hover:scale-105"
            >
              Зар нэмэх
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg hover:bg-accent/10 transition-all duration-300 hover:scale-105 bg-transparent"
            >
              Зар үзэх
            </Button>
          </div>
        </div>
      </div>

      <a href="/chat">
        <Button
          size="lg"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-secondary hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce z-40"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      </a>
    </section>
  )
}
