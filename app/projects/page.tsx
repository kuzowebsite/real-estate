import { Header } from "@/components/header"
import { ProjectsHeroSection } from "@/components/projects-hero-section"
import { ProjectsFilters } from "@/components/projects-filters"
import { ProjectListings } from "@/components/project-listings"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <ProjectsHeroSection />
        <ProjectsFilters />
        <ProjectListings />
      </main>
    </div>
  )
}
