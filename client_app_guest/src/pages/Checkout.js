import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';
const Checkout = () => {
  let location = useLocation();
  const items = location.state.items;
  const total = location.state.total;
  const tableId = location.state.senderIdentification;
  const { sendPaymentMethod } = useSocket(tableId);

  useEffect(() => {}, []);

  const handleOfflinePayment = e => {
    let responseMessage;
    if (e.target.id === 'cash') {
      responseMessage = `Table number ${tableId} will pay with cash`;
    } else if (e.target.id === 'credit-card') {
      responseMessage = `Table number ${tableId} will pay with credit card`;
    } else {
      responseMessage = `Table number ${tableId} will pay through our application`;
    }
    sendPaymentMethod(responseMessage);
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
