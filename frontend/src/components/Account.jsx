import React, { useContext } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import '../styles/account.css';
import { Store } from '../Store';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Account = () => {
    const { state } = useContext(Store);
    const { userInfo } = state;

    return (
        <>
            <Navbar />
            <div className="account-container">
                <div className="account-row">
                    <div className="account-col">
                        <h2 className="account-title">Sua Conta</h2>
                    </div>
                </div>
                <div className='account-row'>
                    <div className="account-col">
                        <Link to='/profile'>Perfil de usuário<FontAwesomeIcon icon={faChevronRight} /></Link>
                        <Link to='/orderhistory'>Histórico de pedidos <FontAwesomeIcon icon={faChevronRight} /></Link>
                    </div>
                    <div className="account-col">
                        <img src="./images/users/user.jpg" alt="User" />
                        <span className='name-user'>{userInfo.name}</span>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default Account;