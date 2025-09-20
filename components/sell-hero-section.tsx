"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Home, TrendingUp } from "lucide-react"

export function SellHeroSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-background via-accent/5 to-primary/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in-up">
            Үл хөдлөх хөрөнгө
            <span className="text-primary block mt-2">Худалдан авах</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            Таны мөрөөдлийн байшин, байр, оффисыг олоорой. Өндөр чанартай үл хөдлөх хөрөнгийн зарууд.
          </p>

          {/* Search Bar */}
          <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl mb-12 animate-fade-in-up animate-delay-400">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Байршил" className="pl-10 h-12 border-0 bg-muted/50" />
              </div>
              <Select>
                <SelectTrigger className="h-12 border-0 bg-muted/50">
                  <SelectValue placeholder="Төрөл" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Байр</SelectItem>
                  <SelectItem value="house">Байшин</SelectItem>
                  <SelectItem value="office">Оффис</SelectItem>
                  <SelectItem value="commercial">Худалдаа</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="h-12 border-0 bg-muted/50">
                  <SelectValue placeholder="Үнийн хязгаар" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-300">0-300 сая</SelectItem>
                  <SelectItem value="300-500">300-500 сая</SelectItem>
                  <SelectItem value="500-800">500-800 сая</SelectItem>
                  <SelectItem value="800+">800+ сая</SelectItem>
                </SelectContent>
              </Select>
              <Button size="lg" className="h-12 px-8 hover:scale-105 transition-all duration-300">
                <Search className="w-4 h-4 mr-2" />
                Хайх
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up animate-delay-600">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                <Home className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">2,500+</h3>
              <p className="text-muted-foreground">Борлуулалтын зар</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">95%</h3>
              <p className="text-muted-foreground">Амжилттай худалдаа</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">24/7</h3>
              <p className="text-muted-foreground">Хайлт үйлчилгээ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
