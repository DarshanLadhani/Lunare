import SearchProductContext from "./searchproducts.context.js";
import { useState } from "react";

export const SearchProductContextProvider = ({ children }) => {
    const [searchproducts, setSearchProducts] = useState([]);

    return (
        <SearchProductContext.Provider value={{ searchproducts, setSearchProducts }}>
            {children}
        </SearchProductContext.Provider>
    )
}