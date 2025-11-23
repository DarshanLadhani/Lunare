import { useState } from "react";
import { useNavigate } from "react-router-dom"

function Card({ product, imagedimensions, brandnameclasses, nameclasses, priceclasses, discountedpriceclasses }) {

  const navigate = useNavigate();
  const [showSecondImage, setShowSecondImage] = useState(false);

  const handleProductDetailsPageRedirect = () => {
    navigate(`/products/${product.id}`, { state: product })
  }

  const handleShowSecondProductImage = () => {
    setShowSecondImage(true);
  }

  const handleCloseSecondProductImage = () => {
    setShowSecondImage(false)
  }

  return (
    <div className="flex justify-center space-y-4">
      <div className="flex flex-col space-y-2 xl:space-y-4">
        <div className="relative">
          <img src={showSecondImage ? product?.imageurls[1] : product?.imageurls[0]} onMouseEnter={() => setShowSecondImage(true)} onMouseLeave={() => setShowSecondImage(false)}
            className={`${imagedimensions ? imagedimensions : 'w-75 h-90 sm:w-45 sm:h-55 md:w-50 md:h-60 lg:w-60 lg:h-70 xl:w-75 xl:h-85'} object-cover cursor-pointer transition-all duration-500 ease-in-out`} onClick={handleProductDetailsPageRedirect} alt="" />
        </div>
        <div className="flex flex-col gap-y-1">
          <h3 className={`font-satoshi-bold ${brandnameclasses ? brandnameclasses : 'text-xl sm:text-lg lg:text-xl text-center'}`}>{product?.brand}</h3>
          <p className={`font-satoshi-medium text-gray-700 ${nameclasses ? nameclasses : 'text-base sm:text-sm xl:text-base text-center'}`}>{product?.name}</p>
          {product.discountedprice ?
            <div className={`${discountedpriceclasses ? 'justify-center' : 'text-lg sm:text-base xl:text-xl justify-center'} flex gap-x-2 flex-wrap items-center`}>
              <p className={`font-satoshi-regular text-black/60 line-through ${discountedpriceclasses ? 'text-sm xl:text-base' : 'text-sm sm:text-base'}`}>₹ {product?.price?.toLocaleString("en-IN")}</p>
              <p className={`font-satoshi-bold text-black ${discountedpriceclasses ? 'text-base xl:text-lg' : ''}`}>₹ {product?.discountedprice?.toLocaleString("en-IN")}</p>
              <p className={`rounded-full font-satoshi-regular ${discountedpriceclasses ? 'text-base xl:text-lg' : ''}`}>(-{Math.round(((product.price - product.discountedprice) / product.price) * 100, 2)}%)</p>
            </div>
            : <p className={`font-satoshi-bold text-black ${priceclasses ? priceclasses : 'text-lg sm:text-base xl:text-xl text-center'}`}>₹ {product?.price?.toLocaleString("en-IN")}</p>
          }
        </div>
      </div>
    </div>
  );
}

export default Card;
