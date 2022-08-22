import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { productsConverter } from '../utils/EntityConverter';
import { getAllEmployeesOnSpecificBranch } from '../apis/EmployeeApi';
import { getAllTablesFromSpecificBranch } from '../apis/BranchTableApi';
import { createNewOrder } from '../apis/OrderApi';
import { getAllBranchProductsFromSpecificBranch } from '../apis/BranchProductApi';
import Select from '../components/Form/Select';
import './OrderForm.css';

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
        <div className="list-container">
          <h1>Create new order</h1>
          <div className="select-container">
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
          </div>

          <div className="order-row-form">
            <div className="before-table">
              <Select
                key="product"
                APIMethod={getAllBranchProductsFromSpecificBranch}
                changeState={setBranchProduct}
                id="branchProduct"
                label="Select product"
                isSelected={branchProduct}
                paramId={user.branch.id}
              />
              <div className="quantity-button">
                <label>
                  <b>Quantity:</b>
                </label>
                <input
                  className="quantity-input"
                  type="number"
                  value={quantity}
                  min={1}
                  step={1}
                  onChange={e => setQuantity(e.target.value)}
                />
                <button className="button wider" type="submit" onClick={handleOrderRowSubmit}>
                  Add order row
                </button>
              </div>
            </div>
            <table className="order-row-table">
              <thead>
                <th>Name</th>
                <th>Unit price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </thead>
              <tbody>
                {orderRows.map(orderRow => {
                  return (
                    <tr className="order-row-info">
                      <td>{orderRow.productName}</td> <td>{orderRow.price} HRK</td> <td>{orderRow.quantity}</td>
                      <td>{orderRow.total} HRK</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <button className="button wider" onClick={handleSubmit}>
            Submit an order
          </button>
        </div>
      )}
    </>
  );
};

export default OrderForm;
