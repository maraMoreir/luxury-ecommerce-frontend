import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { toast } from 'react-toastify'
import React, { useContext, useReducer, useState } from 'react'
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import '../styles/userprofile.css';
import { getError } from '../utils';
import Footer from './Footer';
import Navbar from './Navbar';

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false };

        default:
            return state;
    }
};

const UserProfile = () => {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                '/api/users/profile',
                {
                    name,
                    email,
                    password,
                    confirmPassword,
                    loadingUpdate 
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            dispatch({
                type: 'UPDATE_SUCCESS',
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Usuário atualizado com sucesso');
        } catch (err) {
            dispatch({
                type: 'FETCH_FAIL',
            });
            toast.error(getError(err));
        }
    };

    return (
        <>
            <Navbar />
            <div className='signin-container'>
                <div className="signin-row">
                    <div className="signin-col">
                        <form onSubmit={submitHandler}>
                            <h2>Perfil do Usúario</h2>
                            <div className="form-group">
                                <label htmlFor="name">Nome</label>
                                <input type="text" id='name' value={name} required onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" id='email' value={email} required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Senha</label>
                                <input type="password" id='password' required onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirmar Senha</label>
                                <input type="confirmPassword" id='confirmPassword' required onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <button type="submit">Atualizar</button>
                            </div>
                            <div className="account-back">
                                <Link to='/account'><FontAwesomeIcon icon={faChevronLeft} />Voltar à conta</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default UserProfile;