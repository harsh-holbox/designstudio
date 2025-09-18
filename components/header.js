"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-6 lg:px-16">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent backdrop-blur-sm"></div>

      <div className="relative flex items-center">
        <Link
          href="/"
          className="font-playfair text-2xl sm:text-3xl font-light text-white tracking-tight drop-shadow-lg"
        >
          designstudio
        </Link>
      </div>

      <button
        className="relative md:hidden text-white p-2 drop-shadow-lg"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <nav
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:flex absolute md:relative top-full md:top-auto left-0 md:left-auto w-full md:w-auto bg-black/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-12 p-6 md:p-0`}
      >
        <Link
          href="/how-it-works"
          className="relative font-inter text-white/90 hover:text-white text-sm font-light transition-all duration-300 hover:scale-105 tracking-wide drop-shadow-lg"
          onClick={() => setIsMenuOpen(false)}
        >
          How It Works
        </Link>
        {["Design Styles", "Pricing", "About"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            className="relative font-inter text-white/90 hover:text-white text-sm font-light transition-all duration-300 hover:scale-105 tracking-wide drop-shadow-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            {item}
          </Link>
        ))}
      </nav>

      <div className="relative hidden md:flex items-center space-x-4 lg:space-x-8">
        <Link
          href="/login"
          className="font-inter text-white/90 hover:text-white text-sm font-light transition-all duration-300 tracking-wide drop-shadow-lg"
        >
          Login
        </Link>
        <Button className="bg-white/10 border border-white/40 hover:bg-white hover:text-black text-white px-4 lg:px-8 py-2 lg:py-3 rounded-full text-sm font-light shadow-xl transition-all duration-500 hover:scale-105 backdrop-blur-sm drop-shadow-lg">
          Start Designing
        </Button>
      </div>
    </header>
  )
}
