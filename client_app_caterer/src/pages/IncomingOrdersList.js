import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const IncomingOrdersList = () => {
  const { user, accessToken, incomingOrders } = useContext(AuthContext);
  return <div>{incomingOrders.length}</div>;
};

export default IncomingOrdersList;
