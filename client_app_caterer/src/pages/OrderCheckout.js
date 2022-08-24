import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';
import { createNewOrderForCheckout } from '../apis/OrderApi';

const OrderCheckout = props => {
  const { user, accessToken } = useContext(AuthContext);
  const { table, items, sendMessage } = useSocket();
  const location = useLocation();
  const response = 'Your order is on the way';
  const decline = 'Your order cannot be accepted at the moment';
  const currentItems = location.state.order.items;
  const currentTable = location.state.order.table;
  const navigate = useNavigate();
  useEffect(() => {}, []);

  const checkoutOrder = async isAccepted => {
    if (isAccepted) {
      sendMessage(response, currentTable.id);
      const order = await createNewOrder();
      try {
        await createNewOrderForCheckout(accessToken, order);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      sendMessage(decline, currentTable.id);
    }

    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  const createNewOrder = async () => {
    const order = {
      branchId: user.branch.id,
      tableId: currentTable.id,
      employeeId: user.id,
      orderRows: currentItems,
      orderDate: Date.now(),
    };
    return order;
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
            {item.productName} {item.quantity} {item.price}
          </li>
        ))}
      </ul>
      <div>{}</div>
      <button onClick={() => checkoutOrder(true)}>Checkout order</button>
      <button onClick={() => checkoutOrder(false)}>Cancel</button>
    </div>
  );
};

export default OrderCheckout;
