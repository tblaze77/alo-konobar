import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';
const OrderCheckout = props => {
  const { user } = useContext(AuthContext);
  const { table, items, sendMessage } = useSocket();
  const location = useLocation();
  const response = 'Your order is on the way';
  const currentItems = location.state.order.items;
  const currentTable = location.state.order.table;
  const navigate = useNavigate();
  useEffect(() => {}, []);

  const checkoutOrder = () => {
    sendMessage(response, currentTable.id);
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };
  return (
    <div>
      <h1>Order is for table number {currentTable.number}</h1>
      <h2>
        Employee: {user.firstname} {user.lastname}
      </h2>
      <ul>
        <h1>Order items:</h1>
        {currentItems.map(item => (
          <li>
            {item.productName} {item.quantity}
          </li>
        ))}
      </ul>
      <div>{}</div>
      <button onClick={checkoutOrder}>Checkout order</button>
      <button>Cancel</button>
    </div>
  );
};

export default OrderCheckout;
