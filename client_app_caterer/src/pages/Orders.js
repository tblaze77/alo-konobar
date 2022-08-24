import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { getAllOrdersFromSpecificBranch } from '../apis/OrderApi';
import * as RoutePaths from '../constants/RoutePaths';
import { Link } from 'react-router-dom';
import { ordersHeader } from '../constants/constants';
import LaunchIcon from '@mui/icons-material/Launch';
import './Orders.css';
const Orders = () => {
  const { user, accessToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [orderList, setOrderList] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await getAllOrdersFromSpecificBranch(accessToken, user.branch.id);
    setOrderList(data);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <h1>Loading ....</h1>
      ) : (
        <div className="list-container">
          <h1>These are orders from caffe {user.branch.branchName}</h1>
          <h2>Today's balance</h2>
          <table>
            <thead>
              {ordersHeader.map(header => (
                <th>{header}</th>
              ))}
            </thead>
            <tbody>
              {orderList.map(order => (
                <tr>
                  <td>{order.orderCode}</td>
                  <td>
                    {order.employee.firstname} {order.employee.lastname}
                  </td>
                  <td>{order.branchTableNumber}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.total} HRK</td>
                  <td>
                    <Link to={RoutePaths.BRANCH + '/' + user.branch.id + RoutePaths.ORDER + '/' + order.id}>
                      <LaunchIcon className="material-ui-icon" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Orders;
