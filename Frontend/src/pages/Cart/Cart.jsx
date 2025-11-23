import { useContext, useEffect, useState } from "react";
import { Cartitemscontainer, OrderSummary } from "../../components";
import { ArrowRightIcon, MensCollectionImage, WomenCollectionImage, FootWearCollectionImage, ChanelAccessoriesImage } from "../../assets";
import CartContext from "../../contexts/Cart/cart.contexts.js";
import {Loader} from "../../components";

function Cart() {
  const { cartItems } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); 
    return () => clearTimeout(timer);
  }, [cartItems]);

  const collectionsCards = [
    { name: "Men's collection", imageUrl: MensCollectionImage },
    { name: "Women's collection", imageUrl: WomenCollectionImage },
    { name: "Designer Footwear", imageUrl: FootWearCollectionImage },
    { name: "Luxury Accessories", imageUrl: ChanelAccessoriesImage },
  ];

  if (loading) {
    return (
      <Loader message = "Loading your shopping bag..." fullscreen/>
    );
  }

  return (
    cartItems.length > 0 ? (
      <div className="flex flex-col gap-y-4 lg:gap-y-6 xl:gap-y-8 py-4 lg:py-6 xl:py-8">
        <div className="flex items-center justify-between px-2 sm:mx-auto sm:w-11/12 md:w-[85%] lg:w-[75%] xl:w-[70%] lg:px-12 xl:px-16">
          <h1 className="font-satoshi-bold text-xl md:text-2xl xl:text-3xl text-center">
            SHOPPING BAG
          </h1>
        </div>
        <div className="flex flex-col gap-y-4 lg:gap-y-6 xl:gap-y-8 ">
          <Cartitemscontainer />
          <OrderSummary />
        </div>
      </div>
    ) : (
      <div className="flex flex-col gap-y-6 py-8 lg:py-12 xl:py-16">
        <div className="flex flex-col items-center justify-center gap-y-4 px-4 sm:mx-auto sm:w-11/12 md:w-[85%] lg:w-[75%] xl:w-[70%] lg:px-12 xl:px-16">
          <h1 className="font-satoshi-bold text-xl md:text-2xl xl:text-3xl text-center">
            Your Shopping Bag Is Empty
          </h1>
          <p className="font-satoshi-regular text-black/60 text-sm sm:text-base text-center lg:text-lg">
            Looks like you haven’t added anything yet. Explore our latest collections and find something you’ll love.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 place-items-center px-4 gap-4 sm:mx-auto sm:w-11/12 md:w-[85%] lg:w-[80%] xl:w-[70%] lg:px-12 xl:px-16">
          {collectionsCards.map((collection, idx) => (
            <div key={idx} className="space-y-2 w-full flex flex-col items-center ">
              <img
                src={collection.imageUrl}
                className="w-35 h-50 md:w-40 md:h-55 lg:w-45 lg:h-60 xl:w-50 xl:h-65 object-cover"
                alt=""
              />
              <p className="font-satoshi-medium text-center text-sm sm:text-sm lg:text-lg xl:text-xl">
                {collection.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default Cart;
