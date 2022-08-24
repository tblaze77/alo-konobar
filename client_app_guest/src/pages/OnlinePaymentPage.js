import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const OnlinePaymentPage = () => {
  let location = useLocation();
  let total = location.state;

  useEffect(() => {}, []);

  return (
    <div className="menu-container">
      <h1>This is online payment page</h1>
      {console.log(total)}
      <p>
        You have to pay <b>{total} HRK</b>
      </p>
    </div>
  );
};

export default OnlinePaymentPage;
