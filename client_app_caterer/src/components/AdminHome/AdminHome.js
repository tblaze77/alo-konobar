import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { getSpecificBranch } from '../../apis/BranchApi';
const AdminHome = () => {
  const { logout, user, role, accessToken } = useContext(AuthContext);
  const [branch, setBranch] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user.branch != null)
      getSpecificBranch(accessToken, user.branch.id)
        .then(response => {
          console.log(response.data);
          setBranch(response.data);
        })
        .finally(() => setLoading(false));
  }, []);
  return <div>{loading ? <h1>Loading ...</h1> : <div>You are administrator of {branch.branchName} caffe</div>}</div>;
};

export default AdminHome;
