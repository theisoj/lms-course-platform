"use client"

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { BookMarkedIcon, BookOpen, LogIn } from "lucide-react"
import Link from "next/link"
import { SearchInput } from "./SearchInput"
import { Button } from "./ui/button"
import DarkModeToggle from "./DarkModeToggle"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              prefetch={false}
              className="hover:opacity-90 transition-opacity"
            >
              <img
                src="/kurssit_logo.svg"
                className="size-28 object-contain dark:hidden"
              />
              <img
                src="/kurssit_logo_white.svg"
                className="size-28 object-contain hidden dark:block"
              />
            </Link>

            <SearchInput />
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <SignedIn>
              <nav>
                <Link
                  prefetch={false}
                  href="/my-courses"
                  className="flex space-x-2 items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors md:border md:border-border md:rounded-md md:px-4 md:py-2"
                >
                  <BookMarkedIcon className="h-4 w-4" />
                  <span className="hidden md:block">Minun kurssit</span>
                </Link>
              </nav>
            </SignedIn>

            <DarkModeToggle />

            <SignedIn>
              <UserButton />
            </SignedIn>

            <SignedOut>
              {/* Isolla näytöllä normaali nappi */}
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  size="default"
                  className="hidden sm:flex items-center gap-2"
                >
                  <LogIn className="size-5" />
                  Kirjaudu
                </Button>
              </SignInButton>

              {/* Pienellä näytöllä vain ikoni */}
              <SignInButton mode="modal">
                <button type="button" className="sm:hidden p-2 rounded-full hover:bg-secondary transition">
                  <LogIn className="size-5 text-muted-foreground" />
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  )
}
