import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMenuForSpecificBranchTable, getNumberOfCategories } from '../apis/MenuApis';
import { getSpecificBranchTable } from '../apis/BranchApis';
import './Menu.css';

const Menu = () => {
  const { tableId } = useParams();
  const [loading, setLoading] = useState(true);
  const [categorizedArticles, setCategorizedArticles] = useState([[]]);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [branchTable, setBranchTable] = useState({});
  const [quantityChanged, setQuantityChanged] = useState(true);
  useEffect(() => {
    fetchData();
    console.log(categorizedArticles);
  }, []);

  useEffect(() => {
    console.log('use effect za rerender');
  }, [quantityChanged]);

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
    console.log(articlesForOrder);
  };

  const createSelectedArticles = async () => {
    let articlesForOrder = [];
    categorizedArticles.map(category =>
      category.map(item => {
        let article = {};
        if (item.isChecked) {
          article.productName = item.productName;
          article.quantity = item.quantity;
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
          <div>
            <h1>Caffe bar {branchTable.branch.branchName} menu</h1>
            <h2>Table number {branchTable.number}</h2>
          </div>
          {categorizedArticles.map((category, categoryindex) => (
            <div key={categoryindex}>
              {category.length != 0 ? (
                <div>
                  <h1>{category[0].categoryName}</h1>
                  {category.map((item, itemIndex) => (
                    <div className="list-container" key={itemIndex}>
                      <input
                        type="checkbox"
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
                          value={item.quantity}
                          id={categoryindex}
                          name={itemIndex}
                          min={1}
                          step={1}
                          placeholder="Quantity"
                          onChange={onNumberInputChange}
                        />
                      ) : null}
                      <p>
                        {item.productName}
                        {item.price} HRK
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
    </>
  );
};

export default Menu;
