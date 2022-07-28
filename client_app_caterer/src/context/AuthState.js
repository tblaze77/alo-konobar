import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { login, getEmployeeByUsername, refreshExisitingToken } from '../apis/AuthApi';
import jwt_decode from 'jwt-decode';
import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';

const AuthState = props => {
  const [accessToken, setAccessToken] = useState(null);
  const [authenticated, setAuthenticated] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
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
    if (localStorage.getItem('access_token') != null) {
      afterRefresh();
    }
  }, []);

  const afterRefresh = async () => {
    await getUser(localStorage.getItem('access_token'));
    setAccessToken(localStorage.getItem('access_token'));
    setRefreshToken(localStorage.getItem('refresh_token'));
    setAuthenticated(true);
  };

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
    }, 1700000);
  };

  const getUser = async token => {
    console.log(token);
    const decoded = jwt_decode(token);

    const { data } = await getEmployeeByUsername(decoded.sub);
    setUser(data);
    setRole(data.role.name);
  };

  const attemptLogin = async (username, password) => {
    const { data } = await login(username, password);
    console.log(data);
    setAccessToken(data.access_token);
    setRefreshToken(data.refresh_token);
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    await getUser(data.access_token);
    instantiateRefreshToken();
    setAuthenticated(true);
    // .then(response => {
    //   setAuthenticated(true);
    //   tempToken = response.data.access_token;
    //   setAccessToken(response.data.access_token);
    //   setRefreshToken(response.data.refresh_token);
    //   localStorage.setItem('access_token', response.data.access_token);
    //   localStorage.setItem('refresh_token', response.data.refresh_token);
    //   console.log('instaciran refresh tokena');
    //   instantiateRefreshToken();
    // })
    // .catch(error => {
    //   console.log(error.message);
    // })
    // .finally(() => getUser(tempToken));
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
