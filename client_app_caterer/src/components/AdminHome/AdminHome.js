import React, { useContext, useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { getSpecificBranch } from '../../apis/BranchApi';
import { getAllEmployeesOnSpecificBranch } from '../../apis/EmployeeApi';
import { getAllOrdersFromSpecificBranch } from '../../apis/OrderApi';
import * as RoutePaths from '../../constants/RoutePaths';
const AdminHome = () => {
  const { logout, user, role, accessToken } = useContext(AuthContext);
  const [branch, setBranch] = useState({});
  const [loading, setLoading] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    getInfo();
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
          <h1>You are administrator of {branch.branchName} caffe</h1>
          <ul>
            {employeeList.map((employee, index) => (
              <li key={index}>
                {employee.firstname} {employee.lastname}
              </li>
            ))}
          </ul>
          <button>
            <Link to={RoutePaths.BRANCH + '/' + user.branch.id + RoutePaths.EMPLOYEE + RoutePaths.CREATE}>
              Add caffe employee
            </Link>
          </button>
          <h1>Today Orders</h1>
          <ul>
            {orderList.map(order => (
              <li>
                {order.total} on {order.orderDate}
              </li>
            ))}
          </ul>
          <button>
            <Link to={RoutePaths.PRODUCTS}>Add new products to caffe</Link>
          </button>
          <button>
            <Link to={RoutePaths.BRANCH + '/' + branch.id + RoutePaths.BRANCH_PRODUCTS}>
              View Products from your caffe
            </Link>
          </button>
          <button>
            <Link to={RoutePaths.BRANCH + '/' + branch.id + RoutePaths.ORDER + RoutePaths.CREATE}>
              Create new order
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
