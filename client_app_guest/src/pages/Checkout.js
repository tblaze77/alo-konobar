import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Checkout = props => {
  let location = useLocation();
  const items = location.state.items;
  const total = location.state.total;
  useEffect(() => {
    console.log(items);
    console.log(total);
  }, []);

  const handleOfflinePayment = e => {
    console.log(e.target.id);
  };

  return (
    <div className="order-container">
      <div>
        <h2>You ordered</h2>
        <div>Product Name Quantity</div>
        <ul>
          {items.map((item, index) => {
            return (
              <div>
                {item.productName} {item.quantity}
              </div>
            );
          })}
        </ul>
      </div>

      <b>You have to pay {location.state.total} HRK</b>
      <div>Choose payment option</div>
      <div className="payment-options">
        <button className="cash" id="cash" onClick={handleOfflinePayment}>
          Cash
        </button>
        <button className="credit-card" id="credit-card" onClick={handleOfflinePayment}>
          Card
        </button>
        <buton className="online">Online</buton>
      </div>
    </div>
  );
};

export default Checkout;
