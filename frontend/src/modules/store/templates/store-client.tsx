"use client"

import { useState } from "react"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import FilterBar from "@modules/store/components/filter-bar"

import PaginatedProductsClient from "./paginated-products-client"

interface StoreClientProps {
  sortBy: SortOptions
  page: number
  countryCode: string
}

export default function StoreClient({
  sortBy,
  page,
  countryCode,
}: StoreClientProps) {
  // State for filters and view
  const [searchTerm, setSearchTerm] = useState("")
  const [currentSort, setCurrentSort] = useState(sortBy)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [productCount, setProductCount] = useState(0)

  const handleSearchChange = (search: string) => {
    setSearchTerm(search)
  }

  const handleSortChange = (sort: string) => {
    setCurrentSort(sort as SortOptions)
  }

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max })
  }

  const handleViewChange = (view: 'grid' | 'list') => {
    setViewMode(view)
  }

  return (
    <>
      {/* Filter Bar */}
      <FilterBar
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        onPriceRangeChange={handlePriceRangeChange}
        onViewChange={handleViewChange}
        productCount={productCount}
        currentView={viewMode}
        currentSort={currentSort}
      />
      
      <div className="w-full">
        <PaginatedProductsClient
          sortBy={currentSort}
          page={page}
          countryCode={countryCode}
          searchTerm={searchTerm}
          priceRange={priceRange}
          viewMode={viewMode}
          onProductCountChange={setProductCount}
        />
      </div>
    </>
  )
}
