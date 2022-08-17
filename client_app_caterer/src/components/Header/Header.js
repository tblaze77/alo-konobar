import React, { useContext } from 'react';
import './Header.css';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';
const Header = () => {
  const { user, role, logout } = useContext(AuthContext);

  return (
    <div className="header">
      <div className="header-container">
        <div className="invisible-div"></div>
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
        <button className="button logout" onClick={logout}>
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default Header;
