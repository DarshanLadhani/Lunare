import CardsContainer from "../CardsContainer/Cardscontainer.jsx";
import SearchProductContext from "../../contexts/Searchproducts/searchproducts.context.js";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

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
        <CardsContainer arr={searchproducts ? searchproducts : []} title={"NEW ARRIVALS"} />
    )
}

export default NewArrivals;
