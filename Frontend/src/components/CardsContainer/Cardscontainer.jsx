import { useRef } from "react";
import Card from "../Card/Card.jsx";
import { ArrowLeftIcon, ArrowRightIcon } from "../../assets/index.js";

function Cardscontainer({ arr, title }) {
    const scrollRefMobile = useRef(null);
    const scrollRefMediumDevices = useRef(null);
    const scrollRefLargeDevices = useRef(null);

    const scroll = (ref, direction) => {
        const container = ref.current;
        if (!container) {
            return
        }
        const scrollAmount = container.clientWidth;
        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        })
    }

    return (
        <div className="py-8 space-y-4 xl:space-y-8 ">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-satoshi-medium text-center">{title}</h1>

            {/* Cards Container for mobile in portrait */}
            <div className="sm:hidden relative w-full mx-auto ">
                <button onClick={() => scroll(scrollRefMobile, "left")} className="absolute left-1.5 top-1/2 px-1 py-1.5 border border-black/60 -translate-y-1/2">
                    <img src={ArrowLeftIcon} className="w-5 opacity-80" alt="" />
                </button>
                <div ref={scrollRefMobile} className="flex w-75 mx-auto overflow-x-auto scrollbar-hidden gap-x-4 snap-x snap-mandatory scroll-smooth">
                    {arr.map((product, idx) => (
                        <div key={idx} className="flex-shrink-0 w-75 snap-center snap-always">
                            <Card product={product} />
                        </div>
                    ))}
                </div>
                <button onClick={() => scroll(scrollRefMobile, "right")} className="absolute right-1.5 top-1/2 px-1 py-1.5 border border-black/60 -translate-y-1/2">
                    <img src={ArrowRightIcon} className="w-5 opacity-80" alt="" />
                </button>
            </div>

            <div className="sm:hidden flex justify-center">
                <button className="border-2 font-satoshi-medium border-black/60 w-auto px-6 py-2">View All</button>
            </div>
            
            {/* Cards Container for small & medium devices in portrait */}

            <div className="hidden relative sm:block  lg:hidden px-4 ">
                <button onClick={() => scroll(scrollRefMediumDevices, "left")} className="absolute sm:left-2 md:left-2.5 top-1/2 px-1.5 py-2 md:p-2 border border-black/60 -translate-y-1/2">
                    <img src={ArrowLeftIcon} className="w-5 opacity-80" alt="" />
                </button>
                <div ref={scrollRefMediumDevices} className="flex w-11/12 mx-auto overflow-x-auto scrollbar-hidden snap-x snap-mandatory scroll-smooth gap-x-4">
                    {Array.from({ length: Math.ceil(arr.length / 3) }).map((_, groupIdx) => {
                        const group = arr.slice(groupIdx * 3, groupIdx * 3 + 3);
                        return (<div key={groupIdx} className="flex-shrink-0 w-full grid grid-cols-3 gap-x-2 snap-center snap-always">
                            {group.map((product, idx) => (
                                <Card key={idx} product={product} />
                            ))}
                        </div>);
                    }
                    )}
                </div>
                <button onClick={() => scroll(scrollRefMediumDevices, "right")} className="absolute sm:right-2 md:right-2.5  top-1/2 px-1.5 py-2 md:p-2 border border-black/60 -translate-y-1/2">
                    <img src={ArrowRightIcon} className="w-5 opacity-80" alt="" />
                </button>
            </div>

            <div className="hidden  sm:flex lg:hidden justify-center py-2 md:py-4">
                <button className="border-2 font-satoshi-medium border-black/60 w-auto sm:px-4 px-8 py-2">View All</button>
            </div>

            <div className="relative hidden lg:block px-4">
                <button onClick={() => scroll(scrollRefLargeDevices, "left")} className="absolute cursor-pointer left-2 xl:left-4 top-1/2 lg:px-2 lg:py-2.5 xl:px-2.5 xl:py-3  border border-black/60 -translate-y-1/2">
                    <img src={ArrowLeftIcon} className="w-5 md:w-6 opacity-80" alt="" />
                </button>
                <div ref={scrollRefLargeDevices} className="flex w-11/12 mx-auto overflow-x-auto scrollbar-hidden snap-x snap-mandatory scroll-smooth gap-x-4">
                    {Array.from({ length: Math.ceil(arr.length / 4) }).map((_, groupIdx) => {
                        const group = arr.slice(groupIdx * 4, groupIdx * 4 + 4);
                        return (<div key={groupIdx} className="flex-shrink-0 w-full grid grid-cols-4 gap-x-2 snap-center snap-always">
                            {group.map((product, idx) => (
                                <Card key={idx} product={product} />
                            ))}
                        </div>);
                    }
                    )}
                </div>
                <button onClick={() => scroll(scrollRefLargeDevices, "right")} className="absolute cursor-pointer right-2 xl:right-4 top-1/2 lg:px-2 lg:py-2.5 xl:px-2.5 xl:py-3 border border-black/60 -translate-y-1/2">
                    <img src={ArrowRightIcon} className="w-5 md:w-6 opacity-80" alt="" />
                </button>
            </div>

            <div className="hidden  lg:flex justify-center py-4">
                <button className="border-2 font-satoshi-medium border-black/60 w-auto px-8 py-2 cursor-pointer">View All</button>
            </div>

        </div>
    );
}

export default Cardscontainer