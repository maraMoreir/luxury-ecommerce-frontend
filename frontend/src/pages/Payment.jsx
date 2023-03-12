import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Store } from '../Store';
import '../styles/payment.css';

const Payment = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { shippingAddress, paymentMethod },
    } = state;

    const [paymentMethodName, setPaymentMethod] = useState(
        paymentMethod || 'Dinheiro'
    );

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();

        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder');
    }

    return (
        <>
            <Navbar />
            <div className="payment-container">
                <div className="payment-row">
                    <div className="payment-col">
                        <h2 className='payment-title'>Metódo de Pagamento</h2>
                    </div>
                    <div className="payment-col">
                        <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
                    </div>
                </div>
                <div className="payment-row">
                    <div className="payment-col">
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <label htmlFor="cash">Dinheiro</label>
                                <input type="radio" value="Dinheiro" checked={paymentMethodName === 'Dinheiro'} className='radio' name="" id="cash" onChange={(e) => setPaymentMethod(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <button type="submit">Continue</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default Payment;