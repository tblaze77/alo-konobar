import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { getSpecificBranch } from '../../apis/BranchApi';
import { getAllEmployeesOnSpecificBranch } from '../../apis/EmployeeApi';
import * as RoutePaths from '../../constants/RoutePaths';
const AdminHome = () => {
  const { logout, user, role, accessToken } = useContext(AuthContext);
  const [branch, setBranch] = useState({});
  const [loading, setLoading] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const responses = await Promise.all([
      getSpecificBranch(accessToken, user.branch.id),
      getAllEmployeesOnSpecificBranch(accessToken, user.branch.id),
    ]);
    // setBranch(responses[0]);
    // setBranchAdmins(responses[1]);

    setBranch(responses[0].data);
    setEmployeeList(responses[1].data);
  };
  return (
    <div>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div>
          <h1>You are administrator of {branch.branchName} caffe</h1>
          <ul>
            {employeeList.map(employee => (
              <li>
                {employee.firstname} {employee.lastname}
              </li>
            ))}
          </ul>
          <button>
            <Link to={RoutePaths.BRANCH + '/' + user.branch.id + RoutePaths.EMPLOYEE + RoutePaths.CREATE}>
              Add caffe employee
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
