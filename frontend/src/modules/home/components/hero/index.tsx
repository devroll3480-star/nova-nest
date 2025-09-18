import { ArrowRight, Star, Truck, Shield, RotateCcw } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight">
              Discover Amazing
              <span className="block text-black">Products</span>
            </h1>
            
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Shop the latest trends and find everything you need in one place. 
              Fast shipping, secure payments, and exceptional customer service.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <LocalizedClientLink href="/store" className="btn-primary inline-flex items-center justify-center">
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </LocalizedClientLink>
              <LocalizedClientLink href="/categories" className="btn-secondary inline-flex items-center justify-center">
                Browse Categories
              </LocalizedClientLink>
            </div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                <p className="text-xs text-gray-500">On orders over $50</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                <p className="text-xs text-gray-500">100% protected</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-2">
                  <RotateCcw className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                <p className="text-xs text-gray-500">30-day policy</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-900">Top Rated</p>
                <p className="text-xs text-gray-500">4.9/5 stars</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden relative">
                  {/* Unsplash Hero Image */}
                  <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Modern shopping experience"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay with NovaNest branding */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-24 h-24 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white border-opacity-30">
                        <span className="text-white text-2xl font-bold">N</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Novanest</h3>
                      <p className="text-white text-opacity-90">Your trusted shopping destination</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-300 rounded-full opacity-20" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-400 rounded-full opacity-10" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
