import { useContext, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { login } from './apis/AuthApi';
import Order from './pages/Order';
import AuthContext from './context/AuthContext';
import Login from './components/Login';

function App() {
  const { authenticated, accessToken, refreshToken, logout, attemptLogin } = useContext(AuthContext);

  useEffect(() => {
    login('username', 'password');
  }, []);

  return (
    <>
      {authenticated ? (
        <Routes>
          <Route path="/order" element={<Order />} />
        </Routes>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
