"use client"

import { useState } from "react"
import { Search, Grid3X3, List, Filter } from "lucide-react"

interface FilterBarProps {
  onSearchChange: (search: string) => void
  onSortChange: (sort: string) => void
  onPriceRangeChange: (min: number, max: number) => void
  onViewChange: (view: 'grid' | 'list') => void
  productCount: number
  currentView: 'grid' | 'list'
  currentSort: string
}

export default function FilterBar({
  onSearchChange,
  onSortChange,
  onPriceRangeChange,
  onViewChange,
  productCount,
  currentView,
  currentSort
}: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearchChange(value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value)
  }

  const handlePriceChange = () => {
    const min = minPrice ? parseFloat(minPrice) : 0
    const max = maxPrice ? parseFloat(maxPrice) : 1000
    onPriceRangeChange(min, max)
  }

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value)
    const min = e.target.value ? parseFloat(e.target.value) : 0
    const max = maxPrice ? parseFloat(maxPrice) : 1000
    console.log('Min price changed:', { min, max })
    onPriceRangeChange(min, max)
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value)
    const min = minPrice ? parseFloat(minPrice) : 0
    const max = e.target.value ? parseFloat(e.target.value) : 1000
    console.log('Max price changed:', { min, max })
    onPriceRangeChange(min, max)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setMinPrice("")
    setMaxPrice("")
    onSearchChange("")
    onPriceRangeChange(0, 1000)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            />
          </div>

          {/* Sort Dropdown */}
          <select
            value={currentSort}
            onChange={handleSortChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-white"
          >
            <option value="created_at">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name_asc">Name: A to Z</option>
            <option value="name_desc">Name: Z to A</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Price:</span>
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-black focus:border-transparent outline-none"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="1000"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-black focus:border-transparent outline-none"
          />
          <button
            onClick={handlePriceChange}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm transition"
          >
            Apply
          </button>
        </div>

        {/* View Toggle and Clear */}
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => onViewChange('grid')}
              className={`p-2 transition ${
                currentView === 'grid' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewChange('list')}
              className={`p-2 transition ${
                currentView === 'list' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="px-3 py-2 text-sm text-gray-600 hover:text-black transition"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Results Count and Active Filters */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {productCount} {productCount === 1 ? 'product' : 'products'} found
          </p>
          {(minPrice || maxPrice) && (
            <div className="text-sm text-gray-500">
              Price: ${minPrice || '0'} - ${maxPrice || '1000'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
