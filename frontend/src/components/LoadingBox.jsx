import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import "../styles/messagebox.css";

const LoadingBox = () => {
  return (
    <>
      <Navbar />
      <div className='message-container'>
        <h2 className="messageLoading">Loading....</h2>
      </div>
      <Footer />
    </>
  )
};

export default LoadingBox;