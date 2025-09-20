"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface ChatMessage {
  id: string
  text: string
  sender: "user" | "admin"
  timestamp: Date
  status?: "sent" | "delivered" | "read"
}

interface ChatContextType {
  messages: ChatMessage[]
  unreadCount: number
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void
  markAsRead: () => void
  isOnline: boolean
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOnline, setIsOnline] = useState(true)

  const addMessage = (message: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])

    if (message.sender === "admin") {
      setUnreadCount((prev) => prev + 1)
    }
  }

  const markAsRead = () => {
    setUnreadCount(0)
  }

  // Simulate admin messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        // 5% chance every 10 seconds
        addMessage({
          text: "Танд тусламж хэрэгтэй юу байна?",
          sender: "admin",
          status: "sent",
        })
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <ChatContext.Provider
      value={{
        messages,
        unreadCount,
        addMessage,
        markAsRead,
        isOnline,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
