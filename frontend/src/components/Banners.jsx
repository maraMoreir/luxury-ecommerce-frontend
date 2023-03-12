import { faArrowRightArrowLeft, faCheck, faPhoneVolume, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../styles/banners.css";

const Banners = () => {
    return (
        <div className="b-container">
            <div className="b-row">
                <div className="b-col">
                    <FontAwesomeIcon icon={faCheck} />
                    <span>Produto de Qualidade</span>
                </div>
                <div className="b-col">
                    <FontAwesomeIcon icon={faTruckFast} />
                    <span>Frete Grátis</span>
                </div>
                <div className="b-col">
                    <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                    <span>Devolução em 14 dias</span>
                </div>
                <div className="b-col">
                    <FontAwesomeIcon icon={faPhoneVolume} />
                    <span>Suporte 24 horas</span>
                </div>
            </div>
        </div>
    )
};

export default Banners;