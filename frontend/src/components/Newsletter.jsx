import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../styles/newsletter.css";

const Newsletter = () => {
    return (
        <div className="new-container">
            <div className="new-row">
                <div className="new-col">
                    <h2 className="new-title">Newsletter</h2>
                    <p className="new-desc">Tenha atualizações oportunas de seus produtos favoritos.</p>
                    <div className="input-container">
                        <input type="text" placeholder="Seu E-mail" />
                        <button><FontAwesomeIcon icon={faPaperPlane} /></button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Newsletter;