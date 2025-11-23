import Cartitems from "../CartItems/Cartitems.jsx"
import { useContext, useEffect, useState } from "react"
import CartContext from "../../contexts/Cart/cart.contexts.js"

function Cartitemscontainer() {
  const {cartItems} = useContext(CartContext)

  // const [isCartItems , setIsCartItems] = useState(false)

  // useEffect(() => {
  //   if (cartItems && cartItems.length > 0) {
  //     setIsCartItems(true)
  //   }

  // } , [cartItems])

  return (
    <div className="px-2 w-full sm:w-11/12 md:w-[85%] lg:w-[80%] xl:w-[70%] mx-auto lg:px-12 xl:px-16">
        <div className="flex flex-col">
          {
            cartItems.length > 0 ? cartItems.map((cartItem) => (
              <Cartitems key={cartItem.id+cartItem.selectedsize+cartItem.productQuantity} {...cartItem}/>
            ))
            : <p>No Cart Items</p>
          }
        </div>
      </div>
  )
}

export default Cartitemscontainer