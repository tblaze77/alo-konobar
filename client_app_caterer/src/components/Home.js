import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const { logout, user, role, loading } = useContext(AuthContext);

  return (
    <>
      <>
        <h1 className="text-3xl font-bold underline">
          Hello {user?.username} with role {role}
        </h1>
        <button onClick={logout}>LOGOUT</button>
      </>
    </>
  );
};

export default Home;
