import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import NovastoreCTA from "@modules/layout/components/medusa-cta"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white relative small:min-h-screen">
      <div className="h-16 bg-white border-b border-gray-200 shadow-sm">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-gray-700 flex items-center gap-x-2 uppercase flex-1 basis-0 hover:text-black transition"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block txt-compact-plus text-gray-600 hover:text-black transition">
              Back to shopping cart
            </span>
            <span className="mt-px block small:hidden txt-compact-plus text-gray-600 hover:text-black transition">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="txt-compact-xlarge-plus text-gray-900 hover:text-black transition flex items-center space-x-2"
            data-testid="store-link"
          >
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span>Novastore</span>
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
      <div className="py-4 w-full flex items-center justify-center">
        <NovastoreCTA />
      </div>
    </div>
  )
}
