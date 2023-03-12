import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import "../styles/wish.css";

const Wish = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        wish: { wishItems },
    } = state;

    const removeItemHandler = (item) => {
        ctxDispatch({
            type: 'WISH_REMOVE_ITEM',
            payload: item
        });
    }

    return (
        <>
            <Navbar />
            <div className="wish-container">
                <div className="wish-row">
                    <h2 className="wish-title">Sua Lista de Favoritos</h2>
                </div>
                <div className="wish-row">
                    <div className="wish-col">
                        {wishItems.length === 0 ? (<h3 className="info">Sua Lista de Favoritos Está Vazia</h3>) : (
                            <div className="wish-cards">
                                {wishItems.map((item) => (
                                    <div className="wish-card" key={item._id}>
                                        <div className="wish-header">
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                        <div className="wish-body">
                                            <Link to={`/product/${item.slug}`} >{item.title} </Link>
                                            <span className="wish-quantity">Quantidade : 1</span>
                                        </div>
                                        <div className="wish-footer">
                                            <span className="wish-price">R${item.price}</span>
                                            <button onClick={() => removeItemHandler(item)}><FontAwesomeIcon icon={faTrashAlt} /> </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="wish-col"></div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default Wish;