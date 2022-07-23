import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSpecificBranch, getAdministratorsOfSpecificBranch } from '../apis/BranchApi';
import AuthContext from '../context/AuthContext';
import * as RoutePaths from '../constants/RoutePaths';

const Branch = () => {
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [branchAdmins, setBranchAdmins] = useState([]);
  const { logout, user, role, accessToken } = useContext(AuthContext);
  const { branchId } = useParams();
  useEffect(() => {
    console.log(branchId);
    getSpecificBranch(accessToken, branchId)
      .then(response => setBranch(response.data))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));

    getInfo();
  }, []);

  const getInfo = async () => {
    const responses = await Promise.all([
      getSpecificBranch(accessToken, branchId),
      getAdministratorsOfSpecificBranch(accessToken, branchId),
    ]);
    // setBranch(responses[0]);
    // setBranchAdmins(responses[1]);

    setBranch(responses[0].data);
    setBranchAdmins(responses[1].data);
  };

  return (
    <div>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div>
          <h1>
            {branch.branchName} {branch.address} {branch.description}
          </h1>
          <h2>Branch administrators</h2>
          <ul>
            {branchAdmins.map(branchAdmin => (
              <li>
                {branchAdmin.firstname} {branchAdmin.lastname}
              </li>
            ))}
          </ul>
          <button>
            <Link to={RoutePaths.BRANCH + '/' + branchId + RoutePaths.ADMIN + RoutePaths.CREATE}>
              Create new branch administrator
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Branch;
