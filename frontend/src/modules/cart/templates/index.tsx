import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200">
      <div className="container-padding">
        <div className="py-8">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-gray-600">Review your items and proceed to checkout</p>
        </div>
        
        <div className="content-container bg-white rounded-xl shadow-sm" data-testid="cart-container">
          {cart?.items?.length ? (
            <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-x-40 p-6">
              <div className="flex flex-col gap-y-6">
                {!customer && (
                  <>
                    <SignInPrompt />
                    <Divider />
                  </>
                )}
                <ItemsTemplate cart={cart} />
              </div>
              <div className="relative">
                <div className="flex flex-col gap-y-8 sticky top-12">
                  {cart && cart.region && (
                    <>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <Summary cart={cart as any} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <EmptyCartMessage />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartTemplate
