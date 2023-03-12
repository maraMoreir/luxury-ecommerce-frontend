import axios from "axios";
import React, { useState, useContext } from "react";
import "../styles/quick.css";
import { Store } from "../Store";

const Quick = ({ item }) => {
    //para alterar a imagem
    const [selectedImage, setSelectedImage] = useState('');

    //para fechar 
    const [style, setStyle] = useState("main-container");

    const changeStyle = () => {

        setStyle("main-containerOne");
    };

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, wish } = state;
    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === item._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        const { data } = await axios.get(`/api/products/slug/${item.slug}`);
        if (data.countInStock < quantity) {
            window.alert('Desculpa. Produto fora de estoque!');
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

        //Verifique se a quantidade adicionada ao carrinho é menor que a quantidade disponível
        //const { data } = await axios.get(`/api/products/slug/${product.slug}`);
        if (existItem) {
            window.alert('Você já adicionou o produto à sua lista de desejos.');
            return;
        }

        ctxDispatch({
            type: 'WISH_ADD_ITEM',
            payload: { ...item, quantity },
        });
    }

    return (
        <div className={style}>
            <div className="card-quick" key={item._id}>
                <div className="card-row">
                    <div className="card-images">
                        <div className="card-top">
                            <img src={selectedImage || item.image} alt={item.title} />
                        </div>
                        <div className="card-bottom">
                            <img src={item.image} onClick={() => setSelectedImage(`${item.image}`)} alt={item.title} />
                            <img src={item.image1} onClick={() => setSelectedImage(`${item.image1}`)} alt={item.title} />
                            <img src={item.image2} onClick={() => setSelectedImage(`${item.image2}`)} alt={item.title} />
                            <img src={item.image3} onClick={() => setSelectedImage(`${item.image3}`)} alt={item.title} />
                        </div>
                    </div>
                </div>
                <div className="card-row">
                    <div className="first-div div">
                        <h2 className='title'>{item.title}</h2>
                        <p className='category'>{item.category}</p>
                    </div>
                    <div className="second-div div">
                        <span className="price">Preço: ${item.price}</span>
                        <div className="quantity">Quantidade: 1</div>
                    </div>
                    <div className="third-div div">
                        <p className="desc">{item.desc}</p>
                    </div>
                    <div className="fourth-div div">
                        {item.countInStock === 0 ? (
                            <button className="cart cart-out" disabled >Fora de estoque</button>
                        ) : (
                            <button className='cart' onClick={addToCartHandler}>Adicionar ao Carrinho</button>)
                        }
                        <button className='wish' onClick={addToWishHandler}>Adicionar aos Favoritos</button>
                    </div>
                </div>
            </div>
            <button className='back' onClick={changeStyle}>Sair</button>
        </div>
    )
};

export default Quick;