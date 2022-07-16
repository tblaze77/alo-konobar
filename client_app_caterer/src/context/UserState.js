import React, { useState, useEffect, useContext } from 'react';
import UserContext from './UserContext';
import AuthContext from './AuthContext';
import jwt_decode from 'jwt-decode';
const UserState = props => {
  const { accessToken, authenticated } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(authenticated);
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
};

export default UserState;
