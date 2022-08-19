import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { getAllBranches } from '../../apis/BranchApi';
import './SuperUserHome.css';
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
    <div className="list-container">
      <h2>Caffes registered in your app</h2>
      <div>
        {loading ? (
          <h1>Loading ...</h1>
        ) : (
          <ul className="branch-list">
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
