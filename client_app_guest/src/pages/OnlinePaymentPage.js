import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const OnlinePaymentPage = () => {
  let location = useLocation();
  let total = location.state;

  useEffect(() => {}, []);

  return (
    <div>
      <h1>This is online payment page</h1>
      {console.log(total)}
      <p>You have to pay {total} HRK</p>
    </div>
  );
};

export default OnlinePaymentPage;
