import { Header } from "@/components/header"
import { SellHeroSection } from "@/components/sell-hero-section"
import { SellFilters } from "@/components/sell-filters"
import { SaleListings } from "@/components/sale-listings"

export default function SellPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <SellHeroSection />
        <SellFilters />
        <SaleListings />
      </main>
    </div>
  )
}
