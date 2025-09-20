import { HeroSection } from "@/components/hero-section"
import { FeaturedProperties } from "@/components/featured-properties"
import { ChatWidget } from "@/components/chat-widget"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedProperties />
      <ChatWidget />
    </main>
  )
}
