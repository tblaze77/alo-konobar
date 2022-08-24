import React, { useDeferredValue, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMenuForSpecificBranchTable, getNumberOfCategories } from '../apis/MenuApis';
import { getSpecificBranchTable } from '../apis/BranchApis';
import { calculateTotal } from '../utils/Utils';
import { useSocket } from '../hooks/useSocket';
import './Menu.css';
import Snackbar from '../components/Snackbar';

const Menu = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const { sendOrder, responseMessage, shouldRedirect, changeResponseMessage, isAccepted } = useSocket(tableId);
  const [loading, setLoading] = useState(true);
  const [categorizedArticles, setCategorizedArticles] = useState([[]]);
  const [branchTable, setBranchTable] = useState({});
  const [quantityChanged, setQuantityChanged] = useState(true);
  const [orderObject, setOrderObject] = useState(null);
  const [isDisabledSubmitButton, setIsDisabledSubmitButton] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log('usa san u use effect od should redirect');
    if (shouldRedirect) {
      navigate(`checkoutOrder`, { state: orderObject });
    }
  }, [shouldRedirect]);

  useEffect(() => {
    let tempTotal = calculateTotal(categorizedArticles);
    if (tempTotal != 0) setIsDisabledSubmitButton(false);
    else setIsDisabledSubmitButton(true);
    setTotal(tempTotal);
  }, [quantityChanged]);

  useEffect(() => {
    if (responseMessage != null) {
      setShowSnackbar(true);
      setIsDisabledSubmitButton(true);
    }
    setTimeout(() => {
      setIsDisabledSubmitButton(false);
      changeResponseMessage(null);
      setShowSnackbar(false);
    }, 5000);
  }, [responseMessage]);

  const fetchData = async () => {
    const menuItems = await getMenuForSpecificBranchTable(tableId);
    const numberOfRows = await getNumberOfCategories();
    await getSpecificBranchTable(tableId).then(response => setBranchTable(response.data));
    createCategories(menuItems.data, numberOfRows.data);
    setLoading(false);
  };

  const createCategories = (data, numberOfRows) => {
    for (let i = 0; i < numberOfRows; i++) {
      categorizedArticles[i] = [];
    }

    data.map((menuItem, index) => categorizedArticles[menuItem.categoryId - 1].push(menuItem));
    categorizedArticles.forEach(categoryGroup => {
      categoryGroup.map(article => {
        article['isChecked'] = false;
        article['quantity'] = 1;
      });
    });
  };

  const onNumberInputChange = e => {
    categorizedArticles[e.target.id][e.target.name].quantity = e.target.value;
    setQuantityChanged(!quantityChanged);
  };

  const handleSubmit = async () => {
    let articlesForOrder = await createSelectedArticles();
    setIsDisabledSubmitButton(true);
    console.log(articlesForOrder);
    let chatMessage = {
      senderIdentification: branchTable.branch.id,
      receiverIdentification: tableId,
      items: articlesForOrder,
      total: total,
      date: null,
    };
    setOrderObject(chatMessage);
    await sendOrder(articlesForOrder, total);
  };

  const createSelectedArticles = async () => {
    let articlesForOrder = [];
    categorizedArticles.map(category =>
      category.map(item => {
        let article = {};
        if (item.isChecked) {
          article.productName = item.productName;
          article.quantity = item.quantity;
          article.price = item.price;
          articlesForOrder.push(article);
        }
      })
    );
    return articlesForOrder;
  };

  return (
    <>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div className="menu-container">
          <h1>Caffe bar {branchTable.branch.branchName} menu</h1>
          <h1>Table number {branchTable.number}</h1>
          {categorizedArticles.map((category, categoryindex) => (
            <div key={categoryindex}>
              {category.length != 0 ? (
                <>
                  <div className="category-container">
                    <h2>{category[0].categoryName}</h2>
                    {category.map((item, itemIndex) => (
                      <div className="list-container" key={itemIndex}>
                        <div className="checkbox-label">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={item.categoryindex}
                            name={item.itemIndex}
                            value={item.productName}
                            onChange={e => {
                              e.target.checked ? (item.isChecked = true) : (item.isChecked = false);
                              setQuantityChanged(!quantityChanged);
                            }}
                          />
                          {item.isChecked ? (
                            <input
                              type="number"
                              className="quantity-input"
                              value={item.quantity}
                              id={categoryindex}
                              name={itemIndex}
                              min={1}
                              step={1}
                              placeholder="Quantity"
                              onChange={onNumberInputChange}
                            />
                          ) : null}
                          <label class="form-check-label" for="item.itemIndex">
                            <b>{item.productName}</b>
                          </label>
                        </div>
                        <label>
                          <b>{item.price} HRK</b>
                        </label>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          ))}
          <div>
            <b>Total:</b> {total} HRK
          </div>
          <button disabled={isDisabledSubmitButton} className="button" type="submit" onClick={handleSubmit}>
            Submit
          </button>
          {showSnackbar ? <Snackbar message={responseMessage} isAccepted={isAccepted} /> : null}
        </div>
      )}
    </>
  );
};

export default Menu;
