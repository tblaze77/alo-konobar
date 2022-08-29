import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';
import { createNewOrderForCheckout } from '../apis/OrderApi';
import { orderRowHeaders } from '../constants/constants';
import './OrderCheckout.css';

const OrderCheckout = props => {
  const { user, accessToken, setOrderIdToUpdate } = useContext(AuthContext);
  const { table, items, sendMessage } = useSocket();
  const location = useLocation();
  const [total, setTotal] = useState(null);
  const [orderDate, setOrderDate] = useState(null);
  const response = 'Your order is on the way';
  const decline = 'Your order cannot be accepted at the moment';
  const currentItems = location.state.order.items;
  const currentTable = location.state.order.table;
  const navigate = useNavigate();
  useEffect(() => {
    console.log(currentItems);
    calculateSubtotals();
    calculateTotal();
    parseDate();
  }, []);

  const calculateSubtotals = () => {
    currentItems.forEach(item => {
      item['subtotal'] = item.price * item.quantity;
    });
  };

  const calculateTotal = () => {
    let tempTotal = 0;
    currentItems.forEach(item => {
      tempTotal = tempTotal + item.subtotal;
    });
    setTotal(tempTotal);
  };

  const parseDate = () => {
    let orderFullDate = new Date().toISOString().slice(0, 16);
    let dateArray = orderFullDate.split('T');
    let tempOrderDate = dateArray[0].split('-').reverse().join('/');
    let finalOrderDate = tempOrderDate + ' ' + dateArray[1];
    setOrderDate(finalOrderDate);
  };

  const checkoutOrder = async isAccepted => {
    if (isAccepted) {
      let orderId;
      const order = await createNewOrder();
      try {
        const { data } = await createNewOrderForCheckout(accessToken, order);
        orderId = data.id;
        setOrderIdToUpdate(orderId);
      } catch (error) {
        console.log(error.message);
      }
      sendMessage(response, orderId, currentTable.id);
    } else {
      sendMessage(decline, null, currentTable.id);
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
    <div className="list-container">
      <h1>Order is for table number {currentTable.number}</h1>
      <h2>
        Employee: {user.firstname} {user.lastname}
      </h2>
      <h2 className="date-heading">Date: {orderDate}</h2>
      <table className="order-checkout-table">
        <thead>
          {orderRowHeaders.map(header => (
            <th>{header}</th>
          ))}
        </thead>
        <tbody>
          {currentItems.map((item, index) => {
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
        <p>Total: </p>
        <p>
          <b>{total} HRK</b>
        </p>
      </div>
      <div className="button-container">
        <button className="button long" onClick={() => checkoutOrder(true)}>
          Checkout order
        </button>
        <button className="button clear" onClick={() => checkoutOrder(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OrderCheckout;
