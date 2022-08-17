import React, { useContext } from 'react';
import './Header.css';
import AuthContext from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import * as RoutePaths from '../../constants/RoutePaths';
const Header = () => {
  const { user, role, logout } = useContext(AuthContext);
  let navigate = useNavigate();

  const redirectToDashboard = () => {
    navigate('/dashboard');
  };
  return (
    <div className="header">
      <div className="header-container">
        <div className="header-info">
          <Link to={'/'}>
            {role === 'SUPER_USER' ? (
              <p>Welcome, super user</p>
            ) : user ? (
              <p>Caffe bar {user.branch.branchName}</p>
            ) : (
              <p>Please log in into our App</p>
            )}
          </Link>
        </div>
        <div className="logout-container">
          {user ? (
            <>
              <PersonIcon className="material-ui-icon" onClick={redirectToDashboard} />
              <LogoutIcon className="material-ui-icon" onClick={logout} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
