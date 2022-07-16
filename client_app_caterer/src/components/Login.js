import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import AuthContext from '../context/AuthContext';
import { useLocation } from 'react-router';
const Login = props => {
  const { setAuthenticated, authenticated } = useContext(AuthContext);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (!authenticated) {
      setTimeout(() => {
        console.log(authenticated);
        setAuthenticated(true);
      }, 5000);
    } else {
      navigate('/');
    }
  }, [authenticated]);

  return <div>Login</div>;
};

export default Login;
