import { useContext, useEffect } from 'react';
import { Routes, Route, Link, Redirect } from 'react-router-dom';
import { login } from './apis/AuthApi';
import AuthContext from './context/AuthContext';
import Login from './components/Login/Login';
import Home from './components/Home';
import PrivateRoutes from './routes/PrivateRoutes';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
