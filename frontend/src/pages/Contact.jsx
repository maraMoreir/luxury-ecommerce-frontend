import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/contact.css';

const Contact = () => {
    return (
        <div>
            <Navbar />
            <section id="contact" class="contact">
                <h1 class="heading">Você tem outras dúvidas? Você pode enviar um e-mail.</h1>
                <div class="row">
                    <div class="form-container">
                        <div class="inputBox">
                            <input type="text" placeholder="Nome" />
                            <input type="text" placeholder="Sobrenome" />
                        </div>
                        <input type="email" placeholder="Seu e-mail" />
                        <textarea name="" id="" cols="30" rows="10" placeholder="Mensagem"></textarea>
                        <input type="submit" value="Enviar" />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
};

export default Contact;