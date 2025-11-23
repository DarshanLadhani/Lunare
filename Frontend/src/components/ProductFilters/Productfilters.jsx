import { FilterIcon , DownArrowIcon , LeftArrowIcon } from "../../assets";

function Productfilters() {
    return (
        <div className="w-3/10 lg:w-1/4 h-fit hidden md:flex flex-col px-2 xl:px-4 space-y-4 xl:space-y-6 border-2 border-black/60 rounded-lg">
            <div className="flex justify-between border-b py-4 items-center">
                <p className="text-black font-satoshi-bold text-xl xl:text-2xl">Filters</p>
                <img src={FilterIcon} className="w-8" alt="" />
            </div>
            <div className="flex flex-col border-b">
                <div className="flex justify-between items-center">
                    <p className="text-black font-satoshi-bold text-xl">Gender</p>
                    <img src={DownArrowIcon} className="w-4" alt="" />
                </div>
                <div className="flex flex-col py-4 items-start gap-y-2 xl:text-lg">
                    <div className="flex items-center gap-x-2">
                        <input type="checkbox" name="" id="" />
                        <span>Men</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <input type="checkbox" name="" id="" />
                        <span>Women</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col border-b">
                <div className="flex justify-between items-center">
                    <p className="text-black font-satoshi-bold text-xl">Categories</p>
                    <img src={DownArrowIcon} className="w-4" alt="" />
                </div>
                <div className="flex flex-col py-4 items-start gap-y-2 xl:text-lg">
                    <div className="flex items-center gap-x-2">
                        <input type="checkbox" name="" id="" />
                        <span>Casual Wear</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <input type="checkbox" name="" id="" />
                        <span>Western Wear</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <input type="checkbox" name="" id="" />
                        <span>Active Wear</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col border-b">
                <div className="flex justify-between items-center">
                    <p className="text-black font-satoshi-bold text-xl">Price</p>
                    <img src={DownArrowIcon} className="w-4" alt="" />
                </div>
                <div className="py-4">
                    <input type="range" className="w-full" name="" id="" />
                </div>
            </div>
            <div className="flex flex-col border-b">
                <div className="flex justify-between items-center">
                    <p className="text-black font-satoshi-bold text-xl">Size</p>
                    <img src={DownArrowIcon} className="w-4" alt="" />
                </div>
                <div className="py-4 flex gap-2 flex-wrap xl:text-lg">
                    <button className="p-2 border-2 rounded-full w-12 h-12 text-center">XS</button>
                    <button className="p-2 border-2 rounded-full w-12 h-12 text-center">S</button>
                    <button className="p-2 border-2 rounded-full w-12 h-12 text-center">M</button>
                    <button className="p-2 border-2 rounded-full w-12 h-12 text-center">L</button>
                    <button className="p-2 border-2 rounded-full w-12 h-12 text-center">XL</button>
                    <button className="p-2 border-2 rounded-full w-12 h-12 text-center">XXL</button>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <p className="text-black font-satoshi-bold text-xl">Quick Filters</p>
                    <img src={DownArrowIcon} className="w-4" alt="" />
                </div>
                <div className="flex flex-col pt-4 pr-4 items-start gap-y-2 xl:text-lg">
                    <div className="flex items-center justify-between w-full gap-x-2">
                        <span>On Discount</span>
                        <img src={LeftArrowIcon} alt="" />
                    </div>
                    <div className="flex items-center  justify-between w-full gap-x-2">
                        <span>On Sale</span>
                        <img src={LeftArrowIcon} alt="" />
                    </div>
                    <div className="flex items-center  justify-between w-full  gap-x-2">
                        <span>Top Selling</span>
                        <img src={LeftArrowIcon} alt="" />
                    </div>
                    <div className="flex items-center  justify-between w-full gap-x-2">
                        <span>New Arrivals</span>
                        <img src={LeftArrowIcon} alt="" />
                    </div>
                </div>
            </div>
            <button className="bg-black px-4 py-2 text-white rounded-full mb-4 xl:text-lg xl:mb-6">Apply Filters</button>
        </div>
    )
}

export default Productfilters