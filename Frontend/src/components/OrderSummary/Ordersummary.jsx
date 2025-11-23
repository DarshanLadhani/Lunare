import { ArrowRightIcon, ArroWRightWhiteIcon } from "../../assets"
import CartContext from "../../contexts/Cart/cart.contexts.js"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Loader } from "../../components"
import toast from "react-hot-toast"

const product = { brand: 'Ralph Lauren', price: 2800, imageUrl: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$", description: "A stylish and versatile women’s jacket crafted for comfort and elegance. Perfect for layering in all seasons, offering a sleek look with durable quality." }

function Ordersummary() {

    const [price, setPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(100);
    const { cartItems, delteAllCartProducts } = useContext(CartContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            const subtotal = cartItems.reduce((sum, item) => {
                if (item.discountedprice === 0) {
                    return sum + (item.price * item.productquantity)
                } else {
                    return sum + (item.discountedprice * item.productquantity)
                }
            }, 0);

            setPrice(subtotal)
            const finalTotalPrice = subtotal + deliveryFee
            setTotalPrice(finalTotalPrice);
        } else {
            setPrice(0);
            setTotalPrice(0);
        }
    }, [cartItems]);

    const handleCheckout = async () => {
        if (!cartItems || cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        setLoading(true)

        const orderData = {
            items: cartItems.map(item => ({
                product_id: item.product_id,
                name: item.name,
                brand: item.brand,
                productquantity: item.productquantity,
                price: item.price,
                discountedprice: item.discountedprice || 0,
                imageurl: item.imageurl,
                selectedsize: item.selectedsize || ""
            })),
            totalamount: totalPrice
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/orders`, orderData);

            if (response.status === 201 || response.status === 200) {
                console.log("Order details:", response.data);
                await delteAllCartProducts()
                setTimeout(() => setLoading(false), 2000);
                window.scrollTo({top : 0 , behavior : "smooth"})
                toast("Your order placed successfully", {
                    style: {
                        border: "1px solid black",
                        padding: "4px",
                        color: "black",
                        background: "#ffffff",
                        borderRadius: "0px",
                    },
                });
            }
        } catch (error) {
            console.error("Error creating order:", error);
            alert("Failed to place order.");
        } finally {
            setTimeout(() => setLoading(false), 500);
        }
    };


    if (loading) {
        return (
            <Loader message="Placing your order" fullscreen />
        )
    }

    return (
        <div className="px-2 w-full sm:w-11/12 md:w-[85%] lg:w-[80%] xl:w-[70%] mx-auto lg:px-12 xl:px-16">
            <div className="border-black/10 border p-3 md:p-5 xl:px-9 flex flex-col gap-y-4">
                <h3 className="font-satoshi-bold text-xl md:text-2xl text-center">Order Summary</h3>
                <div className="flex flex-col gap-y-4 md:text-lg xl:text-xl pb-4 border-b md:mx-4 font-satoshi-medium">
                    <p className="text-black/60 flex items-center justify-between ">
                        Subtotal
                        <span className="text-black">₹ {price.toLocaleString("en-IN")}</span>
                    </p>
                    <p className="text-black/60 flex items-center justify-between">
                        Delivery Fee
                        <span className="text-black">₹ {deliveryFee.toLocaleString("en-IN")}</span>
                    </p>
                </div>
                <p className="text-black/60 text-lg md:text-xl xl:text-2xl md:mx-4 flex items-center justify-between font-satoshi-medium">
                    Total
                    <span className="text-black ">₹ {totalPrice.toLocaleString("en-IN")}</span>
                </p>
                <button onClick={handleCheckout} className="border-2 cursor-pointer border-black/60 flex w-full sm:w-6/10 md:w-1/2 sm:mx-auto xl:text-lg justify-center text-sm gap-x-2 items-center p-3 font-satoshi-medium">
                    <p className="flex gap-x-1">
                        <span>PROCEED TO</span>
                        <span>CHECKOUT</span>
                    </p>
                    <img src={ArrowRightIcon} className="w-5 xl:w-6 opacity-80" alt="" />
                </button>
            </div>
        </div>
    )
}

export default Ordersummary