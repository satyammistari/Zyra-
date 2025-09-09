import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'

interface Product {
  uniq_id: string
  crawl_timestamp: string
  product_url: string
  product_name: string
  product_category_tree: string
  pid: string
  retail_price: string
  discounted_price: string
  image: string
  is_FK_Advantage_product: string
  description: string
  product_rating: string
  overall_rating: string
  brand: string
  product_specifications: string
  relevanceScore?: number
}

interface SearchRequest {
  query: string
  sort_by?: 'relevance' | 'price_low' | 'price_high' | 'rating'
  category_filter?: string
  price_min?: number
  price_max?: number
  limit?: number
}

let productsCache: Product[] | null = null

function loadProducts(): Product[] {
  if (productsCache) {
    return productsCache
  }

  try {
    const csvPath = path.join(process.cwd(), 'flipkart_com-ecommerce_sample.csv')
    const csvContent = fs.readFileSync(csvPath, 'utf-8')
    
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    }) as Product[]

    productsCache = records
    return records
  } catch (error) {
    console.error('Error loading products:', error)
    return []
  }
}

function calculateRelevanceScore(product: Product, query: string): number {
  const searchTerms = query.toLowerCase().split(' ')
  let score = 0

  const productName = product.product_name.toLowerCase()
  const description = product.description.toLowerCase()
  const brand = product.brand.toLowerCase()
  const category = product.product_category_tree.toLowerCase()

  searchTerms.forEach(term => {
    // Exact matches in product name get highest score
    if (productName.includes(term)) {
      score += productName === term ? 100 : 50
    }
    
    // Brand matches
    if (brand.includes(term)) {
      score += brand === term ? 80 : 40
    }
    
    // Category matches
    if (category.includes(term)) {
      score += 30
    }
    
    // Description matches
    if (description.includes(term)) {
      score += 20
    }
  })

  // Boost score for products with ratings
  if (product.overall_rating && product.overall_rating !== 'No rating available') {
    const rating = parseFloat(product.overall_rating)
    if (!isNaN(rating)) {
      score += rating * 5
    }
  }

  // Boost score for products with discounts
  const retailPrice = parseFloat(product.retail_price) || 0
  const discountedPrice = parseFloat(product.discounted_price) || 0
  if (retailPrice > discountedPrice && retailPrice > 0) {
    const discountPercent = ((retailPrice - discountedPrice) / retailPrice) * 100
    score += discountPercent * 0.5
  }

  return score
}

function generateRecommendationReason(product: Product, query: string): string {
  const searchTerms = query.toLowerCase().split(' ')
  const productName = product.product_name.toLowerCase()
  const description = product.description.toLowerCase()
  const brand = product.brand.toLowerCase()
  const category = product.product_category_tree.toLowerCase()
  
  const reasons: string[] = []
  
  // Check for direct matches
  const nameMatches = searchTerms.filter(term => productName.includes(term))
  if (nameMatches.length > 0) {
    reasons.push(`Perfect match for "${nameMatches.join(', ')}" in product name`)
  }
  
  const brandMatches = searchTerms.filter(term => brand.includes(term))
  if (brandMatches.length > 0) {
    reasons.push(`From trusted brand ${product.brand}`)
  }
  
  // Price advantage
  const retailPrice = parseFloat(product.retail_price) || 0
  const discountedPrice = parseFloat(product.discounted_price) || 0
  if (retailPrice > discountedPrice && retailPrice > 0) {
    const discountPercent = Math.round(((retailPrice - discountedPrice) / retailPrice) * 100)
    reasons.push(`Great value with ${discountPercent}% discount`)
  }
  
  // Rating advantage
  if (product.overall_rating && product.overall_rating !== 'No rating available') {
    const rating = parseFloat(product.overall_rating)
    if (!isNaN(rating) && rating >= 4.0) {
      reasons.push(`Highly rated (${rating}/5 stars)`)
    }
  }
  
  // Category relevance
  const categoryMatches = searchTerms.filter(term => category.includes(term))
  if (categoryMatches.length > 0) {
    reasons.push(`Relevant category match`)
  }
  
  // Feature highlights from description
  if (description.includes('premium') || description.includes('quality')) {
    reasons.push(`Premium quality product`)
  }
  
  if (description.includes('bestseller') || description.includes('popular')) {
    reasons.push(`Popular choice among customers`)
  }
  
  return reasons.length > 0 
    ? reasons.slice(0, 3).join(' • ') 
    : `Matches your search criteria for "${query}"`
}

