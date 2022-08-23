import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthState from './context/AuthState';
import UserState from './context/UserState';
import WithRouter from './hooks/ComponentWithRouterProp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthState>
    <UserState>
      <BrowserRouter>
        {/* <WithRouter> */}
        <App />
        {/* </WithRouter> */}
      </BrowserRouter>
    </UserState>
  </AuthState>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
