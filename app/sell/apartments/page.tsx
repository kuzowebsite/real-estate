import { Header } from "@/components/header"
import { CategoryHeroSection } from "@/components/category-hero-section"
import { SellFilters } from "@/components/sell-filters"
import { SaleListings } from "@/components/sale-listings"

export default function SellApartmentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <CategoryHeroSection
          title="Орон сууц зарах"
          subtitle="Улаанбаатар хотын орон сууцны худалдааны зарууд"
          category="apartments"
          type="sell"
        />
        <SellFilters />
        <SaleListings category="apartments" />
      </main>
    </div>
  )
}
