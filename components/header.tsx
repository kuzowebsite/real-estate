"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Home,
  Building2,
  DollarSign,
  Bookmark,
  MessageCircle,
  User,
  Settings,
  Heart,
  CreditCard,
  Menu,
  X,
  ChevronDown,
  LogIn,
  LogOut,
  Plus,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useChat } from "@/contexts/chat-context"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { unreadCount } = useChat()

  const navigationItems = [
    { name: "Нүүр", icon: Home, href: "/" },
    {
      name: "Түрээслэх",
      icon: Building2,
      href: "/rent",
      subcategories: [
        { name: "Орон сууц", href: "/rent/apartments" },
        { name: "Байшин", href: "/rent/houses" },
        { name: "Оффис", href: "/rent/offices" },
        { name: "Худалдааны талбай", href: "/rent/commercial" },
        { name: "Агуулах", href: "/rent/warehouse" },
        { name: "Газар", href: "/rent/land" },
      ],
    },
    {
      name: "Зарах",
      icon: DollarSign,
      href: "/sell",
      subcategories: [
        { name: "Орон сууц зарах", href: "/sell/apartments" },
        { name: "Байшин зарах", href: "/sell/houses" },
        { name: "Оффис зарах", href: "/sell/offices" },
        { name: "Худалдааны талбай зарах", href: "/sell/commercial" },
        { name: "Агуулах зарах", href: "/sell/warehouse" },
        { name: "Газар зарах", href: "/sell/land" },
      ],
    },
    {
      name: "Төлөвлөт",
      icon: Building2,
      href: "/projects",
      subcategories: [
        { name: "Орон сууцны төсөл", href: "/projects/residential" },
        { name: "Худалдааны төсөл", href: "/projects/commercial" },
        { name: "Холимог төсөл", href: "/projects/mixed" },
      ],
    },
    { name: "Хадгалсан зар", icon: Bookmark, href: "/saved" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border animate-slide-in-down">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1 sm:space-x-2 animate-fade-in-up">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-3 h-3 sm:w-5 sm:h-5 text-primary-foreground" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-foreground">Mind Nexora</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <div key={item.name}>
                {item.subcategories ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-accent/10 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="font-medium">{item.name}</span>
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 animate-scale-in bg-popover border border-border shadow-lg">
                      <DropdownMenuItem asChild>
                        <Link
                          href={item.href}
                          className="flex items-center space-x-2 cursor-pointer hover:bg-accent/10"
                        >
                          <item.icon className="w-4 h-4" />
                          <span>Бүгд</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {item.subcategories.map((sub) => (
                        <DropdownMenuItem key={sub.name} asChild>
                          <Link href={sub.href} className="cursor-pointer hover:bg-accent/10">
                            <span>{sub.name}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-accent/10 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Chat Button */}
            <Link href="/chat">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-accent/10 transition-all duration-300 hover:scale-110 animate-fade-in-up animate-delay-300 w-8 h-8 sm:w-10 sm:h-10"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center font-bold animate-pulse">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1 sm:space-x-2 hover:bg-accent/10 transition-all duration-300 hover:scale-105 animate-fade-in-up animate-delay-400 px-2 sm:px-3 h-8 sm:h-10"
                  >
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden md:inline font-medium text-sm">Профайл</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 animate-scale-in bg-popover border border-border shadow-lg"
                >
                  <div className="px-3 py-2 border-b border-border">
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/create-listing"
                      className="flex items-center space-x-2 cursor-pointer hover:bg-accent/10"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Зар оруулах</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/my-listings" className="flex items-center space-x-2 cursor-pointer hover:bg-accent/10">
                      <Building2 className="w-4 h-4" />
                      <span>Миний зарууд</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/payment" className="flex items-center space-x-2 cursor-pointer hover:bg-accent/10">
                      <CreditCard className="w-4 h-4" />
                      <span>Төлбөр</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/favorites" className="flex items-center space-x-2 cursor-pointer hover:bg-accent/10">
                      <Heart className="w-4 h-4" />
                      <span>Таалагдсан зарууд</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center space-x-2 cursor-pointer hover:bg-accent/10">
                      <Settings className="w-4 h-4" />
                      <span>Тохиргоо</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex items-center space-x-2 cursor-pointer hover:bg-accent/10 text-destructive"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Гарах</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-1 sm:space-x-2 hover:bg-accent/10 transition-all duration-300 hover:scale-105 animate-fade-in-up animate-delay-400 px-2 sm:px-3 h-8 sm:h-10"
                >
                  <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden md:inline font-medium text-sm">Нэвтрэх</span>
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-accent/10 transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-2 sm:py-4 border-t border-border animate-fade-in-up max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="flex flex-col space-y-1">
              {navigationItems.map((item, index) => (
                <div key={item.name}>
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      className="flex items-center justify-start space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-accent/10 transition-all duration-300 animate-fade-in-up w-full text-sm sm:text-base"
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Button>
                  </Link>
                  {item.subcategories && (
                    <div className="ml-6 sm:ml-8 mt-1 space-y-1">
                      {item.subcategories.map((sub) => (
                        <Link key={sub.name} href={sub.href}>
                          <Button
                            variant="ghost"
                            className="flex items-center justify-start px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-accent/10 transition-all duration-300 w-full text-xs sm:text-sm text-muted-foreground"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span>{sub.name}</span>
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
