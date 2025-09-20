"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./auth-context"

interface FavoritesContextType {
  savedListings: string[]
  favoriteListings: string[]
  toggleSaved: (listingId: string) => void
  toggleFavorite: (listingId: string) => void
  isSaved: (listingId: string) => boolean
  isFavorite: (listingId: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [savedListings, setSavedListings] = useState<string[]>([])
  const [favoriteListings, setFavoriteListings] = useState<string[]>([])

  useEffect(() => {
    if (user) {
      // Load saved and favorite listings from localStorage
      const saved = localStorage.getItem(`saved_${user.id}`)
      const favorites = localStorage.getItem(`favorites_${user.id}`)

      if (saved) setSavedListings(JSON.parse(saved))
      if (favorites) setFavoriteListings(JSON.parse(favorites))
    } else {
      // Clear data when user logs out
      setSavedListings([])
      setFavoriteListings([])
    }
  }, [user])

  const toggleSaved = (listingId: string) => {
    if (!user) return

    setSavedListings((prev) => {
      const newSaved = prev.includes(listingId) ? prev.filter((id) => id !== listingId) : [...prev, listingId]

      localStorage.setItem(`saved_${user.id}`, JSON.stringify(newSaved))
      return newSaved
    })
  }

  const toggleFavorite = (listingId: string) => {
    if (!user) return

    setFavoriteListings((prev) => {
      const newFavorites = prev.includes(listingId) ? prev.filter((id) => id !== listingId) : [...prev, listingId]

      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const isSaved = (listingId: string) => savedListings.includes(listingId)
  const isFavorite = (listingId: string) => favoriteListings.includes(listingId)

  return (
    <FavoritesContext.Provider
      value={{
        savedListings,
        favoriteListings,
        toggleSaved,
        toggleFavorite,
        isSaved,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
