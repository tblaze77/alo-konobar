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
    const interval_id = window.setInterval(function () {}, Number.MAX_SAFE_INTEGER);

    // Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAuthenticated(false);
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    setRole(null);
  };

  useEffect(() => {
    console.log('usa san u useffect od authstate');
    if (authenticated == true) {
      getUser(accessToken);
    }
  }, []);

  const instantiateRefreshToken = () => {
    const interval_id = window.setInterval(function () {}, Number.MAX_SAFE_INTEGER);

    // Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }
    setInterval(() => {
      //const refresh_token = localStorage.getItem('refresh_token');
      refreshExisitingToken(localStorage.getItem('refresh_token'))
        .then(response => {
          console.log('refreshed token');
          setAccessToken(response.data.access_token);
          setRefreshToken(response.data.refresh_token);
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('refresh_token', response.data.refresh_token);
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
        console.log('instaciran refresh tokena');
        instantiateRefreshToken();
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
