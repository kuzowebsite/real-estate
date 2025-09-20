"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Phone, Video, MoreVertical, ArrowLeft, Paperclip, Smile } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

interface Message {
  id: string
  text: string
  sender: "user" | "admin"
  timestamp: Date
  status?: "sent" | "delivered" | "read"
}

export default function ChatPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Сайн байна уу! Би танд хэрхэн тусалж чадах вэ?",
      sender: "admin",
      timestamp: new Date(Date.now() - 300000),
      status: "read",
    },
    {
      id: "2",
      text: "Сайн байна уу! Орон сууцны талаар асуух зүйл байна.",
      sender: "user",
      timestamp: new Date(Date.now() - 240000),
      status: "read",
    },
    {
      id: "3",
      text: "Мэдээжээ! Ямар орон сууц хайж байна вэ? Байршил, үнийн хязгаар зэргийг хэлээрэй.",
      sender: "admin",
      timestamp: new Date(Date.now() - 180000),
      status: "read",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate admin response
    setTimeout(() => {
      setIsTyping(false)
      const adminMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Таны хүсэлтийг хүлээн авлаа. Удахгүй хариулах болно.",
        sender: "admin",
        timestamp: new Date(),
        status: "sent",
      }
      setMessages((prev) => [...prev, adminMessage])
    }, 2000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("mn-MN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  return (
    <div className="min-h-screen bg-background pt-16 sm:pt-20">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 max-w-4xl">
        {/* Chat Header */}
        <Card className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link href="/" className="sm:hidden">
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                <AvatarImage src="/admin-avatar.png" />
                <AvatarFallback className="bg-primary text-primary-foreground">АД</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-sm sm:text-base">Админ</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm text-muted-foreground">Онлайн</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button variant="ghost" size="icon" className="w-8 h-8 sm:w-10 sm:h-10">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 sm:w-10 sm:h-10">
                <Video className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 sm:w-10 sm:h-10">
                <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Chat Messages */}
        <Card className="mb-4 sm:mb-6">
          <div className="h-[50vh] sm:h-[60vh] overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] sm:max-w-[70%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                  {message.sender === "admin" && (
                    <div className="flex items-center space-x-2 mb-1">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">АД</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">Админ</span>
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm sm:text-base break-words">{message.text}</p>
                  </div>
                  <div
                    className={`flex items-center space-x-1 mt-1 text-xs text-muted-foreground ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span>{formatTime(message.timestamp)}</span>
                    {message.sender === "user" && message.status && (
                      <Badge variant="secondary" className="text-xs px-1 py-0">
                        {message.status === "sent" && "✓"}
                        {message.status === "delivered" && "✓✓"}
                        {message.status === "read" && "✓✓"}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[70%]">
                  <div className="flex items-center space-x-2 mb-1">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">АД</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">Админ</span>
                  </div>
                  <div className="bg-muted text-foreground rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </Card>

        {/* Message Input */}
        <Card>
          <div className="p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button variant="ghost" size="icon" className="w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder="Мессеж бичих..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="pr-10 sm:pr-12 h-10 sm:h-12 text-sm sm:text-base border-0 bg-input focus:ring-2 focus:ring-primary/20"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10"
                >
                  <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 shrink-0"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <Button variant="outline" className="h-10 sm:h-12 text-xs sm:text-sm bg-transparent">
            Орон сууц хайх
          </Button>
          <Button variant="outline" className="h-10 sm:h-12 text-xs sm:text-sm bg-transparent">
            Үнийн мэдээлэл
          </Button>
          <Button variant="outline" className="h-10 sm:h-12 text-xs sm:text-sm bg-transparent">
            Зээлийн зөвлөгөө
          </Button>
          <Button variant="outline" className="h-10 sm:h-12 text-xs sm:text-sm bg-transparent">
            Техникийн дэмжлэг
          </Button>
        </div>
      </div>
    </div>
  )
}
