import { faHeart, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import "../styles/productshop.css";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import axios from "axios";

const ProductShop = ({ item }) => {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, wish } = state;

    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === item._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        //Verifique se a quantidade adicionada ao carrinho é menor que a quantidade disponível
        const { data } = await axios.get(`/api/products/slug/${item.slug}`);
        if (data.countInStock < quantity) {
            window.alert('Desculpa. Produto esgotado!');
            return;
        }

        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
    };

    const addToWishHandler = () => {

        const existItem = wish.wishItems.find((x) => x._id === item._id);
        const quantity = existItem ? existItem.quantity : 1;

        //const { data } = await axios.get(`/api/products/slug/${product.slug}`);
        if (existItem) {
            window.alert( "Desculpe. Você já adicionou o produto à sua lista de desejos.");
            return;
        }

        ctxDispatch({
            type: 'WISH_ADD_ITEM',
            payload: { ...item, quantity },
        });
    }

    return (
        <div className="ps-card" key={item._id}>
            <div className="card-header">
                <Link to={`/product/${item.slug}`}>
                    <img src={item.image} alt={item.title} />
                </Link>
            </div>
            <div className="card-body">
                <h3 className="title">{item.title}</h3>
                <span>R${item.price}</span>
            </div>
            <div className="card-footer">
                <button><FontAwesomeIcon icon={faHeart} onClick={addToWishHandler} /></button>
                {item.countInStock === 0 ? (
                    <button className="cart cart-out" disabled >Fora de estoque</button>
                ) : (
                    <button><FontAwesomeIcon icon={faShoppingBag} onClick={addToCartHandler} /></button>)
                }
            </div>
        </div>
    )
};

export default ProductShop;