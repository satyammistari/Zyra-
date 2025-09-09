"use client"

import { motion } from "framer-motion"
import { Star, ExternalLink, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  id?: string
  title: string
  price: number
  originalPrice?: number
  rating?: number
  image: string
  platform: string
  category?: string
  recommendationReason?: string
}

export function ProductCard({ 
  id, 
  title, 
  price, 
  originalPrice, 
  rating, 
  image, 
  platform, 
  category,
  recommendationReason
}: ProductCardProps) {
  const platformColors = {
    Amazon: "bg-orange-500",
    eBay: "bg-blue-500",
    Walmart: "bg-blue-600",
    "Best Buy": "bg-yellow-500",
    Target: "bg-red-500",
    Flipkart: "bg-orange-600"
  }

  const discount = originalPrice && originalPrice > price 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) + '% OFF'
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {discount}
          </div>
        )}
        <div
          className={cn(
            "absolute top-2 right-2 text-white px-2 py-1 rounded-md text-xs font-medium",
            platformColors[platform as keyof typeof platformColors] || "bg-gray-500"
          )}
        >
          {platform}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-white">
          {title}
        </h3>
        
        {rating && (
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  )}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">
              ₹{price.toLocaleString()}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-gray-500 line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        
        {category && (
          <div className="mb-3">
            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
              {category}
            </span>
          </div>
        )}

        {/* Recommendation Reason */}
        {recommendationReason && (
          <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-400">
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">
                  Why this is recommended:
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
                  {recommendationReason}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View
          </Button>
          <Button
            size="sm"
            className="flex-1"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Buy
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
