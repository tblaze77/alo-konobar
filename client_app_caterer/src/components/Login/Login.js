import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import AuthContext from '../../context/AuthContext';
import { login } from '../../apis/AuthApi';
import './Login.css';
import SnackBar from '../SnackBar';

const Login = props => {
  const { setAuthenticated, authenticated, attemptLogin } = useContext(AuthContext);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (authenticated) {
      navigate('/');
    }
  }, [authenticated]);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await attemptLogin(username, password);
    if (!response) {
      setIsError(true);
      clearState();
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const onChange = e => {
    if (e.target.name === 'username') setUserName(e.target.value);
    else if (e.target.name === 'password') setPassword(e.target.value);
  };

  const clearState = () => {
    setUserName('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-row">
          <label className="text-label">Username:</label>
          <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} />
        </div>

        <div className="input-row">
          <label className="text-label">Password:</label>
          <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} />
        </div>

        <button className="login button">Sign in</button>
        {isError ? <SnackBar message={'Invalid username or password'} isError={isError} /> : null}
      </form>
    </div>
  );
};

export default Login;
