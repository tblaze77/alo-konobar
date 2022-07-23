import axios from 'axios';

export const getAllBranches = async accessToken => {
  return await axios.get('http://localhost:8080/v1/api/branch', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getSpecificBranch = async (accessToken, branchId) => {
  return await axios.get(`http://localhost:8080/v1/api/branch/${branchId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const createBranch = async (accessToken, branch) => {
  await axios.post('http://localhost:8080/v1/api/branch', branch, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getAdministratorsOfSpecificBranch = async (accessToken, branchId) => {
  return await axios.get(`http://localhost:8080/v1/api/employee/getAdminsOfBranch/${branchId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
