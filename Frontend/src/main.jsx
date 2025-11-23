import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { SearchProductContextProvider } from './contexts/Searchproducts/searchProductsContextProvider.jsx'
import CartContextProvider from './contexts/Cart/cartContextProvider.jsx'
import {Toaster} from "react-hot-toast"


createRoot(document.getElementById('root')).render(
    <SearchProductContextProvider>
      <CartContextProvider>
        <RouterProvider router={router} />
        <Toaster position='top-center' containerStyle={{top : 80}}/>
      </CartContextProvider>
    </SearchProductContextProvider>
) 
