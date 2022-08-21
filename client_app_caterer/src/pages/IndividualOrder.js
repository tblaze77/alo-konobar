import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getSpecificOrder } from '../apis/OrderApi';
import AuthContext from '../context/AuthContext';
import './IndividualOrder.css';
const IndividualOrder = () => {
  const { orderId, branchId } = useParams();
  const { user, accessToken } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const { data } = await getSpecificOrder(accessToken, orderId);
    console.log(data);
    setOrder(data);
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div className="list-container">
          <div className="order-row">
            <p>
              <b>Order code:</b>
            </p>
            <p>{order.orderCode}</p>
          </div>
          <div className="order-row">
            <p>
              <b>Employee: </b>
            </p>
            <p>
              {order.employee.firstname} {order.employee.lastname}
            </p>
          </div>
          <div className="order-row">
            <p>
              <b>Order Date:</b>{' '}
            </p>{' '}
            <p>{order.orderDate}</p>
          </div>
          <div className="order-row">
            <p>
              <b>Table numb</b>er:{' '}
            </p>
            <p>{order.branchTableNumber}</p>
          </div>

          <div>
            <b>Order rows:</b>
            <ul>
              {order.orderRowsGetDto.map(orderRow => (
                <div>
                  <h3>
                    <b>{orderRow.branchProduct.product.productName}</b>
                  </h3>
                  <h3>{orderRow.branchProduct.unitPrice} HRK</h3>
                  <h3>{orderRow.quantity}</h3>
                  <h3>{orderRow.subtotal} HRK</h3>
                </div>
              ))}
            </ul>
            <div>Total: {order.total} HRK</div>
          </div>
        </div>
      )}
    </>
  );
};

export default IndividualOrder;
