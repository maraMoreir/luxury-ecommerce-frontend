import React from 'react';
import '../styles/checkoutsteps.css';

const CheckoutSteps = (props) => {
    return (
        <div className="checkout-steps">
            <p className={props.step2 ? 'active' : ''}>Envio</p>
            <p className={props.step3 ? 'active' : ''}>Pagamento</p>
            <p className={props.step4 ? 'active' : ''}>Faça a Encomenda</p>
        </div>
    )
};

export default CheckoutSteps;