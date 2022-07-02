import axios from 'axios';

export const getMenuForSpecificBranchTable = async tableId => {
  return await axios
    .get(`http://localhost:8080/v1/api/product/branchMenu/${tableId}`)
    .catch(error => console.log(error.message));
};

export const getNumberOfCategories = async () => {
  return await axios.get('http://localhost:8080/v1/api/category/numberOf').catch(error => console.log(error.message));
};
