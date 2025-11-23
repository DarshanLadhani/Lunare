import { ProductResults } from "../../components"
import { useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import SearchProductContext from "../../contexts/Searchproducts/searchproducts.context.js";
import axios from "axios";
import { Loader } from "../../components"
import { MensCollectionImage, WomenCollectionImage, FootWearCollectionImage, ChanelAccessoriesImage } from "../../assets";

const processSearchQuery = (query) => {

  let gender = null;
  const stopWords = new Set([
    "the", "a", "an", "of", "for", "in", "on", "and", "to", "at", "by", "from", "with", "about", "as", "is"
  ]);

  const cleanWords = []

  for (let word of query.split(" ")) {
    const lower = word.toLowerCase();

    if (["men", "man", "mens", "male", "males", "mans"].includes(lower)) {
      gender = "Men";
      continue;
    }
    if (["women", "woman", "womens", "female", "females", "womans"].includes(lower)) {
      gender = "Women";
      continue;
    }

    if (!stopWords.has(lower)) {
      cleanWords.push(word);
    }
  }

  let cleanQuery = cleanWords.join(" ").trim();

  if (cleanQuery.trim().length === 0) {
    cleanQuery = query;
  }

  return { gender, cleanQuery: cleanQuery.trim() };
}

const collectionsCards = [
  { name: "Men's collection", imageUrl: MensCollectionImage },
  { name: "Women's collection", imageUrl: WomenCollectionImage },
  { name: "Designer Footwear", imageUrl: FootWearCollectionImage },
  { name: "Luxury Accessories", imageUrl: ChanelAccessoriesImage },
];


function Products() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get("query");
  const { gender, cleanQuery } = processSearchQuery(query);

  const filtersData = {
    gender: gender !== null ? gender : ''
  }

  const [loading, setLoading] = useState(false)

  const { setSearchProducts, searchproducts } = useContext(SearchProductContext);

  useEffect(() => {
    const getSearchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/products/search?query=${cleanQuery}`, filtersData);
        if (response.data) {
          setSearchProducts(response.data)
          setTimeout(() => setLoading(false), 1000)
        }
      } catch (error) {
        console.log("Erorr : ", error.response.data.detail)
        setTimeout(() => setLoading(false), 1000)
      }
    }

    getSearchProducts();
  }, [query])

  if (loading) {
    return (
      <Loader message="Fetching search products..." fullscreen />
    )
  }

  return (
    searchproducts.length > 0 ?
      <div>
        <ProductResults query={cleanQuery} />
      </div>
      :
      <div className="flex flex-col gap-y-6 py-8 lg:py-12 xl:py-16">
        <div className="flex flex-col items-center justify-center gap-y-4 px-4 sm:mx-auto sm:w-11/12 md:w-[85%] lg:w-[75%] xl:w-[70%] lg:px-12 xl:px-16">
          <h1 className="font-satoshi-bold text-xl md:text-2xl xl:text-3xl text-center">
            No results for “{cleanQuery}”
          </h1>
          <p className="font-satoshi-regular text-black/60 text-sm sm:text-base text-center lg:text-lg">
             We couldn’t find any products matching your search. Please try different keywords or explore our latest collections.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 place-items-center px-4 gap-4 sm:mx-auto sm:w-11/12 md:w-[85%] lg:w-[80%] xl:w-[70%] lg:px-12 xl:px-16">
          {collectionsCards.map((collection, idx) => (
            <div key={idx} className="space-y-2 w-full flex flex-col items-center ">
              <img
                src={collection.imageUrl}
                className="w-35 h-50 md:w-40 md:h-55 lg:w-45 lg:h-60 xl:w-50 xl:h-65 object-cover"
                alt=""
              />
              <p className="font-satoshi-medium text-center text-sm sm:text-sm lg:text-lg xl:text-xl">
                {collection.name}
              </p>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Products