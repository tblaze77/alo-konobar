import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
const Dashboard = () => {
  const { user, role } = useContext(AuthContext);
  return (
    <div className="list-container">
      <h1>Hello, {user.username}</h1>
      <h2>{role === 'ADMIN' ? `You are an administrator of ${user.branch.branchName}` : null}</h2>
    </div>
  );
};

export default Dashboard;
