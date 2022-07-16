import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { login, getEmployeeByUsername } from '../apis/AuthApi';
import jwt_decode from 'jwt-decode';

const AuthState = props => {
  const [authenticated, setAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const logout = () => {
    setAuthenticated(false);
    localStorage.removeItem('access_token');
  };

  useEffect(() => {
    // if (localStorage.getItem('access_token') != null) {
    //   setAuthenticated(true);
    //   setAccessToken(localStorage.getItem('access_token'));
    // }
  }, []);

  const getUser = token => {
    console.log(token);
    const decoded = jwt_decode(token);

    getEmployeeByUsername(decoded.sub).then(response => {
      console.log(response.data);
      setUser(response.data);
      setRole(response.data.role.name);
    });
  };

  const attemptLogin = (username, password) => {
    let tempToken = null;
    login(username, password)
      .then(response => {
        setAuthenticated(true);
        console.log(response.data.access_token);
        tempToken = response.data.access_token;
        setAccessToken(response.data.access_token);
        setRefreshToken(response.data.refresh_token);
        localStorage.setItem('access_token', response.data.access_token);
      })
      .catch(error => {
        console.log(error.message);
      })
      .finally(() => getUser(tempToken));
  };

  return (
    <AuthContext.Provider
      value={{ setAuthenticated, authenticated, accessToken, refreshToken, logout, attemptLogin, user, role }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
