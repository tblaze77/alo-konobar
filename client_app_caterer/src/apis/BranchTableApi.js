import axios from 'axios';

export const getAllTablesFromSpecificBranch = async (accessToken, branchId) => {
  return await axios.get(`http://localhost:8080/v1/api/branchTable/byBranch/${branchId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getSpecificBranchTable = async (accessToken, branchId) => {
  return await axios.get(`http://localhost:8080/v1/api/branchTable/${branchId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
