import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { productsConverter } from '../utils/EntityConverter';
import { getAllEmployeesOnSpecificBranch } from '../apis/EmployeeApi';
import { getAllTablesFromSpecificBranch } from '../apis/BranchTableApi';
import { getAllBranchProductsFromSpecificBranch } from '../apis/BranchProductApi';
import Select from '../components/Form/Select';

const OrderForm = () => {
  const { user, accessToken } = useContext(AuthContext);
  const [branchTableList, setBranchTableList] = useState([]);
  const [branchTable, setBranchTable] = useState('');
  const [branchProducts, setBranchProducts] = useState([]);
  const [branchProduct, setBranchProduct] = useState('');
  const [employeeList, setEmployeeList] = useState([]);
  const [employee, setEmployee] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInfo();
  }, [loading]);

  const getInfo = async () => {
    const responses = await Promise.all([
      getAllEmployeesOnSpecificBranch(accessToken, user.branch.id),
      getAllTablesFromSpecificBranch(accessToken, user.branch.id),
      getAllBranchProductsFromSpecificBranch(accessToken, user.branch.id),
    ]);
    setEmployeeList(responses[0].data);
    setBranchTableList(responses[1].data);
    setBranchProducts(responses[2].data);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>Create new order</h1>
          <Select
            key="employee"
            APIMethod={getAllEmployeesOnSpecificBranch}
            changeState={setEmployee}
            id="employee"
            label="Select employee"
            isSelected={employee}
            paramId={user.branch.id}
          />
          <Select
            key="table"
            APIMethod={getAllTablesFromSpecificBranch}
            changeState={setBranchTable}
            id="table"
            label="Select table"
            isSelected={branchTable}
            paramId={user.branch.id}
          />
          <Select
            key="product"
            APIMethod={getAllBranchProductsFromSpecificBranch}
            changeState={setBranchProduct}
            id="branchProduct"
            label="Select product"
            isSelected={branchProduct}
            paramId={user.branch.id}
          />
        </div>
      )}
    </>
  );
};

export default OrderForm;
