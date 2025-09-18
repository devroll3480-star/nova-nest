import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreClient from "./store-client"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200">
      <div className="container-padding">
        <div className="py-8">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-gray-900 mb-2">All Products</h1>
            <p className="text-gray-600">Discover our complete collection of amazing products</p>
          </div>
        </div>
        
        <div className="w-full">
          <StoreClient
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
          />
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
