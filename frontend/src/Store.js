import React, { createContext, useReducer } from "react";
export const Store = createContext();

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    cart: {
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
        paymentMethod: localStorage.getItem('paymentMethod') ? localStorage.getItem('paymentMethod') : '',
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    },

    wish: {
        wishItems: localStorage.getItem('wishItems') ? JSON.parse(localStorage.getItem('wishItems')) : [],
    }
};

function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM': {
            //add cart
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find((item) => item._id === newItem._id);
            const cartItems = existItem ? state.cart.cartItems.map((item) => item._id === existItem._id ? newItem : item) : [...state.cart.cartItems, newItem];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case 'WISH_ADD_ITEM': {
            //add wish
            const newItem = action.payload;
            const existItem = state.wish.wishItems.find((item) => item._id === newItem._id);
            const wishItems = existItem ? state.wish.wishItems.map((item) => item._id === existItem._id ? newItem : item) : [...state.wish.wishItems, newItem];
            localStorage.setItem('wishItems', JSON.stringify(wishItems));
            return { ...state, wish: { ...state.wish, wishItems: [...state.wish.wishItems, action.payload] } };
        }
        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter((item) => item._id !== action.payload._id);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case 'CART_CLEAR':
            return { ...state, cart: { ...state.cart, cartItems: [] } };

        case 'WISH_REMOVE_ITEM': {
            const wishItems = state.wish.wishItems.filter((item) => item._id !== action.payload._id);
            localStorage.setItem('wishItems', JSON.stringify(wishItems));
            return { ...state, wish: { ...state.wish, wishItems } };
        }

        case 'USER_SIGNIN': {
            return { ...state, userInfo: action.payload };
        }

        case 'USER_SIGNOUT': {
            return {
                ...state, userInfo: null,
                cart: {
                    cartItems: [],
                    shippingAddress: {},
                    paymentMethod: '',
                },
            };

        }

        case 'SAVE_SHIPPING_ADDRESS':
            return {
                ...state, cart: { ...state.cart, shippingAddress: action.payload, },
            };


        case 'SAVE_PAYMENT_METHOD':
            return {
                ...state, cart: { ...state.cart, paymentMethod: action.payload, },
            }


        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    return <Store.Provider value={value}>{props.children}</Store.Provider>
}