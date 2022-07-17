import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { login, getEmployeeByUsername, refreshExisitingToken } from '../apis/AuthApi';
import jwt_decode from 'jwt-decode';

const AuthState = props => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('access_token') ? true : false);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token'));
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAuthenticated(false);
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    setRole(null);
  };

  useEffect(() => {
    if (authenticated == true) {
      getUser(accessToken);
    }
    instantiateRefreshToken();
  }, []);

  const instantiateRefreshToken = () => {
    setInterval(() => {
      refreshExisitingToken(localStorage.getItem('access_token'))
        .then(response => {
          setAccessToken(response.data.access_token);

          setRefreshToken(response.data.refresh_token);
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('refresh_token', response.data.refresh_token);
          console.log('token has been refreshed');
        })
        .catch(err => {
          console.log(err.message);
          logout();
        });
    }, 45000);
  };

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
        tempToken = response.data.access_token;
        setAccessToken(response.data.access_token);
        setRefreshToken(response.data.refresh_token);
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
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
