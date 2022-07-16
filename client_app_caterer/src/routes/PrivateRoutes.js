import { Outlet, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoutes = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, []);

  let { authenticated } = useContext(AuthContext);
  return authenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location.pathname }} />;
};

export default PrivateRoutes;
