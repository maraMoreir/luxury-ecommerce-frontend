import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import "../styles/signin.css";
import { toast } from 'react-toastify';
import { getError } from '../utils';

const Register = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('As senhas não coincidem');
            return;
        }

        try {
            const { data } = await axios.post('/api/users/signup', {
                name,
                email,
                password
            });

            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            //console.log(data);
        } catch (err) {
            toast.error(getError(err));
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    return (
        <div className='signin-container'>
            <div className="signin-row">
                <div className="signin-col">
                    <form onSubmit={submitHandler}>
                        <h2>Cadastre-se</h2>
                        <div className="form-group">
                            <label htmlFor='name'>Nome</label>
                            <input type="text" id='name' required onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor='email'>E-mail</label>
                            <input type="email" id='email' required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor='password'>Senha</label>
                            <input type="password" id='password' required onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor='c_password'>Confirmar Senha</label>
                            <input type="password" id='c_password' required onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <button type='submit'>Entrar</button>
                        </div>
                        <div className="form-group">
                            <Link to={`/login?redirect=${redirect}/`}>Você já tem uma conta ?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Register;