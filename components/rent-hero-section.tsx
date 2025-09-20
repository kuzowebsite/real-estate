"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin, Filter, TrendingUp } from "lucide-react"

export function RentHeroSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <img src="/abstract-geometric-pattern.png" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in-up text-balance">
            Түрээсийн үл хөдлөх хөрөнгө
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up animate-delay-100 text-pretty">
            Таны хэрэгцээнд тохирсон төгс түрээсийн байрыг олоорой
          </p>
        </div>

        {/* Search Section */}
        <Card className="max-w-4xl mx-auto mb-12 shadow-xl animate-fade-in-up animate-delay-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input placeholder="Байршил хайх (жишээ: Сүхбаатар дүүрэг)" className="pl-10 h-12 text-lg" />
              </div>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input placeholder="Үнийн хязгаар (₮)" className="pl-10 h-12 text-lg" />
              </div>
              <Button size="lg" className="h-12 px-8 hover:scale-105 transition-all duration-300">
                <Search className="w-5 h-5 mr-2" />
                Хайх
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-6 hover:scale-105 transition-all duration-300 bg-transparent"
              >
                <Filter className="w-5 h-5 mr-2" />
                Шүүлтүүр
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up animate-delay-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
              <div className="text-muted-foreground">Түрээсийн зар</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up animate-delay-400">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">Шинэ зар өдөрт</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up animate-delay-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-center text-3xl font-bold text-primary mb-2">
                <TrendingUp className="w-8 h-8 mr-2" />
                95%
              </div>
              <div className="text-muted-foreground">Амжилттай түрээс</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
