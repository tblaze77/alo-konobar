import axios from 'axios';

export const createEmployee = async (accessToken, employee) => {
  return await axios.post('http://localhost:8080/v1/api/employee', employee, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getAllEmployeesOnSpecificBranch = async (accessToken, branchId) => {
  return await axios.get(`http://localhost:8080/v1/api/employee/byBranch/${branchId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
