import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import "../styles/signin.css";
import { toast } from 'react-toastify';
import { getError } from '../utils';

const SignIn = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/login', {
                email,
                password
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: res.data });
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            navigate(redirect || '/');
            //console.log(data);
        } catch (err) {
            toast.error(getError(err));
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);
    
    return (
        <div className='signin-container'>
            <div className="signin-row">
                <div className="signin-col">
                    <form onSubmit={submitHandler}>
                        <h2>Entrar</h2>
                        <div className="form-group">
                            <label htmlFor='email'>E-mail</label>
                            <input type="email" id='email' required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor='password'>Senha</label>
                            <input type="password" id='password' required onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <button type='submit'>Entrar</button>
                        </div>
                        <div className="form-group">
                            <Link to={`/signup?redirect=${redirect}/`}>Crie sua conta</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default SignIn;