import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { getAllBranches } from '../../apis/BranchApi';
const SuperUserHome = () => {
  const [branchList, setBranchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout, user, role, accessToken } = useContext(AuthContext);
  useEffect(() => {
    getAllBranches(accessToken)
      .then(response => setBranchList(response.data))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2>Branch list</h2>
      <div>
        {loading ? (
          <h1>Loading ...</h1>
        ) : (
          <ul>
            {branchList.map(branch => {
              let linkToPage = '/branch/' + branch.id;
              return (
                <li>
                  <Link to={linkToPage}>{branch.branchName}</Link>
                </li>
              );
            })}
          </ul>
        )}
        <Link to="/branch/create">
          <button>Create new Branch</button>
        </Link>
      </div>
    </div>
  );
};

export default SuperUserHome;
