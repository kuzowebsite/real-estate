import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { AuthProvider } from "@/contexts/auth-context"
import { FavoritesProvider } from "@/contexts/favorites-context"
import { ChatProvider } from "@/contexts/chat-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EstateHub - Үл хөдлөх хөрөнгийн платформ",
  description: "Монгол дахь хамгийн том үл хөдлөх хөрөнгийн платформ",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="mn">
      <body className={inter.className}>
        <AuthProvider>
          <FavoritesProvider>
            <ChatProvider>
              <Header />
              <main className="pt-16">{children}</main>
            </ChatProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
