import axios from 'axios';

export const getAllOrdersFromSpecificBranch = async (accessToken, branchId) => {
  return await axios.get(`http://localhost:8080/v1/api/order/byBranch/${branchId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
