import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getSpecificOrder } from '../apis/OrderApi';
import AuthContext from '../context/AuthContext';
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
    <div>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div>
          <h1>Employee: </h1>
          <h2>
            {order.employee.firstname} {order.employee.lastname}
          </h2>
          <h1>Order Date: </h1>
          <h2>{order.orderDate}</h2>
          <h1>Table number: </h1>
          <h2>{order.branchTableNumber}</h2>

          <h1>
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
          </h1>
        </div>
      )}
    </div>
  );
};

export default IndividualOrder;
