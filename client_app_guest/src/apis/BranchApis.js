import axios from 'axios';

export const getSpecificBranchTable = async tableId => {
  return await axios
    .get(`http://localhost:8080/v1/api/branchTable/${tableId}`)
    .catch(error => console.log(error.message));
};
