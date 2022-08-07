import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
const OrderCheckout = props => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    console.log(user);
  }, []);

  const items = location.state.order.items;
  const table = location.state.order.table;
  return (
    <div>
      <h1>Order is for table number {table.number}</h1>
      <h2>
        Employee: {user.firstname} {user.lastname}
      </h2>
      <ul>
        <h1>Order items:</h1>
        {items.map(item => (
          <li>
            {item.productName} {item.quantity}
          </li>
        ))}
      </ul>
      <button>Checkout order</button>
      <button>Cancel</button>
    </div>
  );
};

export default OrderCheckout;
