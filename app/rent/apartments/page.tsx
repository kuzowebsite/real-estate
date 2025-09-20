import { Header } from "@/components/header"
import { CategoryHeroSection } from "@/components/category-hero-section"
import { RentFilters } from "@/components/rent-filters"
import { RentalListings } from "@/components/rental-listings"

export default function RentApartmentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <CategoryHeroSection
          title="Орон сууц түрээслэх"
          subtitle="Улаанбаатар хотын орон сууцны түрээсийн зарууд"
          category="apartments"
          type="rent"
        />
        <RentFilters />
        <RentalListings category="apartments" />
      </main>
    </div>
  )
}
