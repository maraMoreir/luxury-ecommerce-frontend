import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faHeart, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import { Store } from '../Store';
import '../styles/navbar.css';

const Navbar = () => {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, wish, userInfo } = state;

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        window.location.href = '/login';
    }
    return (
        <div className='n-container'>
            <div className='n-row'>
                <div className='n-col'>
                    {
                        userInfo ? (<Link to='/account'><FontAwesomeIcon icon={faUser} /> {userInfo.name}</Link>) :
                            (<span><FontAwesomeIcon icon={faUser} /> Usúario</span>)
                    }

                </div>
                <div className='n-col'>
                    <div className='socials'>
                        <Link to="#"><img src="/images/socials/facebook.png" alt="" /></Link>
                        <img src="/images/socials/instagram.png" alt="" />
                        <img src="/images/socials/twitter.png" alt="" />
                        <img src="/images/socials/youtube.png" alt="" />
                    </div>
                </div>
            </div>

            <div className='n-row'>
                <div className='n-col'>
                <a href="/" className="logo">LUXURY</a>
                </div>
                <div className='n-col'>
                    <div className='icons'>
                        {
                            userInfo ? (<Link to="/signout" onClick={signoutHandler}><span><FontAwesomeIcon icon={faArrowRightToBracket} />Sair</span></Link>) :
                                (<a href="/login"><span><FontAwesomeIcon icon={faArrowRightToBracket} />Entrar</span></a>)
                        }
                        <Link to="/wish"><span><FontAwesomeIcon icon={faHeart} />{wish.wishItems.length > 0 && (<span className='totalItems'>{wish.wishItems.length}</span>)}</span></Link>
                        <Link to="/cart"><span><FontAwesomeIcon icon={faShoppingBag} />{cart.cartItems.length > 0 && (<span className='totalItems'>
                            {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</span>)}</span></Link>
                    </div>
                </div>
            </div>
            <div className='n-row'>
                <nav className='nav'>
                    <ul className='items'>
                        <li className="list"><NavLink to="/" activeclassname="active">Início</NavLink></li>
                        <li className="list"><NavLink to="/shop" activeclassname="active">Loja</NavLink></li>
                        <li className="list"><NavLink to="/about" activeclassname="active">Sobre</NavLink></li>
                        <li className="list"><NavLink to="/contact" activeclassname="active">Contato</NavLink></li>
                    </ul>
                    <button className='btn'>BTN</button>
                </nav>
            </div>
        </div>
    )
};

export default Navbar;