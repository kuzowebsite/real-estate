import { Header } from "@/components/header"
import { RentHeroSection } from "@/components/rent-hero-section"
import { RentFilters } from "@/components/rent-filters"
import { RentalListings } from "@/components/rental-listings"

export default function RentPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <RentHeroSection />
        <RentFilters />
        <RentalListings />
      </main>
    </div>
  )
}
