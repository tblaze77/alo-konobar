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
