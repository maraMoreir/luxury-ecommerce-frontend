import React from "react";
import Navbar from "../components/Navbar";
import "../styles/shop.css";
import Footer from "../components/Footer";
import ProductsShop from "../components/ProductsShop"

const Shop = () => {
    return (
        <div>
            <Navbar />
            <div className="s-row">
                <div className="s-col">
                    <ProductsShop />
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default Shop;