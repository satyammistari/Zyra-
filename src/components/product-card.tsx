"use client"

import { motion } from "framer-motion"
import { Star, ExternalLink, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: string
    originalPrice?: string
    rating: number
    reviews: number
    image: string
    platform: string
    url: string
    discount?: string
    features?: string[]
  }
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  const platformColors = {
    Amazon: "bg-orange-500",
    eBay: "bg-blue-500",
    Walmart: "bg-blue-600",
    "Best Buy": "bg-yellow-500",
    Target: "bg-red-500",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {product.discount}
          </div>
        )}
        <div
          className={cn(
            "absolute top-2 right-2 text-white px-2 py-1 rounded-md text-xs font-medium",
            platformColors[product.platform as keyof typeof platformColors] || "bg-gray-500"
          )}
        >
          {product.platform}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-white">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                )}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice}
              </span>
            )}
          </div>
        </div>
        
        {product.features && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 3).map((feature, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => window.open(product.url, '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={() => window.open(product.url, '_blank')}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Buy
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
