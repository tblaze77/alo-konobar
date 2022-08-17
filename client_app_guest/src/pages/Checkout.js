import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';
const Checkout = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const items = location.state.items;
  const total = location.state.total;
  const tableId = location.state.senderIdentification;
  const { sendPaymentMethod } = useSocket(tableId);
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  useEffect(() => {}, [showRedirectMessage]);

  const handleOfflinePayment = e => {
    let responseMessage = `Table number ${tableId} will pay with ${e.target.id}`;
    sendPaymentMethod(responseMessage);
    setShowRedirectMessage(true);
    setTimeout(() => {
      navigate(-1);
    }, 3000);
  };

  const handleOnlinePayment = e => {
    let responseMessage = `Table number ${tableId} will pay with ${e.target.id}`;
    sendPaymentMethod(responseMessage);
    setShowRedirectMessage(true);
    setTimeout(() => {
      navigate('onlinePayment', { state: total });
    }, 3000);
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
        <button className="credit-card" id="credit card" onClick={handleOfflinePayment}>
          Card
        </button>
        <buton className="online" id="online payment" onClick={handleOnlinePayment}>
          Online
        </buton>
        {showRedirectMessage ? <div>Thank you for using our app</div> : null}
      </div>
    </div>
  );
};

export default Checkout;
