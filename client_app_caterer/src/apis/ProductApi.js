import axios from 'axios';

export const getAllProducts = async accessToken => {
  return await axios.get('http://localhost:8080/v1/api/product', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getSpecificProduct = async (accessToken, productId) => {
  return await axios.get(`http://localhost:8080/v1/api/product/${productId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getAllProductsBySpecificBranch = async (accessToken, branchId) => {
  return await axios.get(`http://localhost:8080/v1/api/product/byBranch/${branchId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
