import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import AuthContext from '../../context/AuthContext';
import { login } from '../../apis/AuthApi';
import './Login.css';

const Login = props => {
  const { setAuthenticated, authenticated, attemptLogin } = useContext(AuthContext);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate('/');
    }
  }, [authenticated]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(attemptLogin(username, password));
  };

  const onChange = e => {
    if (e.target.name === 'username') setUserName(e.target.value);
    else if (e.target.name === 'password') setPassword(e.target.value);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-row">
          <label className="text-label">Username:</label>
          <input type="text" placeholder="username" name="username" value={username} onChange={onChange} />
        </div>

        <div className="input-row">
          <label className="text-label">Password:</label>
          <input type="password" placeholder="username" name="password" value={password} onChange={onChange} />
        </div>

        <button className="login button">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
