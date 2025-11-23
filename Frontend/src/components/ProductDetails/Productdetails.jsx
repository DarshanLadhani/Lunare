import { useRef, useEffect, useState, useContext } from "react";
import CartContext from "../../contexts/Cart/cart.contexts.js";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, ArrowUpRightIcon, DownArrowIcon, ShoppingBagIcon } from "../../assets/index.js";
import { Loader } from "../../components"


// const product = { brand: 'Ralph Lauren', name: 'The Iconic Rugby Shirt', price: 19500, imageurl: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-AI710717116051_alternate10?$rl_4x5_pdp$", description: "A stylish and versatile women’s jacket crafted for comfort and elegance. Perfect for layering in all seasons, offering a sleek look with durable quality.", sizes: ["M", "L"] }

function Productdetails({ product }) {

  const scrollRefSmallDevices = useRef(null);
  const scrollRefLargeDevices = useRef(null);
  const [smallDeviceActiveIndex, setSmallDeviceActiveIndex] = useState(0);
  const [largeDeviceActiveIndex, setLargeDeviceActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [productInCart, setProductInCart] = useState(false)
  const [error, setError] = useState("")
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [showDescription, setShowDescription] = useState(false);
  const [scrollActive, setScrollActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const goToCart = () => {
    navigate("/cart");
  }

  const handleSelectSize = (e) => {
    const size = e.target.value;
    setSelectedSize(size)
  }

  const handleAddToCart = async () => {
    try {
      if (product?.sizes?.length > 0 && selectedSize === "") {
        setError("Please select size.")
        setShowError(true)
        return;
      }

      setLoading(true)

      const cart_product_data = {
        product_id: product.id,
        name: product.name,
        brand: product.brand,
        price: parseFloat(product.price),
        discountedprice: product.discountedprice ? parseFloat(product.discountedprice) : 0,
        color: product.color,
        imageurl: product.imageurls[0],
        quantity: product.quantity,
        selectedsize: selectedSize,
      }

      const response = await addToCart(cart_product_data);

      if (response.success) {
        setProductInCart(true)
        setTimeout(() => setLoading(false), 500)
      }

      if (!response.success) {
        setError(response.message)
        setShowError(true)
      }

    } catch (error) {
      console.log("Erorr : ", error)
    }
  }


  useEffect(() => {
    const element = scrollRefSmallDevices.current;

    const handleScroll = () => {
      if (!element) return;
      const scrollLeft = element.scrollLeft;
      const imageWidth = element.clientWidth;
      const index = Math.round(scrollLeft / imageWidth);
      setSmallDeviceActiveIndex(index);
    };

    element?.addEventListener("scroll", handleScroll);
    return () => element?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const element = scrollRefLargeDevices.current;

    const handleScroll = () => {
      if (!element) return;
      const scrollY = element.scrollTop;
      const imageHeight = element.clientHeight;
      const index = Math.round(scrollY / imageHeight);
      setLargeDeviceActiveIndex(index);
    };

    element?.addEventListener("scroll", handleScroll);
    return () => element?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setError("")
        setShowError(false)
      }, 3000);
    }
  }, [error])


  // useEffect(() => {
  //   if (showDescription) {
  //     const timer = setTimeout(() => setScrollActive(true), 400);
  //     return () => clearTimeout(timer);
  //   } else {
  //     setScrollActive(false);
  //   }
  // }, [showDescription]);

  if (loading) {
    return (
      <Loader message="Adding product to bag..." fullscreen />
    );
  }

  console.log(product.description)


  return (
    <div className="flex flex-col mb-20">
      <div className="flex flex-col sm:pb-10 gap-y-10  sm:gap-y-0 sm:flex-row  sm:gap-x-4 lg:gap-x-6 xl:gap-x-8 sm:items-start">
        <div className="w-full h-[500px] relative space-y-4 sm:w-80 sm:h-[430px] md:w-90 md:h-[500px] lg:w-[45%] xl:w-[40%] lg:h-[650px] xl:h-[700px]">
          <div ref={scrollRefSmallDevices} className="flex min-w-full min-h-full overflow-x-auto scrollbar-hidden snap-x snap-mandatory scroll-smooth lg:hidden">
            {product?.imageurls?.map((img) => (
              <img src={img} key={img} className="min-h-full min-w-full object-cover snap-center snap-always" alt="" />
            ))
            }
          </div>
          <div className="flex justify-center mt-1 gap-x-2 lg:hidden">
            {product?.imageurls?.map((_, idx) => (
              <span key={idx} className={`w-2 h-2 rounded-full ${smallDeviceActiveIndex === idx ? "bg-black" : "bg-gray-300"}`} />
            ))}
          </div>
          <div ref={scrollRefLargeDevices} className="hidden lg:flex min-w-full min-h-full lg:h-[650px] overflow-x-auto scrollbar-hidden snap-x snap-mandatory scroll-smooth lg:flex-col lg:overflow-y-auto lg:snap-none lg:snap-y">
            {product?.imageurls?.map((img) => (
              <img src={img} key={img} className="min-h-full min-w-full object-cover snap-center snap-always" alt="" />
            ))
            }
          </div>
          <div className="hidden lg:flex absolute flex-col bg-white gap-y-2 p-2 -top-1 rounded-br-xl ">
            {product?.imageurls?.map((_, idx) => (
              <span key={idx} className={`w-3 h-3 rounded-full ${largeDeviceActiveIndex === idx ? "bg-black" : "border"}`} />
            ))}
          </div>
        </div>
        <div className="flex flex-col px-4 sm:p-4 md:p-4 lg:p-8 xl:px-12 sm:flex-1 sm:h-[430px] md:h-[500px] lg:h-[650px] xl:h-[700px] gap-y-2 xl:gap-y-3">
          <h3 className="font-satoshi-bold text-xl lg:text-2xl">{product?.brand}</h3>
          <p className="font-satoshi-medium lg:text-lg xl:text-xl">{product?.name}</p>
          {
            product.discountedprice ?
              <div className="md:text-lg lg:text-xl xl:text-2xl flex gap-x-2 items-center">
                <p className="font-satoshi-regular text-black/60 line-through text-sm md:text-base xl:text-xl">₹ {product?.price?.toLocaleString("en-IN")}</p>
                <p className="font-satoshi-bold text-black">₹ {product?.discountedprice?.toLocaleString("en-IN")}</p>
                <p className="rounded-full font-satoshi-regular">(-{Math.round(((product.price - product.discountedprice) / product.price) * 100, 2)}%)</p>
              </div>
              : < p className="font-satoshi-bold md:text-lg lg:text-xl xl:text-2xl text-black">₹ {product?.price?.toLocaleString("en-IN")}</p>
          }
          <div className="py-2 lg:py-4 border-b font-satoshi-medium text-sm md:text-base lg:text-lg xl:text-xl">
            <div className="flex flex-col gap-y-3 lg:gap-y-4 xl:gap-y-6 font-satoshi-medium text-sm md:text-base lg:text-lg xl:text-xl">
              <div>
                <button onClick={() => setShowDescription((prev) => !prev)} className="w-full cursor-pointer flex justify-between items-center text-left text-black/80 hover:text-black transition-colors">
                  <span>Product Description</span>
                  <img src={DownArrowIcon} className={`w-4 h-4 lg:w-5 lg:h-5 transition-all duration-500 ${showDescription ? 'rotate-180' : 'rotate-0'}`} alt="" />
                </button>
                <div className={`transition-all duration-500 ease-in-out overflow-y-auto scrollbar-hidden ${scrollActive ? "overflow-y-auto" : "overflow-hidden scrollbar-hidden"} ${showDescription ? "max-h-65 border-y py-2  sm:max-h-30 md:max-h-35 lg:max-h-55 xl:max-h-60 opacity-100 mt-2 xl:mt-4" : "max-h-0 opacity-0 py-0 m-0 border-0"}`}>
                  <p className="text-justify whitespace-pre-line text-black/60">
                    {product?.description || "No description available."}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-y-2 md:flex-row md:gap-y-0 md:gap-x-6">
                <p>
                  <span>Color : </span>
                  <span className="text-black/60">{product?.color}</span>
                </p>
                <p>
                  <span>Material : </span>
                  <span className="text-black/60">{product?.material}</span>
                </p>
              </div>
            </div>
          </div>
          {
            product?.sizes?.length > 0 &&
            <div className="flex w-full flex-col gap-y-4 xl:gap-y-6 border-b pb-4 xl:pb-6">
              <p className="text-sm text-black/60 lg:text-base xl:text-xl">Choose Size</p>
              <div className="flex gap-2 text-sm md:text-base xl:text-lg flex-wrap">
                {
                  product?.sizes && product?.sizes.map((size) => (
                    <button key={size} disabled={productInCart} onClick={handleSelectSize} value={size} className={`border cursor-pointer transition-all duration-200 border-black/60 w-10 h-10 md:w-12 md:h-12 text-center ${selectedSize === size ? 'bg-black text-white' : ''}`}>{size}</button>
                  ))
                }
              </div>
              {
                showError &&
                <p className={`text-red-600`}>{error}</p>
              }
            </div>
          }
          <div className="w-full flex py-2 font-satoshi-medium">
            {
              productInCart ?
                <button onClick={goToCart} className="border cursor-pointer border-black/60 w-full lg:text-lg lg:w-5/10 xl:w-4/10 xl:text-xl px-4 py-2 flex justify-center items-center gap-x-2">
                  <span>Go to bag</span>
                  <img src={ArrowRightIcon} className="w-5 h-5 opacity-80" alt="" />
                </button>
                : <button onClick={handleAddToCart} className="border cursor-pointer border-black/60 w-full lg:text-lg lg:w-5/10 xl:w-4/10 xl:text-xl px-4 py-2 flex justify-center items-center gap-x-2">
                  <span>Add to bag</span>
                  <img src={ShoppingBagIcon} className="w-5 h-5" alt="" />
                </button>
            }
          </div>
        </div>
      </div>
    </div >
  )
}

export default Productdetails