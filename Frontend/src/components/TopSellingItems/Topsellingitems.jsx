import CardsContainer from '../CardsContainer/Cardscontainer.jsx'
import SearchProductContext from "../../contexts/Searchproducts/searchproducts.context.js";
import { useContext } from "react";


function TopSellingProducts() {
    const {searchproducts} = useContext(SearchProductContext);
    return (
        <CardsContainer arr={searchproducts?searchproducts:[]} title={"TOP SELLING"} />
    );
}

export default TopSellingProducts;
