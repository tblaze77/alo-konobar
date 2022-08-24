import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { productsConverter } from '../utils/EntityConverter';
import { getAllEmployeesOnSpecificBranch } from '../apis/EmployeeApi';
import { getAllTablesFromSpecificBranch } from '../apis/BranchTableApi';
import { createNewOrder } from '../apis/OrderApi';
import { getAllBranchProductsFromSpecificBranch } from '../apis/BranchProductApi';
import Select from '../components/Form/Select';
import './OrderForm.css';
import SnackBar from '../components/SnackBar';

const OrderForm = () => {
  const { user, accessToken } = useContext(AuthContext);
  let navigate = useNavigate();
  const [branchTableList, setBranchTableList] = useState([]);
  const [branchTable, setBranchTable] = useState('');
  const [branchProducts, setBranchProducts] = useState([]);
  const [branchProduct, setBranchProduct] = useState({
    id: '',
  });
  const [employeeList, setEmployeeList] = useState([]);
  const [employee, setEmployee] = useState('');
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [orderRows, setOrderRows] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

  useEffect(() => {
    getInfo();
  }, [loading, orderRows]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    setOrderRows(oldArray => [...oldArray, orderRow]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newOrderRows = orderRows.map(({ productName, price, ...attributesToKeep }) => attributesToKeep);
    let orderFullDate = new Date().toISOString().slice(0, 16);
    let dateArray = orderFullDate.split('T');
    let tempOrderDate = dateArray[0].split('-').reverse().join('/');
    let orderDate = tempOrderDate + ' ' + dateArray[1];

    const order = {
      branchId: user.branch.id,
      tableId: branchTable.id,
      employeeId: employee.id,
      orderRows: newOrderRows,
      orderDate: orderDate,
    };
    try {
      await createNewOrder(accessToken, order);
      setShowSnackbar(true);
      setIsError(false);
      setIsSubmitButtonDisabled(true);
      setTimeout(() => {
        navigate(-1);
        clearState();
      }, 3000);
    } catch (err) {
      setShowSnackbar(true);
      setIsError(true);
      setIsSubmitButtonDisabled(true);
      setTimeout(() => {
        setShowSnackbar(false);
        setIsError(null);
        setIsSubmitButtonDisabled(false);
      }, 3000);
    }
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
                  disabled={branchProduct.id === '' ? true : false}
                  type="number"
                  value={quantity}
                  min={1}
                  step={1}
                  onChange={e => setQuantity(e.target.value)}
                />
                <button
                  className="button wider"
                  disabled={branchProduct.id === '' ? true : false}
                  type="submit"
                  onClick={handleOrderRowSubmit}
                >
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

          <button
            className="button wider"
            disabled={isSubmitButtonDisabled || orderRows.length == 0 ? true : false}
            onClick={handleSubmit}
          >
            Submit an order
          </button>
          {showSnackbar ? (
            <SnackBar
              message={isError ? 'Ooops... something went wrong' : 'Successfully added a new order'}
              isError={isError}
            />
          ) : null}
        </div>
      )}
    </>
  );
};

export default OrderForm;
