import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import * as RoutePaths from '../constants/RoutePaths';
import { getAllEmployeesOnSpecificBranch } from '../apis/EmployeeApi';
import DeleteIcon from '@mui/icons-material/Delete';
import './Dashboard.css';
const Dashboard = () => {
  const { user, role, accessToken } = useContext(AuthContext);
  const [employees, setEmployees] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const { data } = await getAllEmployeesOnSpecificBranch(accessToken, user.branch.id);
    setEmployees(data);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="list-container">
          <h1>Hello, {user.username}</h1>
          <>
            {role === 'ADMIN' ? (
              <>
                <h2>You are an administrator of {user.branch.branchName}</h2>
                <button className="button long">
                  <Link to={RoutePaths.BRANCH + '/' + user.branch.id + RoutePaths.EMPLOYEE + RoutePaths.CREATE}>
                    Add caffe employee
                  </Link>
                </button>
                <button className="button long">Add new products</button>
                <h2>Your employees:</h2>
                <ul>
                  {employees.map(employee => (
                    <div className="employee-row">
                      <p>
                        {employee.firstname} {employee.lastname}
                      </p>
                      <DeleteIcon className="delete-icon-mui" />
                    </div>
                  ))}
                </ul>
              </>
            ) : null}
          </>
        </div>
      )}
    </>
  );
};

export default Dashboard;
