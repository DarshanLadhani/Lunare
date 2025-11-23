import { Outlet } from "react-router-dom"
import Header from "./Header/Header.jsx"
import Footer from "./Footer/Footer.jsx"
import ScrollToTop from "./scrollToTop.jsx"

function Layout() {


    return (
        <div className='flex flex-col min-h-screen'>
            <ScrollToTop />
            <Header />
            <main className='flex-grow'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout