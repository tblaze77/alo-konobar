import axios from 'axios';

export const getAllBranches = async accessToken => {
  return await axios.get('http://localhost:8080/v1/api/branch', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
