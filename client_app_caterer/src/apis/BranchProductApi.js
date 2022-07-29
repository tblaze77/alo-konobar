import axios from 'axios';

export const getSpecificBranchProductByProductName = async (branchId, productName) => {
  return await axios
    .get(`http://localhost:8080/v1/api/branchProduct/branch/${branchId}/productName/${productName}`)
    .catch(error => console.log(error.message));
};

export const createBranchProduct = async (accessToken, branchProduct) => {
  return await axios
    .post('http://localhost:8080/v1/api/branchProduct', branchProduct, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .catch(error => console.log(error.message));
};

export const getAllBranchProductsFromSpecificBranch = async (accessToken, branchId) => {
  return await axios
    .get(`http://localhost:8080/v1/api/branchProduct/branch/${branchId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .catch(error => console.log(error.message));
};

export const getSpecificBranchProduct = async (accessToken, branchId, productId) => {
  return await axios
    .get(`http://localhost:8080/v1/api/branchProduct/branch/${branchId}/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .catch(error => console.log(error.message));
};

export const updateSpecificBranchProduct = async (accessToken, branchId, productId, branchProduct) => {
  return await axios
    .put(`http://localhost:8080/v1/api/branchProduct/branch/${branchId}/product/${productId}`, branchProduct, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .catch(error => console.log(error.message));
};
