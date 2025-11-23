import CardsContainer from "../CardsContainer/Cardscontainer.jsx";
import SearchProductContext from "../../contexts/Searchproducts/searchproducts.context.js";
import { useContext, useEffect, useState } from "react";
import { Loader } from "../../components"
import axios from "axios";

const arr = [
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageUrl: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$" },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageUrl: "https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg" },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageUrl: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$" },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageUrl: "https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg" },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageUrl: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$" },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageUrl: "https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg" },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageUrl: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$" },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageUrl: "https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg" },
    { brand: 'Ralph Lauren', name: 'Men rugby shirt collar', price: 2800, imageUrl: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$" },
    { brand: "Prada", name: 'designer women shoes', price: 70000, imageUrl: "https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg" },
];

function NewArrivals() {
    const { searchproducts , setSearchProducts } = useContext(SearchProductContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getSearchProducts = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`);
                if (response.data) {
                    console.log(response.data)
                    setSearchProducts(response.data)
                    setTimeout(()=>setLoading(false) , 10000 )
                }
            } catch (error) {
                console.log("Erorr : ", error)
            }
        }
        getSearchProducts()
    }, [])

    return (
        <CardsContainer arr={searchproducts ? searchproducts : arr} title={"NEW ARRIVALS"} />
    )
}

export default NewArrivals;
