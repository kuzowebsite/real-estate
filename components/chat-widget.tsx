"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, X, Send, Minimize2 } from "lucide-react"
import { useChat } from "@/contexts/chat-context"
import Link from "next/link"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const { unreadCount, addMessage, markAsRead } = useChat()

  const handleSendMessage = () => {
    if (!message.trim()) return

    addMessage({
      text: message,
      sender: "user",
      status: "sent",
    })

    setMessage("")

    // Simulate admin response
    setTimeout(() => {
      addMessage({
        text: "Таны мессежийг хүлээн авлаа. Удахгүй хариулах болно.",
        sender: "admin",
        status: "sent",
      })
    }, 2000)
  }

  const handleOpen = () => {
    setIsOpen(true)
    markAsRead()
  }

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <Button
          onClick={handleOpen}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-secondary hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center font-bold">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-80 sm:w-96 h-96 sm:h-[500px] z-50 shadow-2xl animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border bg-card rounded-t-lg">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs sm:text-sm">АД</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Админ</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Онлайн</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Link href="/chat">
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Minimize2 className="w-4 h-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 h-64 sm:h-80">
            <div className="flex justify-start">
              <div className="bg-muted text-foreground rounded-2xl px-3 py-2 max-w-[80%]">
                <p className="text-sm">Сайн байна уу! Би танд хэрхэн тусалж чадах вэ?</p>
              </div>
            </div>

            <div className="text-center">
              <Link href="/chat">
                <Button variant="outline" size="sm" className="text-xs bg-transparent">
                  Бүрэн чат руу очих
                </Button>
              </Link>
            </div>
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Мессеж бичих..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 h-8 sm:h-10 text-sm border-0 bg-input focus:ring-2 focus:ring-primary/20"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                size="icon"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary hover:bg-primary/90"
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
