"use client"

import { Search, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function SearchInput() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false) // Tila hakukentälle

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="relative w-full flex-1 max-w-[300px]">
      {/* Pienellä näytöllä näkyvä hakupainike */}
      <button
        type="button"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="block sm:hidden absolute left-3 top-1/2 -translate-y-1/2 z-10"
      >
        {isSearchOpen ? (
          <X className="h-6 w-6 text-muted-foreground" />
        ) : (
          <Search className="h-6 w-6 text-muted-foreground" />
        )}
      </button>

      {/* Hakukenttä isolla näytöllä tai kun haku on auki pienellä näytöllä */}
      <form
        onSubmit={handleSubmit}
        className={`relative flex-1 transition-all duration-300 ${
          isSearchOpen
            ? "w-full opacity-100 scale-100"
            : "w-0 opacity-0 scale-95 sm:w-full sm:opacity-100 sm:scale-100"
        }`}
      >
        <input
          type="text"
          placeholder="Etsi kursseja..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full rounded-full bg-secondary/80 px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${
            isSearchOpen ? "block" : "hidden sm:block"
          }`}
        />
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hidden sm:block" />
      </form>
    </div>
  )
}
