import { useEffect, useState } from "react";
import axios from "axios";
import CartContext from "./cart.contexts.js";

const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [productQuantity, setProductQuantity] = useState(1);

    const fetchCartProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cart`);
            if (response.data) {
                setCartItems(response.data)
            }
        } catch (error) {
            console.log("Error : ", error.message);
        }
    }

    const addToCart = async (cart_product_data) => {
        try {
            const existingItem = cartItems.find(item => (item.product_id === cart_product_data.product_id) && (item.selectedsize === cart_product_data.selectedsize || item.selectedsize === ""));

            if (existingItem) {
                console.log("Existing Item : " , existingItem)
                console.log("Entered for same size : ", existingItem.selectedsize)
                if (existingItem.productquantity < existingItem.quantity) {
                    const productQuantity = ++existingItem.productquantity;
                    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/cart/update/quantity/${existingItem.id}`, { productquantity: productQuantity });
                    return response.data
                } else {
                    return { "message": `Sorry we have only ${existingItem.quantity} products ${existingItem.selectedsize !== "" ? "for size " + existingItem.selectedsize : ""}`, "success": false }
                }
            }

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cart/add`, cart_product_data);

        await fetchCartProducts();

        return response.data


    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};


const deleteFromCart = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/cart/delete/${id}`)
        await fetchCartProducts();
        return response.data
    } catch (error) {
        console.error("Error deleting from cart:", error);
    }
};

const delteAllCartProducts = async () => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/cart/delete`)
        await fetchCartProducts();
        return response.data
    } catch (error) {
        console.error("Error deleting from cart:", error);
    }
};


useEffect(() => {
    fetchCartProducts();
}, [])


return (
    <CartContext.Provider value={{ cartItems, setCartItems, fetchCartProducts, addToCart, deleteFromCart, delteAllCartProducts }}>
        {children}
    </CartContext.Provider>
)
}

export default CartContextProvider