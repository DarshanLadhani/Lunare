import { MensCollectionImage, WomenCollectionImage, FootWearCollectionImage, ChanelAccessoriesImage } from "../../assets";
import { Link } from "react-router-dom";

export const shopByCategory = [
  {
    name: "Men's collection",
    imageUrl: MensCollectionImage
  },
  {
    name: "Women's collection",
    imageUrl: WomenCollectionImage
  },
  {
    name: "Designer Footwear",
    imageUrl: FootWearCollectionImage
  },
  {
    name: "Luxury Accessories",
    imageUrl: ChanelAccessoriesImage
  },
];

function ShopByCategory() {
  return (
    <div className="py-8 mx-4 space-y-6 xl:space-y-8">
      <h1 className="text-2xl lg:text-3xl xl:text-4xl font-satoshi-medium text-center">CURATED FOR YOU</h1>
      <div className="">
        <div className="flex flex-col sm:flex-row flex-wrap">
          {
            shopByCategory.map((category, idx) => (
              <div key={idx} className="flex flex-col sm:w-1/4  relative items-center gap-y-2 ">
                <img src={category.imageUrl} className="w-full h-[500px] sm:h-[250px] lg:h-[400px] xl:h-[500px] object-cover" alt="" />
                <div className="absolute z-10 bottom-2 w-full text-white text-center">
                  <p
                    className="font-satoshi-bold text-xl sm:text-sm md:text-base lg:text-xl xl:text-2xl"
                    style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.8)" }}
                  >
                    {category.name}
                  </p>
                  <Link>
                    <button
                      className="underline cursor-pointer font-satoshi-medium sm:text-[12px] md:text-sm lg:text-lg xl:text-xl"
                      style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)" }}
                    >
                      Explore
                    </button>
                  </Link>
                </div>

                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ShopByCategory;
