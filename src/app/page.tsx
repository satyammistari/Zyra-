"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Home as HomeIcon, Search as SearchIcon, TrendingUp, Settings } from 'lucide-react'
import { Particles } from "@/components/ui/particles"
import { AI_Prompt } from "@/components/ui/animated-ai-input"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { SearchResults } from "@/components/search-results"

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
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000")
  }, [theme])

  const navItems = [
    { name: 'Home', url: '#', icon: HomeIcon },
    { name: 'Search', url: '#search', icon: SearchIcon },
    { name: 'Trending', url: '#trending', icon: TrendingUp },
    { name: 'Settings', url: '#settings', icon: Settings }
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setIsLoading(true)
    setHasSearched(true)
    
    // Simulate API call delay
    setTimeout(() => {
      // Filter mock products based on query (simple simulation)
      const filtered = mockProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.features?.some(feature => 
          feature.toLowerCase().includes(query.toLowerCase())
        )
      )
      
      // If no specific matches, show all products as "related results"
      setSearchResults(filtered.length > 0 ? filtered : mockProducts)
      setIsLoading(false)
    }, 2000)
  }

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

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {!hasSearched ? (
          // Hero Section
          <div className="text-center mb-8 max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-transparent dark:from-white dark:to-slate-900/10 mb-6">
              Product Search
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Find the best products across all e-commerce platforms with AI-powered recommendations
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                🛒 Amazon
              </div>
              <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                🛍️ eBay
              </div>
              <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                🏪 Walmart
              </div>
              <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                🔵 Best Buy
              </div>
              <div className="bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                🎯 Target
              </div>
            </div>
          </div>
        ) : (
          // Search Results Header
          <div className="w-full max-w-6xl mb-8">
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-transparent dark:from-white dark:to-slate-900/10 mb-4">
                {Array.from({ length: 50 }).map((_, i) => {
                  const randomLeft = Math.random() * 100;
                  const randomTop = Math.random() * 100;
                  const randomWidth = Math.random() * 4 + 1;
                  const randomHeight = Math.random() * 4 + 1;
                  const randomOpacity = Math.random() * 0.5 + 0.1;
                  const randomDelay = Math.random() * 2;
                  const randomDuration = Math.random() * 3 + 2;
                  
                  return (
                    <div
                      key={i}
                      className="absolute animate-pulse"
                      style={{
                        left: `${randomLeft}%`,
                        top: `${randomTop}%`,
                        width: `${randomWidth}px`,
                        height: `${randomHeight}px`,
                        backgroundColor: 'currentColor',
                        borderRadius: '50%',
                        opacity: randomOpacity,
                        animationDelay: `${randomDelay}s`,
                        animationDuration: `${randomDuration}s`,
                      }}
                    />
                  );
                })}
                Product Search
              </h1>
            </div>
          </div>
        )}

        {/* Search Input */}
        <div className="w-full flex justify-center mb-8">
          <AI_Prompt onSearch={handleSearch} />
        </div>

        {/* Search Results */}
        {hasSearched && (
          <SearchResults
            products={searchResults}
            isLoading={isLoading}
            query={searchQuery}
          />
        )}

        {/* Features Section (only show when no search has been made) */}
        {!hasSearched && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="text-center p-6 bg-white/5 dark:bg-black/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                AI-Powered Search
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced AI understands your needs and finds the perfect products
              </p>
            </div>
            
            <div className="text-center p-6 bg-white/5 dark:bg-black/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Best Prices
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Compare prices across all major platforms to get the best deals
              </p>
            </div>
            
            <div className="text-center p-6 bg-white/5 dark:bg-black/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Smart Reviews
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Aggregated reviews and ratings to help you make informed decisions
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
