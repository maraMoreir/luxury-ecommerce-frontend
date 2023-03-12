import axios from 'axios';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Store } from '../Store';
import '../styles/placeorder.css';
import LoadingBox from '../components/LoadingBox';

const reducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_REQUEST':
            return { ...state, loading: true };
        case 'CREATE_SUCCESS':
            return { ...state, loading: false };
        case 'CREATE_FAIL':
            return { ...state, loading: false };
        default:
            return state;
    }
};

const PlaceOrder = () => {
    const navigate = useNavigate();

    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,
    });
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    //preço
    const roundPrice = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    cart.itemsPrice = roundPrice(cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? roundPrice(0) : roundPrice(10);
    cart.taxPrice = roundPrice(0.20 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = async () => {
        try {
            dispatch({ type: 'CREATE_REQUEST' });

            const { data } = await axios.post(
                '/api/orders',
                {
                    orderItems: cart.cartItems,
                    shippingAddress: cart.shippingAddress,
                    paymentMethod: cart.paymentMethod,
                    itemsPrice: cart.itemsPrice,
                    shippingPrice: cart.shippingPrice,
                    taxPrice: cart.taxPrice,
                    totalPrice: cart.totalPrice,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            ctxDispatch({ type: 'CART_CLEAR' });
            dispatch({ type: 'CREATE_SUCCESS' });
            localStorage.removeItem('cartItems');
            navigate(`/order/${data.order._id}`);
        } catch (err) {
            dispatch({ type: 'CREATE_FAIL' });
            toast.error(getError(err));
        }
    };

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart, navigate]); //se não for definido o pagamento, vá para a última etapa -> pagamento
    return (
        <>
            <Navbar />
            <div className="order-container">
                <div className="order-row">
                    <div className="order-col">
                        <h2 className='order-title'>Vizualização do Pedido</h2>
                    </div>
                    <div className="order-col">
                        <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
                    </div>
                </div>
                <div className="order-row">
                    <div className="order-col">
                        <div className="order-shipping">
                            <h4 className="order-shipping-title">Envio:</h4>
                            <p className="order-shipping-info">{cart.shippingAddress.fullName}, {cart.shippingAddress.address},
                                {cart.shippingAddress.postalCode},
                                {cart.shippingAddress.city}, {cart.shippingAddress.country}
                                <Link to="/shipping"><FontAwesomeIcon icon={faPencil} />Edit</Link></p>
                        </div>
                        <div className="order-payment">
                            <h4>Pagamento:</h4>
                            <span>{cart.paymentMethod}</span>
                        </div>
                        <div className="order-items">
                            <h4 className="order-items-title">Items:</h4>
                            <div className="order-cards">
                                {cart.cartItems.map((item) => (
                                    <div className="order-card">
                                        <div className="order-card-body">
                                            <img src={item.image} alt={item.name} />
                                            <Link to={`/product/${item.slug}`}>{item.title}</Link>
                                        </div>
                                        <div className="order-card-footer">
                                            <span>{item.quantity}</span>
                                            <span>R${item.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link className='order-edit' to="/cart"><FontAwesomeIcon icon={faPencil} />Editar</Link>
                        </div>
                    </div>
                    <div className="order-col">
                        <h2 className='order-summary'>Resumo do Pedido</h2>
                        <div className="order-summary-info">
                            <h4>Items</h4>
                            <span>R${cart.itemsPrice.toFixed(2)}</span>
                        </div>
                        <div className="order-summary-info">
                            <h4>Envio</h4>
                            <span>R${cart.shippingPrice.toFixed(2)}</span>
                        </div>
                        <div className="order-summary-info">
                            <h4>Taxa</h4>
                            <span>R${cart.taxPrice.toFixed(2)}</span>
                        </div>
                        <div className="order-summary-info">
                            <h3>Total da Compra</h3>
                            <span>R${cart.totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="order-summary-button">
                            <button type="button" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0}>Finalizar Pedido</button>
                        </div>
                        {loading && <LoadingBox></LoadingBox>}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default PlaceOrder;