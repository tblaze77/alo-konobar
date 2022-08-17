import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { getAllBranches } from '../apis/BranchApi';
import SuperUserHome from '../components/SuperUserHome/SuperUserHome';
import AdminHome from '../components/AdminHome/AdminHome';

const Home = () => {
  const { logout, user, role, accessToken } = useContext(AuthContext);
  const [branchList, setBranchList] = useState([]);
  const [loading, setLoading] = useState(true);

  //testing api purposes
  useEffect(() => {
    getAllBranches(accessToken)
      .then(response => {
        setBranchList(response.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {role === 'SUPER_USER' ? <SuperUserHome /> : <AdminHome />}

          <button onClick={logout}>LOGOUT</button>
          {/* <h1 className="text-3xl font-bold underline">
            Hello {user?.username} with role {role}
          </h1>
          <div>
            <h1>All avaliable branches</h1>
            {branchList.map(branch => (
              <h2>{branch.branchName}</h2>
            ))}
          </div>
          <button onClick={logout}>LOGOUT</button> */}
        </>
      )}
    </>
  );
};

export default Home;
