import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom'
import { SearchIcon, BarsIcon, ShoppingBagIcon, PlusIcon, CrossMarkIcon, ArrowRightIcon, LeftArrowIcon } from '../../assets'
import { useState, useEffect, useContext } from 'react'
import CartContext from '../../contexts/Cart/cart.contexts.js'


function Navbar() {
    const [searchShow, setSearchShow] = useState(false)
    const [menuShow, setMenuShow] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");
    const {cartItems} = useContext(CartContext);
    const [cartItemsTotal , setCartItemsTotal] = useState(0);
    const navigate = useNavigate();

    const handleSearchQuery = () => {
        navigate(`/products?query=${searchQuery}`)
    }

    const toggleSearchShow = () => {
        setSearchShow((prev) => !prev)
    }

    const handleSearchShowClosing = () => {
        if (searchQuery) {
            setSearchQuery("")
        }
        toggleSearchShow()
    }

    useEffect(() => {
        if (menuShow) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menuShow]);

    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            setCartItemsTotal(cartItems.length);
            return;
        }

        setCartItemsTotal(0)
    } , [cartItems])


    return (
        <nav className="bg-white h-full border-b border-black/20">
            <div className="flex items-center justify-between py-4 relative px-4 lg:px-8">
                <div className="flex items-center gap-x-3 lg:gap-x-6  min-w-fit">
                    <button onClick={() => setMenuShow((prev) => !prev)} className='lg:hidden cursor-pointer'>
                        <img src={BarsIcon} className="h-5 md:h-5.5" alt="Bars Icon" />
                    </button>
                    <button onClick={searchQuery.length > 0 ? handleSearchQuery : toggleSearchShow} className='lg:hidden cursor-pointer'>
                        <img src={SearchIcon} className="h-6 md:h-6.5" alt="Search Icon" />
                    </button>
                    <Link to="/" className='hidden lg:block'>
                        <h1 className="text-3xl font-satoshi-medium text-center">LUNARE</h1>
                    </Link>
                </div>

                <div className="relative w-full flex justify-center items-center overflow-hidden mx-2 md:mx-4">
                    <div className={`absolute lg:hidden transition-all duration-500 ease-in-out ${searchShow ? 'opacity-0 scale-90 translate-y-2' : 'opacity-100 scale-100 translate-y-0'}`}>
                        <Link to="/">
                            <h1 className="text-2xl font-satoshi-medium  text-center">LUNARE</h1>
                        </Link>
                    </div>
                    <div className={`hidden absolute lg:block transition-all duration-500 ease-in-out ${searchShow ? 'opacity-0 scale-90 translate-y-2' : 'opacity-100 scale-100 translate-y-0'}`}>
                        <ul className='flex items-cente gap-x-6 font-satoshi-medium xl:gap-x-8 text-sm'>
                            <NavLink>
                                <li>CLOTHING</li>
                            </NavLink>
                            <NavLink>
                                <li>SHOES</li>
                            </NavLink>
                            <NavLink>
                                <li>BAGS</li>
                            </NavLink>
                            <NavLink>
                                <li>ACCESSORIES</li>
                            </NavLink>
                            <NavLink>
                                <li>COLLECTIONS</li>
                            </NavLink>
                            <NavLink>
                                <li>NEW ARRIVALS</li>
                            </NavLink>
                        </ul>
                    </div>
                    <div className={`transition-all flex justify-end duration-500 ease-in-out ${searchShow ? 'w-full opacity-100 scale-x-100' : 'w-0 opacity-0 scale-x-0'}`}
                        style={{ transformOrigin: 'right center', }}>
                        <input type="text" placeholder="Search for..." onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} autoComplete='off' className="border-b px-2 py-1 w-full lg:w-1/2 outline-none placeholder:text-black/60 placeholder:xl:text-lg" name='searchquery' />
                        <img src={CrossMarkIcon} className='absolute h-5 lg:h-5.5 right-1 top-1/2 -translate-y-1/2 opacity-60 cursor-pointer' onClick={handleSearchShowClosing} alt="" />
                    </div>
                </div>

                <div className="flex items-center gap-x-3 min-w-fit">
                    <button onClick={searchQuery.length > 0 ? handleSearchQuery : toggleSearchShow} className='hidden lg:block cursor-pointer'>
                        <img src={SearchIcon} className="h-6 md:h-6.5 lg:h-7" alt="Search Icon" />
                    </button>
                    <Link to="/cart">
                        <div className='relative'>
                            <img src={ShoppingBagIcon} className="h-6 relative md:h-6.5 lg:h-7 cursor-pointer" alt="Cart Icon" />
                            <span className='absolute font-satoshi-medium left-1/2 -translate-x-1/2 top-1/2 -translate-y-[35%] lg:-translate-y-[30%] text-[12px] lg:text-sm'>{cartItemsTotal === 0 ? '' : cartItemsTotal}</span>
                            {/* <span className='absolute font-satoshi-regular bg-black text-white rounded-full -top-1.5 -right-1.5 xl:-top-2.5 xl:-right-2.5 w-3 h-3 xl:w-4 xl:h-4 flex items-center justify-center xl:text-[12px] text-[10px]'>{cartItemsTotal}</span> */}
                        </div>
                    </Link>
                    <Link to="/add">
                        <img src={PlusIcon} className="h-6 md:h-6.5 lg:h-7 cursor-pointer" alt="Add Icon" />
                    </Link>
                </div>


                {/* Mobile portrait toggle menu */}
                <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ease-in-out 
                                ${menuShow ? 'bg-black/50 opacity-100 pointer-events-auto' : 'bg-transparent opacity-0 pointer-events-none'}`}>

                    <div className={`w-8/10 sm:w-1/2 overflow-y-scroll bg-white h-full transition-transform duration-500 ease-in-out
                                    ${menuShow ? 'translate-x-0' : '-translate-x-full'}`}>

                        <div className="flex justify-between border-b border-black/20 items-center p-4">
                            <h3 className="text-xl font-satoshi-medium">LUNARE</h3>
                            <button onClick={() => setMenuShow(false)} className="text-black text-xl font-bold">
                                <img src={CrossMarkIcon} className="w-4" alt="" />
                            </button>
                        </div>
                        <ul className='flex flex-col'>
                            <NavLink>
                                <li className='border-b border-black/20 p-4 font-satoshi-medium flex justify-between'>
                                    <span>CLOTHING</span>
                                    <img src={LeftArrowIcon} className='w-2 opacity-80' alt="" />

                                </li>
                            </NavLink>
                            <NavLink>
                                <li className='border-b border-black/20 p-4 font-satoshi-medium flex justify-between'>
                                    <span>SHOES</span>
                                    <img src={LeftArrowIcon} className='w-2 opacity-80' alt="" />

                                </li>
                            </NavLink>
                            <NavLink>
                                <li className='border-b border-black/20 p-4 font-satoshi-medium flex justify-between'>
                                    <span>BAGS</span>
                                    <img src={LeftArrowIcon} className='w-2 opacity-80' alt="" />
                                </li>
                            </NavLink>
                            <NavLink>
                                <li className='border-b border-black/20 p-4 font-satoshi-medium flex justify-between'>
                                    <span>ACCESSORIES</span>
                                    <img src={LeftArrowIcon} className='w-2 opacity-80' alt="" />
                                </li>
                            </NavLink>
                            <NavLink>
                                <li className='border-b border-black/20 p-4 font-satoshi-medium flex justify-between'>
                                    <span>COLLECTIONS</span>
                                    <img src={LeftArrowIcon} className='w-2 opacity-80' alt="" />
                                </li>
                            </NavLink>
                            <NavLink>
                                <li className='border-b border-black/20 p-4 font-satoshi-medium flex justify-between'>
                                    <span>NEW ARRIVALS</span>
                                    <img src={LeftArrowIcon} className='w-2 opacity-80' alt="" />
                                </li>
                            </NavLink>
                        </ul>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Navbar
