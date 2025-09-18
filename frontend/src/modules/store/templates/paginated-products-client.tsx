"use client"

import { useEffect, useState } from "react"
import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { HttpTypes } from "@medusajs/types"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

interface PaginatedProductsClientProps {
  sortBy: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  searchTerm?: string
  priceRange?: { min: number; max: number }
  viewMode?: 'grid' | 'list'
  onProductCountChange?: (count: number) => void
}

export default function PaginatedProductsClient({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  searchTerm,
  priceRange,
  viewMode = 'grid',
  onProductCountChange,
}: PaginatedProductsClientProps) {
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([])
  const [count, setCount] = useState(0)
  const [region, setRegion] = useState<HttpTypes.StoreRegion | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const queryParams: PaginatedProductsParams = {
          limit: PRODUCT_LIMIT,
        }

        if (collectionId) {
          queryParams["collection_id"] = [collectionId]
        }

        if (categoryId) {
          queryParams["category_id"] = [categoryId]
        }

        if (productsIds) {
          queryParams["id"] = productsIds
        }

        if (sortBy === "created_at") {
          queryParams["order"] = "created_at"
        }

        // Fetch region
        const regionData = await getRegion(countryCode)
        if (!regionData) {
          throw new Error("Region not found")
        }
        setRegion(regionData)

        // Fetch products
        const {
          response: { products: fetchedProducts, count: fetchedCount },
        } = await listProductsWithSort({
          page,
          queryParams,
          sortBy,
          countryCode,
        })

        // Apply client-side filtering
        let filteredProducts = fetchedProducts

        // Apply search filter
        if (searchTerm) {
          filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }

        // Apply price range filter
        if (priceRange && (priceRange.min > 0 || priceRange.max < 1000)) {
          console.log('Applying price filter:', priceRange)
          const beforeCount = filteredProducts.length
          
          filteredProducts = filteredProducts.filter(product => {
            const cheapestPrice = product.variants?.reduce((min, variant) => {
              const price = variant.calculated_price?.calculated_amount || 0
              return price < min ? price : min
            }, Infinity)
            
            // Convert price from cents to dollars for comparison
            const priceInDollars = cheapestPrice ? cheapestPrice / 100 : 0
            
            const matches = priceInDollars >= priceRange.min && priceInDollars <= priceRange.max
            console.log(`Product ${product.title}: $${priceInDollars} (${priceRange.min}-${priceRange.max}) = ${matches}`)
            
            return matches
          })
          
          console.log(`Price filter: ${beforeCount} -> ${filteredProducts.length} products`)
        }

        setProducts(filteredProducts)
        setCount(filteredProducts.length)
        
        if (onProductCountChange) {
          onProductCountChange(filteredProducts.length)
        }
      } catch (err) {
        console.error("Error fetching products:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch products")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [sortBy, page, collectionId, categoryId, productsIds, countryCode, searchTerm, priceRange, onProductCountChange])

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>
  }

  if (!region) {
    return <div className="text-center py-8">Region not found</div>
  }

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  const gridClasses = viewMode === 'list' 
    ? "grid grid-cols-1 gap-4" 
    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"

  return (
    <>
      <ul
        className={gridClasses}
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview 
                product={p} 
                region={region} 
                viewMode={viewMode}
              />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
