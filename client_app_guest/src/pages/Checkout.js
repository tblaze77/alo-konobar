import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';
import { orderRowHeaders } from '../constants/constants';
import './Checkout.css';
import SnackBar from '../components/Snackbar';
const Checkout = () => {
  let location = useLocation();
  let navigate = useNavigate();
  let branchId = useParams();
  const items = location.state.items;
  const total = location.state.total;
  const tableId = location.state.senderIdentification;
  const { sendPaymentMethod } = useSocket(tableId);
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const [branch, setBranch] = useState(null);
  useEffect(() => {}, [showRedirectMessage]);

  const handleOfflinePayment = e => {
    let responseMessage = `Table number ${tableId} will pay with ${e.target.id}`;
    sendPaymentMethod(responseMessage);
    setShowRedirectMessage(true);
    setTimeout(() => {
      navigate(-1);
    }, 3000);
  };

  useEffect(() => {
    calculateSubtotals();
  }, []);

  const calculateSubtotals = () => {
    items.forEach(item => {
      item['subtotal'] = item.price * item.quantity;
    });
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
    <div className="menu-container">
      <h2>You ordered:</h2>
      <table>
        <thead>
          {orderRowHeaders.map(header => (
            <th>{header}</th>
          ))}
        </thead>
        <tbody>
          {items.map((item, index) => {
            return (
              <tr>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.subtotal}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="total-container">
        <b>Total: </b> <h3> {location.state.total} HRK</h3>
      </div>
      <div>
        <b>Choose payment option</b>
      </div>
      <div className="payment-options">
        <button className="button cash" id="cash" onClick={handleOfflinePayment}>
          Cash
        </button>
        <button className="button credit-card" id="credit card" onClick={handleOfflinePayment}>
          Card
        </button>
        <buton className="button online" id="online payment" onClick={handleOnlinePayment}>
          Online
        </buton>
      </div>
      {!showRedirectMessage ? <SnackBar message={'Thank you for using our app'} isAccepted={true} /> : null}
    </div>
  );
};

export default Checkout;
