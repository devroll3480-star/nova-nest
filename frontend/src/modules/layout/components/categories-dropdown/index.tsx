"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface CategoriesDropdownProps {
  categories: HttpTypes.StoreProductCategory[]
}

export default function CategoriesDropdown({ categories }: CategoriesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const parentCategories = categories.filter(category => !category.parent_category)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="flex items-center space-x-1 text-gray-300 hover:text-white transition font-medium"
      >
        <span>Categories</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {parentCategories.map((category) => {
            const children = category.category_children || []
            
            return (
              <div key={category.id} className="px-4 py-2 hover:bg-gray-50">
                <LocalizedClientLink
                  href={`/categories/${category.handle}`}
                  className="block text-gray-900 font-medium hover:text-black transition"
                >
                  {category.name}
                </LocalizedClientLink>
                
                {children.length > 0 && (
                  <div className="mt-1 space-y-1">
                    {children.slice(0, 3).map((child) => (
                      <LocalizedClientLink
                        key={child.id}
                        href={`/categories/${child.handle}`}
                        className="block text-sm text-gray-600 hover:text-gray-900 transition pl-4"
                      >
                        {child.name}
                      </LocalizedClientLink>
                    ))}
                    {children.length > 3 && (
                      <span className="block text-xs text-gray-500 pl-4">
                        +{children.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            )
          })}
          
          <div className="border-t border-gray-200 mt-2 pt-2">
            <LocalizedClientLink
              href="/categories"
              className="block px-4 py-2 text-gray-900 font-medium hover:text-black transition"
            >
              View All Categories
            </LocalizedClientLink>
          </div>
        </div>
      )}
    </div>
  )
}
