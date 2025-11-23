import { ProductsDetails } from "../../components"
import { useLocation, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../../components"

function Product() {

  const location = useLocation();
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductData = async () => {
      if (location.state) {
        setProduct(location.state)
        setTimeout(()=> setLoading(false) , 500)
      } else {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`);
          if (response.data) {
            setProduct(response.data)
            setTimeout(()=> setLoading(false) , 500)
          }
        } catch (error) {
          console.log("Error : ", error.message)
        } finally {
            setTimeout(()=> setLoading(false) , 500)
        }
      }
    }
    getProductData();
  }, [])

  if (loading) {
    return (
      <Loader message="Fetching products details..." fullscreen />
    );
  }

  return (
    <div>
      <ProductsDetails product={product} />
    </div>
  )
}

export default Product