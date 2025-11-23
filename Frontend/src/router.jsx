import { createBrowserRouter } from "react-router-dom";
import {Layout} from "./components";
import { Home , Cart  , Products , Product, AddProduct} from "./pages";

const router = createBrowserRouter([
    {
        path : '/',
        element : <Layout/>,
        children : [
            {
                path : '/',
                element : <Home/>
            },
            {
                path : '/products',
                element : <Products/>
            },
            {
                path : '/products/:id',
                element : <Product/>
            },
            {
                path : '/cart',
                element : <Cart/>
            },
            {
                path : '/add',
                element : <AddProduct/>
            }
        ]
    }
])

export default router