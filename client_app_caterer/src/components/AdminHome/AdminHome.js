import React, { useContext, useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { getSpecificBranch } from '../../apis/BranchApi';
import { getAllEmployeesOnSpecificBranch } from '../../apis/EmployeeApi';
import { getAllOrdersFromSpecificBranch } from '../../apis/OrderApi';
import * as RoutePaths from '../../constants/RoutePaths';
import SnackBar from '../SnackBar';
import { useSocket } from '../../hooks/useSocket';
import './AdminHome.css';
import ButtonGrid from '../ButtonGrid/ButtonGrid';

const AdminHome = () => {
  const { logout, user, role, accessToken } = useContext(AuthContext);
  const { table, items, paymentMethodMessage } = useSocket();
  const [branch, setBranch] = useState({});
  const [loading, setLoading] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(null);
  useEffect(() => {
    getInfo();
    user.role.id == 2 ? setIsAdmin(true) : setIsAdmin(false);
  }, []);

  const getInfo = async () => {
    const responses = await Promise.all([
      getSpecificBranch(accessToken, user.branch.id),
      getAllEmployeesOnSpecificBranch(accessToken, user.branch.id),
      getAllOrdersFromSpecificBranch(accessToken, user.branch.id),
    ]);

    setBranch(responses[0].data);
    setEmployeeList(responses[1].data);
    setOrderList(responses[2].data);
  };
  return (
    <div>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div>
          <div className="list-container">
            {/* <ul>
              {orderList.map(order => (
                <Link to={RoutePaths.BRANCH + '/' + user.branch.id + RoutePaths.ORDER + '/' + order.id}>
                  <li>
                    {order.total} HRK on {order.orderDate}
                  </li>
                </Link>
              ))}
            </ul> */}
            <ButtonGrid isAdmin={isAdmin} />
          </div>
          {/* {isAdmin ? (
            <button>
              <Link to={RoutePaths.PRODUCTS}>Add new products to caffe</Link>
            </button>
          ) : null}
          <button>
            <Link to={RoutePaths.BRANCH + '/' + branch.id + RoutePaths.BRANCH_PRODUCTS}>
              View Products from your caffe
            </Link>
          </button>
          <button>
            <Link to={RoutePaths.BRANCH + '/' + branch.id + RoutePaths.ORDER + RoutePaths.CREATE}>
              Create new order
            </Link>
          </button> */}

          {items ? (
            <Link
              to={RoutePaths.BRANCH + '/' + user.branch.id + RoutePaths.ORDER + RoutePaths.CHECKOUT}
              state={{
                order: {
                  items,
                  table,
                },
              }}
            >
              <SnackBar message={'Order from table number' + table.number} />
            </Link>
          ) : null}
          {paymentMethodMessage ? <SnackBar message={paymentMethodMessage} /> : null}
        </div>
      )}
    </div>
  );
};

export default AdminHome;
