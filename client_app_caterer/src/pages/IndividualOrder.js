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
    window.scrollTo(0, 0);
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
          <div className="heading-row">
            <h1>
              <b>Order code:</b>
            </h1>
            <p>
              <b>{order.orderCode}</b>
            </p>
          </div>
          <div className="order-row">
            <h2>Employee:</h2>
            <p>
              <b>
                {order.employee.firstname} {order.employee.lastname}
              </b>
            </p>
          </div>
          <div className="order-row">
            <h2>Order Date:</h2>
            <p>
              <b>{order.orderDate}</b>
            </p>
          </div>
          <div className="order-row">
            <h2>Table number:</h2>
            <p>
              <b>{order.branchTableNumber}</b>
            </p>
          </div>

          <div className="table-header-container">
            <h3>Order rows:</h3>
            <table className="order-row-table">
              <thead>
                <th>Name</th>
                <th>Unit price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </thead>
              <tbody>
                {order.orderRowsGetDto.map(orderRow => (
                  <tr>
                    <td>{orderRow.branchProduct.product.productName}</td>
                    <td>{orderRow.branchProduct.unitPrice} HRK</td>
                    <td>{orderRow.quantity}</td>
                    <td>{orderRow.subtotal} HRK</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <b>Total: </b>
              <b>{order.total} HRK</b>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IndividualOrder;
