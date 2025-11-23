import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { CrossMarkIcon, DownArrowIcon } from "../../assets"
import CartContext from "../../contexts/Cart/cart.contexts";
import axios from "axios";
import { Loader } from "../../components"

function Cartitems({ imageurl, brand, name, discountedprice, price, productquantity, quantity, product_id, id, color, selectedsize }) {

    const navigate = useNavigate();
    const { deleteFromCart, fetchCartProducts } = useContext(CartContext);
    const [productQuantity, setProductQuantity] = useState(1);
    const [productQuantityShow, setProductQuantityShow] = useState(false);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleProductDetailsRedirect = () => {
        navigate(`/products/${product_id}`)
    }

    const handleCartDeleteItem = async () => {
        try {

            setLoading(true)

            setTimeout(async () => {
                const response = await deleteFromCart(id);

                if (response.success) {
                    setTimeout(() => setLoading(false), 10000)
                }
            }, 500);


        } catch (error) {
            console.log(error.message)
        }
    }

    const handleProductQuantityChange = async () => {
        try {
            if (selectedQuantity === productQuantity) {
                setProductQuantityShow(false);
            } else if (selectedQuantity > quantity) {
                setError(`Only ${quantity} products left.`);
                setShowError(true)
                setSelectedQuantity(productQuantity)
            }
            else {
                setProductQuantity(selectedQuantity);
                setProductQuantityShow(false);
                setLoading(true)
                const response = await axios.put(
                    `${import.meta.env.VITE_BACKEND_URL}/cart/update/quantity/${id}`,
                    { productquantity: selectedQuantity }
                );

                await fetchCartProducts();

                if (response.data.success) {
                    setTimeout(() => setLoading(false), 300)
                }

                document.body.style.overflow = 'auto';
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        } finally {
            setProductQuantityShow(false);
        }
    };


    const handleProductQuantityShowClosing = () => {
        setProductQuantityShow(false);
        document.body.style.overflow = 'auto';
    }

    const handleProductQuantityShowOpening = () => {
        setProductQuantityShow(true);
        document.body.style.overflow = 'hidden';
    }

    useEffect(() => {
        setSelectedQuantity(productquantity)
        setProductQuantity(productquantity)
    }, [])

    useEffect(() => {
        if (productQuantityShow) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [productQuantityShow]);

    useEffect(() => {
        if (showError) {
            setTimeout(() => {
                setShowError(false);
                setError("");
            }, 3000);
        }
    }, [error])

    if (loading) {
        return (
            <Loader message="" fullscreen />
        );
    }


    return (
        <div className="flex items-center gap-x-4 xl:gap-x-6 px-2 py-4 lg:px-4 xl:py-6 border-black/10 border">
            <img src={imageurl} onClick={handleProductDetailsRedirect} className="w-30 h-35 md:w-35 md:h-40 lg:w-40 lg:h-45 xl:w-45 xl:h-50 cursor-pointer" alt="" />
            <div className="flex flex-col justify-between h-35 md:h-40 lg:h-45 xl:h-50 gap-y-1 lg:gap-y-2 relative flex-1">
                <div className="w-full flex flex-col gap-y-1 xl:gap-y-2 lg:text-lg xl:text-xl">
                    <h3 className="font-satoshi-bold text-sm md:text-lg lg:text-xl xl:text-2xl">{brand}</h3>
                    <p className="font-satoshi-medium text-[11px] md:text-sm lg:text-lg xl:text-xl">{name}</p>
                    {
                        discountedprice ?
                            <div className={`flex gap-x-1.5 items-center`}>
                                <p className="font-satoshi-bold hidden md:block text-black">Price : </p>
                                <p className="font-satoshi-regular text-black/60 line-through text-[12px] sm:text-sm md:text-[15px] lg:text-base xl:text-lg">₹ {price.toLocaleString("en-IN")}</p>
                                <p className="font-satoshi-bold text-black text-sm md:text-base lg:text-lg xl:text-xl">₹ {discountedprice.toLocaleString("en-IN")}</p>
                                <p className="rounded-full font-satoshi-regular text-sm md:text-base lg:text-lg xl:text-xl">(-{Math.round(((price - discountedprice) / price) * 100, 2)}%)</p>
                            </div>
                            :
                            <p className="font-satoshi-bold text-sm md:text-base lg:text-lg xl:text-xl text-black"><span className="text-black">Price: </span>₹ {price.toLocaleString("en-IN")}</p>
                    }
                    <p className="font-satoshi-medium mt-1 text-sm md:text-[15px] lg:text-lg xl:text-xl text-black/60"><span className="text-black">Subtotal: </span>₹ {((discountedprice === 0 ? price : discountedprice) * productQuantity).toLocaleString("en-IN")}</p>
                </div>
                <div className="w-fit gap-x-4 flex">
                    <div onClick={handleProductQuantityShowOpening} className="flex items-center gap-x-1 lg:gap-x-2 cursor-pointer font-satoshi-medium my-auto text-sm lg:text-base xl:text-lg px-2 lg:px-4 py-1 lg:py-1.5 border border-black/60">
                        <p className="font-satoshi-medium"><span>Qty : </span>{productQuantity}</p>
                        <img src={DownArrowIcon} className="w-3 lg:w-4" alt="" />
                    </div>
                    {
                        selectedsize &&
                        <div className="border border-black/60  text-sm lg:text-base xl:text-lg px-2 justify-center flex gap-x-2 lg:px-4 lg:py-1.5 items-center">
                            <p className="font-satoshi-medium"><span>Size : </span>{selectedsize}</p>
                        </div>
                    }
                </div>

                {
                    showError && <p className="text-[12px] sm:text-sm pb-1 xl:text-base text-red-600">{error}</p>
                }

                <button onClick={handleCartDeleteItem} className="absolute right-1 cursor-pointer">
                    <img src={CrossMarkIcon} className="w-5 h-5 lg:w-6 lg:h-6" alt="" />
                </button>
            </div>

            <div className={`fixed inset-0 z-50 transition-all duration-500 ease-in-out 
                                ${productQuantityShow ? 'bg-black/50 opacity-100 pointer-events-auto' : 'bg-transparent opacity-0 pointer-events-none'}`}>
                <div className={`fixed w-full transition-transform duration-500 ease-in-out ${productQuantityShow ? `bottom-0 translate-y-0
                                sm:bottom-1/2 sm:translate-y-1/2` : `translate-y-full bottom-0 sm:bottom-1/2`}`}>
                    <div className="bg-white sm:w-4/10 lg:w-[35%] xl:w-3/10 sm:mx-auto p-4">
                        <div className="flex justify-end">
                            <img src={CrossMarkIcon} onClick={handleProductQuantityShowClosing} className="w-5 cursor-pointer" alt="" />
                        </div>
                        <div className="flex mt-4 justify-between">
                            {
                                [1, 2, 3, 4, 5].map((qty) => (
                                    <button key={qty} onClick={() => setSelectedQuantity(qty)} className={`border font-satoshi-medium border-black/60 px-4 cursor-pointer py-2 ${selectedQuantity === qty ? 'bg-black text-white' : ''}`}>{qty}</button>
                                ))
                            }
                        </div>
                        <button onClick={handleProductQuantityChange} className="mt-8 w-full py-2 font-satoshi-medium text-lg border border-black/60 cursor-pointer">Select</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cartitems