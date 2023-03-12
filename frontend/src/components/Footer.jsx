import React from "react";
import "../styles/footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <div className="f-container">
            <div className="f-row">
                <div className="f-col">
                    <a href="/" className="logo">LUXURY</a>
                    <p>E-COMMERCE</p>
                </div>
                <div className="f-col">
                    <h2>Links</h2>
                    <ul>
                        <li>
                            <NavLink to="/shop">Loja</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">Sobre</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">Contato</NavLink>
                        </li>

                    </ul>
                </div>
                <div className="f-col">
                    <h2>Categorias</h2>
                    <ul>
                        <li>
                            <NavLink to="/shop">Masculino</NavLink>
                        </li>
                        <li>
                            <NavLink to="/shop">Feminino</NavLink>
                        </li>
                        <li>
                            <NavLink to="/shop">Infantil</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="f-col">
                    <h2>Redes Sociais</h2>
                    <div className="socials">
                        <a href="/"><img src="/images/socials/facebook.png" alt="" /></a>
                        <a href="/"><img src="/images/socials/instagram.png" alt="" /></a>
                        <a href="/"><img src="/images/socials/twitter.png" alt="" /></a>
                        <a href="/"><img src="/images/socials/youtube.png" alt="" /></a>
                    </div>
                </div>
            </div>
            <div className="f-copyrow">
                <p>&copy; 2023. Desenvolvido por SILMARA M. SILVA.</p>
            </div>
        </div>
    )
};

export default Footer;