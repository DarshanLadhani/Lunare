import { useState, useEffect, useContext } from "react";
import { CrossMarkIcon, DownArrowIcon, LeftArrowIcon } from "../../assets";
import axios from "axios";
import SearchProductContext from "../../contexts/Searchproducts/searchproducts.context.js"
import { Loader } from "../../components"

function Productfiltersmobile({ isOpen, onClose, query }) {
    if (!isOpen) return null;

    const [showContent, setShowContent] = useState(false);
    const [GenderTabOpen, setGenderTabOpen] = useState(false);
    const [CategoryTabOpen, setCategoryTabOpen] = useState(false);
    // const [PriceTabOpen, setPriceTabOpen] = useState(false);
    // const [SizeTabOpen, setSizeTabOpen] = useState(false);
    // const [QuickFilterTabOpen, setQuickFilterTabOpen] = useState(false);

    const [selectedGenders, setSelectedGenders] = useState("");
    const [selectedCategory, setSelectedCategory] = useState([]);
    // const [priceRange, setPriceRange] = useState({ min: "", max: "" });

    const { setSearchProducts } = useContext(SearchProductContext);
    const [loading, setLoading] = useState(false)


    const handleCategoryFilters = (e) => {
        const value = e.target.value

        if (selectedCategory.includes(value)) {
            setSelectedCategory(prev => prev.filter(category => category !== value));
        } else {
            setSelectedCategory(prev => [...prev, value])
        }
    }


    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setShowContent(true), 10);
        } else {
            setShowContent(false)
        }
    }, [isOpen]);


    if (!isOpen) return null;

    const clearFilters = () => {
        setSelectedGenders([]);
        setSelectedCategory([]);
        setPriceRange({ min: "", max: "" });
    }

    const applyFilters = async () => {

        const filtersData = {
            gender: selectedGenders,
            category: selectedCategory,
        }

        setLoading(true)
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/products/search?query=${query}`, filtersData);
            if (response.data) {
                setSearchProducts(response.data);
                setShowContent(false);
                setTimeout(onClose, 500);
                setTimeout(() => setLoading(false), 500);
            }
        } catch (error) {
            console.log("Erorr : ", error)
        }

    }

    if (loading) {
        return (
            <Loader message="Appling Filters..." fullscreen />
        )
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-50">
            <div className={`bg-white scrollbar-hidden w-full md:w-1/2 fixed right-0 top-0 lg:w-4/10 xl:w-3/10 h-full py-4 overflow-y-auto transform transition-all duration-500 ease-in-out
                ${showContent ? "translate-y-0 opacity-100 md:translate-x-0" : "translate-y-full opacity-0 md:translate-y-0 md:translate-x-full"}`}>
                <div className="flex justify-between items-center px-4 mb-4">
                    <h3 className="text-xl font-satoshi-bold">Filters</h3>
                    <button onClick={() => { setShowContent(false); setTimeout(onClose, 500); }} className="text-black text-xl cursor-pointer">
                        <img src={CrossMarkIcon} className="w-4" alt="" />
                    </button>
                </div>

                <div className="flex flex-col border-y border-black/20 py-2 transition-all duration-300 overflow-hidden">
                    <div className="flex justify-between px-4 items-center cursor-pointer" onClick={() => setGenderTabOpen((prev) => !prev)}>
                        <p className="font-satoshi-bold text-lg">Gender</p>
                        <img src={DownArrowIcon} className={`w-4 transition-transform duration-300 ${GenderTabOpen ? "rotate-180" : ""}`} alt="" />
                    </div>
                    <div className={`flex flex-col gap-y-2 px-4 overflow-hidden transition-all ease-in-out duration-500 ${GenderTabOpen ? "max-h-40 opacity-100 pt-4" : "max-h-0 opacity-0 pt-0"}`}>
                        {["Men", "Women", "Unisex"].map((gender) => (
                            <label key={gender} className="flex items-center gap-x-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={gender}
                                    checked={selectedGenders === gender}
                                    onChange={(e) => setSelectedGenders(e.target.value)}
                                />
                                {gender}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col border-y border-black/20 py-2 transition-all duration-300 overflow-hidden">
                    <div className="flex justify-between px-4 items-center cursor-pointer" onClick={() => setCategoryTabOpen((prev) => !prev)}>
                        <p className="font-satoshi-bold text-lg">Categories</p>
                        <img src={DownArrowIcon} className={`w-4 transition-transform duration-300 ${CategoryTabOpen ? "rotate-180" : ""}`} alt="" />
                    </div>

                    <div className={`flex flex-col gap-y-2 px-4 overflow-hidden transition-all ease-in-out duration-500 ${CategoryTabOpen ? "max-h-50 opacity-100 pt-4" : "max-h-0 opacity-0 pt-0"}`}>
                        {["Clothing", "Activewear", "Accessories", "Bags", "Footwear"].map((category) => (
                            <label className="flex items-center gap-x-2">
                                <input type="checkbox" value={category} checked={selectedCategory.includes(category)} onChange={handleCategoryFilters} />
                                {category}
                            </label>
                        ))
                        }
                    </div>
                </div>

                {/* <div className="flex flex-col border-y border-black/20 py-2 transition-all duration-300 overflow-hidden">
                    <div className="flex justify-between px-4 items-center cursor-pointer" onClick={() => setPriceTabOpen(prev => !prev)}>
                        <p className="font-satoshi-bold text-lg">Price</p>
                        <img src={DownArrowIcon} className={`w-4 transition-transform duration-300 ${PriceTabOpen ? "rotate-180" : ""}`} alt="" />
                    </div>

                    <div className={`flex flex-col gap-y-2 px-4 overflow-hidden transition-all ease-in-out duration-500 ${PriceTabOpen ? "max-h-40 opacity-100 pt-4" : "max-h-0 opacity-0 pt-0"}`}>
                        <div className="flex gap-x-3 items-center">
                            <input type="text" name="min" value={priceRange.min} onChange={handlePriceChange} placeholder="Min" className="border border-gray-300 w-1/2 p-2 rounded" />
                            <span>-</span>
                            <input type="text" name="max" value={priceRange.max} onChange={handlePriceChange} placeholder="Max" className="border border-gray-300 w-1/2 p-2 rounded" />
                        </div>
                    </div>
                </div> */}
                {/* 
                <div className="flex flex-col border-y border-black/20 py-2 transition-all duration-300 overflow-hidden">
                    <div className="flex justify-between px-4 items-center cursor-pointer" onClick={() => setQuickFilterTabOpen((prev) => !prev)}>
                        <p className="font-satoshi-bold text-lg">Quick Filters</p>
                        <img src={DownArrowIcon} className={`w-4 transition-transform duration-300 ${QuickFilterTabOpen ? "rotate-180" : ""}`} alt="" />
                    </div>

                    <div className={`flex flex-col gap-y-2 px-4 overflow-hidden transition-all ease-in-out duration-500 ${QuickFilterTabOpen ? "max-h-40 opacity-100 pt-4" : "max-h-0 opacity-0 pt-0"}`}>
                        {["On Discount", "Top Selling", "New Arrivals"].map((filter) => (
                            <div key={filter} className="flex justify-between items-center">
                                <span>{filter}</span>
                                <img src={LeftArrowIcon} alt="" />
                            </div>
                        ))}
                    </div>
                </div> */}

                <div className="p-4 flex gap-x-4">
                    <button className="w-1/2 mt-4 py-3 cursor-pointer bg-black text-white font-satoshi-bold" onClick={applyFilters}>
                        Apply
                    </button>
                    <button className="w-1/2 mt-4 py-3 cursor-pointer bg-black text-white font-satoshi-bold" onClick={clearFilters}>
                        Clear
                    </button>
                </div>

            </div>
        </div >
    );
}

export default Productfiltersmobile;
