import React from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import './HeaderFooter.css';
const HeaderFooter = ({ children }) => {
  return (
    <>
      <Header />
      <div className="wrapper">
        {children}
        <Footer />
      </div>
    </>
  );
};

export default HeaderFooter;
