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
    <div className="relative w-full flex-1 mx-8">
      {/* Pienellä näytöllä näkyvä hakupainike */}
      <button
        type="button"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className={`z-10 flex items-center gap-x-3 ${!isSearchOpen ? "absolute left-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full hover:bg-white/10 w-full" : "absolute left-3 top-1/2 -translate-y-1/2"}`}
      >
        <Search className="size-4 text-muted-foreground cursor-pointer" />
        {isSearchOpen && searchQuery.length > 0 ? null : isSearchOpen ? (
          <span className="text-sm text-muted-foreground cursor-text">
            Hae kursseja...
          </span>
        ) : (
          <span className="text-sm text-muted-foreground cursor-text">
            Etsi
          </span>
        )}
      </button>

      {/* Hakukenttä isolla näytöllä tai kun haku on auki pienellä näytöllä */}
      <form
        onSubmit={handleSubmit}
        className={`relative flex-1 transition-all duration-300 ${
          isSearchOpen ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full rounded-full bg-secondary dark:bg-secondary/80 px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 block`}
        />
      </form>
    </div>
  )
}
