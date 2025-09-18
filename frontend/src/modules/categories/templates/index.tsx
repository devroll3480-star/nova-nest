import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200">
      <div className="container-padding">
        <div className="py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <LocalizedClientLink href="/" className="hover:text-black transition">
              Home
            </LocalizedClientLink>
            <span>/</span>
            <LocalizedClientLink href="/categories" className="hover:text-black transition">
              Categories
            </LocalizedClientLink>
            {parents &&
              parents.map((parent) => (
                <span key={parent.id} className="flex items-center">
                  <span>/</span>
                  <LocalizedClientLink
                    className="ml-2 hover:text-black transition"
                    href={`/categories/${parent.handle}`}
                    data-testid="sort-by-link"
                  >
                    {parent.name}
                  </LocalizedClientLink>
                </span>
              ))}
            <span>/</span>
            <span className="text-gray-900 font-medium">{category.name}</span>
          </nav>

          <h1 className="text-4xl font-semibold text-gray-900 mb-4" data-testid="category-page-title">
            {category.name}
          </h1>
          
          {category.description && (
            <p className="text-gray-600 mb-8 max-w-3xl">
              {category.description}
            </p>
          )}

          {category.category_children && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Subcategories</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.category_children?.map((c) => (
                  <LocalizedClientLink
                    key={c.id}
                    href={`/categories/${c.handle}`}
                    className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow text-center"
                  >
                    <span className="text-gray-900 font-medium">{c.name}</span>
                  </LocalizedClientLink>
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          className="flex flex-col small:flex-row small:items-start py-6 content-container bg-white rounded-xl shadow-sm"
          data-testid="category-container"
        >
          <RefinementList sortBy={sort} data-testid="sort-by-container" />
          <div className="w-full">
            <Suspense
              fallback={
                <SkeletonProductGrid
                  numberOfProducts={category.products?.length ?? 8}
                />
              }
            >
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                categoryId={category.id}
                countryCode={countryCode}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
