import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSpecificBranch } from '../apis/BranchApi';
import AuthContext from '../context/AuthContext';
const Branch = () => {
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout, user, role, accessToken } = useContext(AuthContext);
  const { branchId } = useParams();
  useEffect(() => {
    getSpecificBranch(accessToken, branchId)
      .then(response => setBranch(response.data))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div>
          {branch.branchName} {branch.address} {branch.description}
        </div>
      )}
    </div>
  );
};

export default Branch;
