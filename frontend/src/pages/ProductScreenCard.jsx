import React from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { TransformComponent, TransformWrapper } from "@pronestor/react-zoom-pan-pinch";
import "../styles/productscreencard.css";
import { useContext } from "react";
import { Store } from "../Store"
import { useNavigate } from "react-router-dom";

const ProductScreenCard = ({ product }) => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState('');
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, wish } = state;

    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity : 1;
        const { data } = await axios.get(`/api/products/slug/${product.slug}`);
        if (data.countInStock < quantity) {
            window.alert('Desculpa. Produto fora de estoque!');
            return;
        }

        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity },
        });

        navigate('/cart');
    };

    const addToWishHandler = async () => {
        const existItem = wish.wishItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity : 1;

        //Verifique se a quantidade adicionada ao carrinho é menor que a quantidade disponível
        //const { data } = await axios.get(`/api/products/slug/${product.slug}`);
        if (existItem) {
            window.alert('Você já adicionou o produto à sua lista de desejos.');
            return;
        }

        ctxDispatch({
            type: 'WISH_ADD_ITEM',
            payload: { ...product, quantity },
        });
        navigate('/wish');
    }

    return (
        <>
            <Navbar />
            <div className="screen-container">
                <div className="screen-row">
                    <div className="screen-col">
                        <div className="screen-images">
                            <div className="screen-top">
                                <TransformWrapper >
                                    <TransformComponent>
                                        <img src={selectedImage || product.image} alt={product.title} />
                                    </TransformComponent>
                                </TransformWrapper>
                                {/* <img src={selectedImage || product.image} alt={product.title} />*/}
                            </div>
                            <div className="screen-bottom">
                                <img src={product.image} onClick={() => setSelectedImage(`${product.image}`)} alt={product.title} />
                                <img src={product.image1} onClick={() => setSelectedImage(`${product.image1}`)} alt={product.title} />
                                <img src={product.image2} onClick={() => setSelectedImage(`${product.image2}`)} alt={product.title} />
                                <img src={product.image3} onClick={() => setSelectedImage(`${product.image3}`)} alt={product.title} />
                            </div>
                        </div>
                    </div>
                    <div className="screen-col">
                        <div className="first-div div">
                            <h2 className='title'>{product.title}</h2>
                            <p className='category'>{product.category}</p>
                        </div>
                        <div className="second-div div">
                            <span className="price">Preço: R${product.price}</span>
                            <div className="quantity">Quantidade: 1</div>
                        </div>
                        <div className="third-div div">
                            <p className="desc">{product.desc}</p>
                        </div>
                        <div className="fourth-div div">
                            {product.countInStock === 0 ? (
                                <button className="cart cart-out" disabled >Produto fora de estoque</button>
                            ) : (
                                <button className='cart' onClick={addToCartHandler}>Adicionar ao carrinho</button>)
                            }
                            <button className='wish' onClick={addToWishHandler}>Adicionar aos favoritos</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
};

export default ProductScreenCard;