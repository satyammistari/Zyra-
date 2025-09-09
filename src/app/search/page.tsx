'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Search, Filter, SortAsc } from 'lucide-react'

interface Product {
  uniq_id: string
  product_name: string
  product_category_tree: string
  pid: string
  retail_price: number
  discounted_price: number
  image: string | string[]
  description: string
  brand: string
  product_rating?: string
  overall_rating?: string
  recommendation_reason?: string
}

interface SearchResponse {
  results: Product[]
  total: number
  query: string
  processing_time: number
  recommendation_summary?: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [processingTime, setProcessingTime] = useState(0)
  const [recommendationSummary, setRecommendationSummary] = useState('')
  const [sortBy, setSortBy] = useState<'relevance' | 'price_low' | 'price_high' | 'rating'>('relevance')
  const [filterCategory, setFilterCategory] = useState<string>('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])

  const searchProducts = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          sort_by: sortBy,
          category_filter: filterCategory,
          price_min: priceRange[0],
          price_max: priceRange[1],
          limit: 20
        }),
      })

      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data: SearchResponse = await response.json()
      setResults(data.results)
      setTotal(data.total)
      setProcessingTime(data.processing_time)
      setRecommendationSummary(data.recommendation_summary || '')
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialQuery) {
      searchProducts(initialQuery)
    }
  }, [initialQuery, sortBy, filterCategory, priceRange])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchProducts(query)
  }

  const categories = Array.from(new Set(
    results.map(product => {
      try {
        const categoryTree = JSON.parse(product.product_category_tree.replace(/'/g, '"'))
        return categoryTree[0]?.split(' >> ')[0] || 'Other'
      } catch {
        return 'Other'
      }
    })
  ))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">Search Results</h1>
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="border-white/20 text-white hover:bg-white/10"
            >
              ← Back to Home
            </Button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-purple-400"
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
            </Button>
          </form>

          {/* Filters and Sort */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-white/60" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-md px-3 py-1 text-white text-sm"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category} className="text-black">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <SortAsc className="h-4 w-4 text-white/60" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white/10 border border-white/20 rounded-md px-3 py-1 text-white text-sm"
              >
                <option value="relevance" className="text-black">Relevance</option>
                <option value="price_low" className="text-black">Price: Low to High</option>
                <option value="price_high" className="text-black">Price: High to Low</option>
                <option value="rating" className="text-black">Rating</option>
              </select>
            </div>
          </div>

          {/* Results Info */}
          {total > 0 && (
            <div className="mt-4 text-white/80 text-sm">
              Found {total} results in {processingTime.toFixed(3)}s
            </div>
          )}

          {/* AI Recommendation Summary */}
          {recommendationSummary && (
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-400/20">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    🤖 AI Recommendation Summary
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {recommendationSummary}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-purple-400 mx-auto mb-4" />
              <p className="text-white/60">Searching products...</p>
            </div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product) => {
              let imageUrls: string[] = []
              try {
                imageUrls = typeof product.image === 'string' 
                  ? JSON.parse(product.image.replace(/'/g, '"')) 
                  : product.image
              } catch {
                imageUrls = []
              }
              
              let category = 'Product'
              try {
                const categoryTree = JSON.parse(product.product_category_tree.replace(/'/g, '"'))
                category = categoryTree[0]?.split(' >> ').pop() || 'Product'
              } catch {
                category = 'Product'
              }
              
              return (
                <ProductCard
                  key={product.uniq_id}
                  title={product.product_name}
                  price={product.discounted_price}
                  originalPrice={product.retail_price}
                  image={imageUrls[0] || '/placeholder-product.jpg'}
                  platform="Flipkart"
                  rating={product.overall_rating !== 'No rating available' ? parseFloat(product.overall_rating || '0') : undefined}
                  category={category}
                  recommendationReason={product.recommendation_reason}
                />
              )
            })}
          </div>
        ) : query && !loading ? (
          <div className="text-center py-20">
            <div className="text-white/60 mb-4">
              <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p>Try adjusting your search terms or filters</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-white/60">
              <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Start your search</h3>
              <p>Enter a product name or description above</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
