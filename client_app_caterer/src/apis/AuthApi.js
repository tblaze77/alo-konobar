import axios from 'axios';
import qs from 'qs';

export const login = async (userName, password) => {
  return await axios.post('http://localhost:8080/login', qs.stringify({ username: userName, password: password }), {
    'Access-Control-Allow-Origin': 'http://localhost:8080/login',
  });
};

export const getEmployeeByUsername = async username => {
  return await axios
    .get(`http://localhost:8080/v1/api/employee/byUsername/${username}`)
    .catch(err => console.log(err.message));
};

export const refreshExisitingToken = async refreshToken => {
  return await axios.get('http://localhost:8080/v1/api/employee/token/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
};
