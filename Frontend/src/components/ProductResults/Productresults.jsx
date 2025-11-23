import { useContext, useState, useEffect } from "react";
import SearchProductContext from "../../contexts/Searchproducts/searchproducts.context.js";
import { FilterIcon } from "../../assets";
import Card from "../Card/Card.jsx";
import ProductFiltersMobile from "../ProductFiltersMobile/Productfiltersmobile.jsx";
import { Loader } from "../../components";

const defaultproducts = [
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageurls: ["https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$"] },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageurls: ["https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$"] },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageurls: ["https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$"] },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageurls: ["https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$"] },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageurls: ["https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$"] },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageurls: ["https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$"] },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageurls: ["https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$"] },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageurls: ["https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$"] },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageurls: ["https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$"] },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageurls: ["https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$"] },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageurls: ["https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$"] },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageurls: ["https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$"] },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageurls: ["https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$"] },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageurls: ["https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$"] },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageurls: ["https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$"] },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageurls: ["https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$"] },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageurls: ["https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg"] },
];


function Productresults({ query }) {

    const { searchproducts } = useContext(SearchProductContext);
    const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(36);
    const [loading, setLoading] = useState(false)

    const allProducts = searchproducts

    const visibleProducts = allProducts.slice(0, visibleCount);
    const hasMore = visibleCount < allProducts.length;

    const handleSeeMore = () => {
        setLoading(true)
        setTimeout(() => {
            setVisibleCount((prev) => prev + 36)
            setTimeout(()=>setLoading(false) , 200)
        }, 800);
    }

    useEffect(() => {
        if (isMobileFilterOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }

    }, [isMobileFilterOpen])

    return (
        <div className="w-full space-y-4">
            <div className="flex w-full z-40 sticky justify-between top-16 px-2 py-4 lg:px-8 border-b bg-white border-black/20 items-center">
                <p className="text-center font-satoshi-medium text-sm md:text-base lg:text-lg px-2">{allProducts?.length} Results for "{query}"</p>
                <button className="px-2 cursor-pointer flex justify-center font-satoshi-medium lg:text-lg xl:text-xl" onClick={() => setMobileFilterOpen(true)}>
                    <img src={FilterIcon} className="opacity-80 mr-2 w-4 xl:w-5" alt="" />
                    <span>FILTER & SORT</span>
                </button>
            </div>
            <div className="w-full flex flex-col space-y-4 mb-4 xl:mb-8">
                <div className="flex flex-col  items-center space-y-4 md:mt-2">
                    <div className="grid grid-cols-2 px-2 gap-4 md:gap-x-2 md:gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:gap-6 xl:gap-10">
                        {
                            visibleProducts.map((product, idx) => (
                                <div>
                                    <Card key={product.id} product={product} imagedimensions={"w-50 h-55 lg:w-60 lg:h-65 xl:w-75 xl:h-85"} brandnameclasses={'text-base lg:text-lg md:text-center xl:text-xl'} nameclasses={'text-[12px] lg:text-sm xl:text-base md:text-center'} priceclasses={'text-base md:text-center xl:text-lg'} discountedpriceclasses={true} />
                                </div>
                            ))
                        }

                    </div>
                    {loading ? (
                        <div className="py-4">
                            <Loader message="Fetching more products..." />
                        </div>
                    ) : (hasMore ? 
                        <button onClick={handleSeeMore} className="border-2 mt-2 lg:mt-4 font-satoshi-medium border-black/60 w-auto px-4 lg:px-8 py-2 cursor-pointer">
                            See More
                        </button>
                        : <p className="text-black/60 text-base md:text-lg lg:text-xl lg:py-6 xl:text-2xl py-4">No more products left</p>
                    )}

                </div>
                <ProductFiltersMobile query={query} isOpen={isMobileFilterOpen} onClose={() => setMobileFilterOpen(false)} />
            </div>
        </div>

    )
}

export default Productresults