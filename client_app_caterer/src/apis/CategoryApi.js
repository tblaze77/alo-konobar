import axios from 'axios';

export const getAllCategories = async accessToken => {
  return await axios.get('http://localhost:8080/v1/api/category', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
