"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Home as HomeIcon, Search as SearchIcon, TrendingUp, Settings } from 'lucide-react'
import { Particles } from "@/components/ui/particles"
import { AI_Prompt } from "@/components/ui/animated-ai-input"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { SearchResults } from "@/components/search-results"
import { HeroPillSecond, BeamsBackgroundDemo, StackedCircularFooterDemo } from "@/components/demo"
import IntegrationHero from "@/components/ui/integration-hero"

// Mock product data for demonstration
const mockProducts = [
  {
    id: "1",
    name: "Apple iPhone 15 Pro Max 256GB - Natural Titanium",
    price: "$1,199.00",
    originalPrice: "$1,299.00",
    rating: 4.8,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
    platform: "Amazon",
    url: "#",
    discount: "8% OFF",
    features: ["256GB Storage", "Pro Camera", "Titanium Build"]
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra 512GB - Phantom Black",
    price: "$1,099.99",
    originalPrice: "$1,199.99",
    rating: 4.7,
    reviews: 1923,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop",
    platform: "Best Buy",
    url: "#",
    discount: "10% OFF",
    features: ["512GB Storage", "S Pen Included", "200MP Camera"]
  },
  {
    id: "3",
    name: "Google Pixel 8 Pro 128GB - Obsidian",
    price: "$899.00",
    originalPrice: "$999.00",
    rating: 4.6,
    reviews: 1456,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    platform: "eBay",
    url: "#",
    discount: "15% OFF",
    features: ["AI Photography", "Pure Android", "7 Years Updates"]
  },
  {
    id: "4",
    name: "OnePlus 12 256GB - Flowy Emerald",
    price: "$799.99",
    rating: 4.5,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400&h=300&fit=crop",
    platform: "Walmart",
    url: "#",
    features: ["Fast Charging", "Hasselblad Camera", "OxygenOS"]
  }
]

export default function ProductSearchPage() {
  const { theme } = useTheme()
  const [color, setColor] = useState("#ffffff")

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000")
  }, [theme])

  const navItems = [
    { name: 'Home', url: '#', icon: HomeIcon },
    { name: 'Search', url: '#search', icon: SearchIcon },
    { name: 'Trending', url: '#trending', icon: TrendingUp },
    { name: 'Settings', url: '#settings', icon: Settings }
  ]

  // Search is now handled by AI_Prompt component which redirects to /search page

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Navigation */}
      <NavBar items={navItems} />
      
      {/* Particles Background */}
      <div className="absolute inset-0 -z-10">
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color={color}
          refresh
        />
      </div>

      {/* Beams Background - Above particles, behind content */}
      <div className="absolute inset-0 -z-5">
        <BeamsBackgroundDemo />
      </div>

      {/* Hero Pill - Below Nav */}
      <div className="pt-20 pb-4">
        <div className="flex justify-center">
          <HeroPillSecond />
        </div>
      </div>

      {/* Product Search Title */}
      <div className="pb-8">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-transparent dark:from-white dark:to-slate-900/10">
            Product Search
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center px-4">
        {/* Hero Section */}
        <div className="text-center mb-8 max-w-4xl">
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Find the best products across all e-commerce platforms with AI-powered recommendations
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
              🛒 Flipkart
            </div>
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
              🛍️ Amazon
            </div>
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
              🏪 eBay
            </div>
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
              🔵 Walmart
            </div>
            <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
              🎯 Target
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="w-full flex justify-center mb-8">
          <AI_Prompt />
        </div>

        {/* Integration Hero Section */}
        <IntegrationHero />
      </div>

      {/* Footer - Always visible */}
      <StackedCircularFooterDemo />
    </main>
  )
}
