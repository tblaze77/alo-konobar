import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { productsConverter } from '../utils/EntityConverter';
import { getAllEmployeesOnSpecificBranch } from '../apis/EmployeeApi';
import { getAllTablesFromSpecificBranch } from '../apis/BranchTableApi';
import { createNewOrder } from '../apis/OrderApi';
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
  const [quantity, setQuantity] = useState(1);
  const [orderRows, setOrderRows] = useState([]);

  useEffect(() => {
    console.log('usa san u use effect');
    getInfo();
    console.log(orderRows);
  }, [loading, orderRows]);

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

  const handleOrderRowSubmit = async e => {
    e.preventDefault();
    const foundBranchProduct = branchProducts.find(bProduct => bProduct.product.productName === branchProduct.id);
    let total = quantity * foundBranchProduct.price;
    const orderRow = {
      productId: foundBranchProduct.product.id,
      productName: foundBranchProduct.product.productName,
      price: foundBranchProduct.price,
      quantity: quantity,
      total: total,
    };
    console.log(orderRow.total);
    setOrderRows(oldArray => [...oldArray, orderRow]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newOrderRows = orderRows.map(({ productName, price, ...attributesToKeep }) => attributesToKeep);
    let orderFullDate = new Date().toISOString().slice(0, 16);
    let dateArray = orderFullDate.split('T');
    let tempOrderDate = dateArray[0].split('-').reverse().join('/');
    console.log(tempOrderDate);
    console.log(dateArray[1]);
    let orderDate = tempOrderDate + ' ' + dateArray[1];

    const order = {
      branchId: user.branch.id,
      tableId: branchTable.id,
      employeeId: employee.id,
      orderRows: newOrderRows,
      orderDate: orderDate,
    };
    const response = await createNewOrder(accessToken, order);
    console.log(response);
    clearState();
  };

  const clearState = () => {
    setEmployee('');
    setBranchProduct('');
    setBranchTable('');
    setOrderRows([]);
    setQuantity(1);
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
          <div className="orderRow form">
            <Select
              key="product"
              APIMethod={getAllBranchProductsFromSpecificBranch}
              changeState={setBranchProduct}
              id="branchProduct"
              label="Select product"
              isSelected={branchProduct}
              paramId={user.branch.id}
            />
            <label>Quantity</label>
            <input type="number" value={quantity} min={1} step={1} onChange={() => setQuantity(quantity + 1)} />
            <button type="submit" onClick={handleOrderRowSubmit}>
              Add new order row
            </button>
          </div>

          <div>
            {orderRows.map(orderRow => {
              return (
                <div>
                  <h1>{orderRow.productName}</h1> <h1>Unit price: {orderRow.price}</h1> <h1>{orderRow.quantity}</h1>
                  <h1>Total {orderRow.total}</h1>
                </div>
              );
            })}
          </div>
          <button onClick={handleSubmit}>Submit an order</button>
        </div>
      )}
    </>
  );
};

export default OrderForm;
