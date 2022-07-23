import axios from 'axios';

export const createEmployee = async (accessToken, employee) => {
  return await axios.post('http://localhost:8080/v1/api/employee', employee, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
