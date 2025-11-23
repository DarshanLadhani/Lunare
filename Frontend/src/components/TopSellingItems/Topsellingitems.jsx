import CardsContainer from '../CardsContainer/Cardscontainer.jsx'
import SearchProductContext from "../../contexts/Searchproducts/searchproducts.context.js";
import { useContext } from "react";

const arr = [
    { brand: 'Ralph Lauren', price: 2800, imageUrl: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$" },
    { brand: "Prada", price: 70000, imageUrl: "https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg" },
    { brand: 'Ralph Lauren', price: 2800, imageUrl: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$" },
    { brand: "Prada", price: 70000, imageUrl: "https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg" },
    { brand: 'Ralph Lauren', price: 2800, imageUrl: "https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-1484922_lifestyle?$plpDeskRF$" },
    { brand: "Prada", price: 70000, imageUrl: "https://www.mytheresa.com/media/1094/1238/100/8d/P01060743.jpg" },
];

function TopSellingProducts() {
    const {searchproducts} = useContext(SearchProductContext);
    return (
        <CardsContainer arr={searchproducts ? searchproducts : arr} title={"TOP SELLING"} />
    );
}

export default TopSellingProducts;