function generateOverallRecommendationSummary(query: string, totalResults: number): string {
  const searchTerms = query.toLowerCase().split(' ')
  
  if (searchTerms.some(term => ['phone', 'mobile', 'smartphone'].includes(term))) {
    return `Found ${totalResults} smartphones matching your search. Results are ranked by relevance, customer ratings, and value for money. Top recommendations include latest models with best price-to-feature ratio.`
  }
  
  if (searchTerms.some(term => ['laptop', 'computer', 'pc'].includes(term))) {
    return `Discovered ${totalResults} computing devices for your needs. Recommendations prioritize performance, brand reliability, and customer satisfaction. Best value options are highlighted first.`
  }
  
  if (searchTerms.some(term => ['shoes', 'footwear', 'sneakers'].includes(term))) {
    return `Found ${totalResults} footwear options matching your style. Results are curated based on comfort ratings, brand reputation, and customer reviews. Top picks offer best comfort and durability.`
  }
  
  if (searchTerms.some(term => ['clothing', 'shirt', 'dress', 'wear'].includes(term))) {
    return `Curated ${totalResults} fashion items for you. Recommendations consider style trends, fabric quality, and customer feedback. Featured products offer best fit and value.`
  }
  
  return `Found ${totalResults} products matching "${query}". Results are intelligently ranked using our AI algorithm that considers product relevance, customer ratings, price value, and brand reputation to bring you the best recommendations.`
}

function filterProducts(products: Product[], filters: SearchRequest): Product[] {
  return products.filter(product => {
    // Category filter
    if (filters.category_filter) {
      try {
        const categoryTree = JSON.parse(product.product_category_tree.replace(/'/g, '"'))
        const mainCategory = categoryTree[0]?.split(' >> ')[0] || ''
        if (!mainCategory.toLowerCase().includes(filters.category_filter.toLowerCase())) {
          return false
        }
      } catch {
        return false
      }
    }

    // Price range filter
    const price = parseFloat(product.discounted_price) || 0
    if (filters.price_min !== undefined && price < filters.price_min) {
      return false
    }
    if (filters.price_max !== undefined && price > filters.price_max) {
      return false
    }

    return true
  })
}

function sortProducts(products: Product[], sortBy: string): Product[] {
  switch (sortBy) {
    case 'price_low':
      return products.sort((a, b) => {
        const priceA = parseFloat(a.discounted_price) || 0
        const priceB = parseFloat(b.discounted_price) || 0
        return priceA - priceB
      })
    
    case 'price_high':
      return products.sort((a, b) => {
        const priceA = parseFloat(a.discounted_price) || 0
        const priceB = parseFloat(b.discounted_price) || 0
        return priceB - priceA
      })
    
    case 'rating':
      return products.sort((a, b) => {
        const ratingA = a.overall_rating !== 'No rating available' ? parseFloat(a.overall_rating) || 0 : 0
        const ratingB = b.overall_rating !== 'No rating available' ? parseFloat(b.overall_rating) || 0 : 0
        return ratingB - ratingA
      })
    
    default: // relevance - already sorted by relevance score
      return products
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const body: SearchRequest = await request.json()
    const { query, sort_by = 'relevance', limit = 20 } = body

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      )
    }

    // Load products
    const allProducts = loadProducts()
    
    if (allProducts.length === 0) {
      return NextResponse.json(
        { error: 'No products available' },
        { status: 500 }
      )
    }

    // Calculate relevance scores and filter
    const scoredProducts = allProducts
      .map(product => ({
        ...product,
        relevanceScore: calculateRelevanceScore(product, query)
      }))
      .filter(product => product.relevanceScore > 0)

    // Apply filters
    const filteredProducts = filterProducts(scoredProducts, body)

    // Sort products
    let sortedProducts = sortProducts(filteredProducts, sort_by)
    
    // If sorting by relevance, sort by score
    if (sort_by === 'relevance') {
      sortedProducts = sortedProducts.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
    }

    // Limit results
    const results = sortedProducts.slice(0, limit)

    const processingTime = (Date.now() - startTime) / 1000

    return NextResponse.json({
      results: results.map(({ relevanceScore, ...product }) => ({
        ...product,
        retail_price: parseFloat(product.retail_price) || 0,
        discounted_price: parseFloat(product.discounted_price) || 0,
        recommendation_reason: generateRecommendationReason(product, query)
      })),
      total: filteredProducts.length,
      query,
      processing_time: processingTime,
      sort_by,
      recommendation_summary: generateOverallRecommendationSummary(query, filteredProducts.length),
      filters: {
        category_filter: body.category_filter,
        price_min: body.price_min,
        price_max: body.price_max
      }
    })

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST instead.' },
    { status: 405 }
  )
}
