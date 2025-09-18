import { Metadata } from "next"
import { listCategories } from "@lib/data/categories"
import { getRegion } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRight, Grid3X3 } from "lucide-react"

export const metadata: Metadata = {
  title: "Categories | Novanest",
  description: "Browse all product categories and find what you're looking for.",
}

type Props = {
  params: Promise<{ countryCode: string }>
}

export default async function CategoriesPage(props: Props) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)
  const productCategories = await listCategories()

  if (!productCategories || productCategories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200">
        <div className="container-padding">
          <div className="py-16 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Grid3X3 className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">No Categories Found</h1>
            <p className="text-gray-600 mb-8">Check back later for new categories!</p>
            <LocalizedClientLink href="/store" className="btn-primary">
              Browse Products
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    )
  }

  // Filter out child categories and get only parent categories
  const parentCategories = productCategories.filter(category => !category.parent_category)

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200">
      <div className="container-padding">
        <div className="py-6 text-center">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Categories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Browse our product categories and find exactly what you're looking for</p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {parentCategories.map((category) => {
              const children = category.category_children || []
              
              return (
                <div key={category.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                  <LocalizedClientLink href={`/categories/${category.handle}`} className="block group">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black transition">{category.name}</h3>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black transition" />
                      </div>
                      
                      {category.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {category.description}
                        </p>
                      )}
                      
                      {children.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Subcategories</p>
                          <div className="flex flex-wrap gap-1">
                            {children.slice(0, 2).map((child) => (
                              <span 
                                key={child.id}
                                className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                              >
                                {child.name}
                              </span>
                            ))}
                            {children.length > 2 && (
                              <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                +{children.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </LocalizedClientLink>
                </div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Can't find what you're looking for?</h2>
            <p className="text-gray-600 mb-6">Browse all our products to find exactly what you need.</p>
            <LocalizedClientLink href="/store" className="btn-primary inline-flex items-center justify-center mx-auto">
              Browse All Products
              <ArrowRight className="ml-2 w-4 h-4" />
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}
