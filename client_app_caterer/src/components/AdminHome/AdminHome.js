import React, { useContext, useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { getSpecificBranch } from '../../apis/BranchApi';
import { getAllEmployeesOnSpecificBranch } from '../../apis/EmployeeApi';
import { getAllOrdersFromSpecificBranch } from '../../apis/OrderApi';
import { updatePaymentMethod } from '../../apis/OrderApi';
import * as RoutePaths from '../../constants/RoutePaths';
import SnackBar from '../SnackBar';
import { useSocket } from '../../hooks/useSocket';
import './AdminHome.css';
import ButtonGrid from '../ButtonGrid/ButtonGrid';

const AdminHome = () => {
  const { logout, user, role, accessToken, orderIdToUpdate } = useContext(AuthContext);
  const { table, items, paymentMethodMessage, orderId } = useSocket();
  const [branch, setBranch] = useState({});
  const [loading, setLoading] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(null);
  useEffect(() => {
    window.scroll(0, 0);
    getInfo();
    user.role.id == 2 ? setIsAdmin(true) : setIsAdmin(false);
  }, []);

  useEffect(() => {
    if (paymentMethodMessage != null) {
      let splittedString = paymentMethodMessage.split(' ');
      let paymentMethod = splittedString[6].toUpperCase();
      if (paymentMethod === 'CREDIT') paymentMethod = splittedString[7].toUpperCase();
      try {
        updatePaymentMethod(accessToken, orderIdToUpdate, paymentMethod);
      } catch (err) {
        console.log(err.message);
      }
    }
  }, [paymentMethodMessage]);

  const updateOrder = () => {
    updatePaymentMethod(accessToken, 50, 'CARD');
  };

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
            <ButtonGrid isAdmin={isAdmin} />
          </div>
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
              <SnackBar message={'Order from table number' + table.number} isSocket={true} />
            </Link>
          ) : null}
          {paymentMethodMessage ? <SnackBar message={paymentMethodMessage} isSocket={true} /> : null}
        </div>
      )}
    </div>
  );
};

export default AdminHome;
