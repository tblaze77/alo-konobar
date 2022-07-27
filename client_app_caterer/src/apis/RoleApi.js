import axios from 'axios';

export const getAllRoles = async accessToken => {
  return await axios.get('http://localhost:8080/v1/api/role', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
