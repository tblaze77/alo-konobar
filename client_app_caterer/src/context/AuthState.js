import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { login } from '../apis/AuthApi';

const AuthState = props => {
  const [authenticated, setAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const logout = () => {
    setAuthenticated(false);
    localStorage.removeItem('access_token');
  };

  useEffect(() => {
    console.log('u use effectu contexta sam');
    console.log(localStorage.getItem('access_token'));
    if (localStorage.getItem('access_token') != null) {
      setAuthenticated(true);
    }
  }, []);

  const attemptLogin = (username, password) => {
    login(username, password)
      .then(response => {
        setAuthenticated(true);
        setAccessToken(response.data.access_token);
        setRefreshToken(response.data.refresh_token);
        localStorage.setItem('access_token', response.data.access_token);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <AuthContext.Provider value={{ setAuthenticated, authenticated, accessToken, refreshToken, logout, attemptLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
