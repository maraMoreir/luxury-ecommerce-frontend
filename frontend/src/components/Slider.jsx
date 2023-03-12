import { faArrowCircleLeft, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../styles/slider.css'
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useReducer } from "react";
import logger from "use-reducer-logger";

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, slider: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

const Slider = () => {

    const [{ loading, error, slider }, dispatch] = useReducer(logger(reducer), {
        slider: [],
        loading: true,
        error: ''
    });

    const [slideindex, setSlideIndex] = useState(0);

    const handleClick = (direction) => {

        if (direction === "left") {
            setSlideIndex(slideindex > 0 ? slideindex - 1 : 2)
        } else {
            setSlideIndex(slideindex < 2 ? slideindex + 1 : 0)
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/slider');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        }
        fetchData();

    }, []);

    return (
        <div className="s-container">
            <div className="s-arrow left" onClick={() => handleClick("left")} >
                <FontAwesomeIcon icon={faArrowCircleLeft} />
            </div>
            <div className="wrapper" slideindex={slideindex} style={{ transform: `translateX(${slideindex * -100}vw)` }}>
                {loading ? (<h1 className="loading">Loading...</h1>) : error ? (<h1 className="error">
                    {error}</h1>) : (slider.map((item) => (
                        <div className="slide" key={item._id}>
                            <div className="img-container">
                                <img src={item.image} className="s-img" alt="" />
                            </div>
                        </div>
                    )))}

            </div>
            <div className="s-arrow right" onClick={() => handleClick("right")}>
                <FontAwesomeIcon icon={faArrowCircleRight} />
            </div>
        </div>
    )
};

export default Slider;