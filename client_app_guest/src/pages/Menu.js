import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMenuForSpecificBranchTable, getNumberOfCategories } from '../apis/MenuApis';
import './Menu.css';

const Menu = () => {
  const { tableId } = useParams();
  const [loading, setLoading] = useState(true);
  const [categorizedArticles, setCategorizedArticles] = useState([[]]);
  const [selectedArticles, setSelectedArtices] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const menuItems = await getMenuForSpecificBranchTable(tableId);
    const numberOfRows = await getNumberOfCategories();
    createCategories(menuItems.data, numberOfRows.data);
    setLoading(false);
  };

  const createCategories = (data, numberOfRows) => {
    for (let i = 0; i < numberOfRows; i++) {
      categorizedArticles[i] = [];
    }
    data.map((menuItem, index) => categorizedArticles[menuItem.categoryId - 1].push(menuItem));
  };

  const handleChange = e => {
    if (e.target.checked) {
      setSelectedArtices([...selectedArticles, e.target.value]);
    } else {
      // setSelectedArtices([selectedArticles.filter(item => item != e.target.value)]);
      removeItem(e.target.value);
    }
  };

  const removeItem = itemName => {
    var array = [...selectedArticles]; // make a separate copy of the array
    var index = array.indexOf(itemName);
    if (index !== -1) {
      array.splice(index, 1);
      setSelectedArtices(array);
    }
  };

  return (
    <>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <>
          {categorizedArticles.map((category, index) => (
            <div key={index}>
              <h1>{category[0].categoryName}</h1>
              {category.map((item, index) => (
                <div className="list-container" key={index}>
                  <input
                    type="checkbox"
                    id={item.productName}
                    name={item.productName}
                    value={item.productName}
                    onChange={handleChange}
                  />
                  <p>
                    {item.productName} {item.price} HRK
                  </p>
                </div>
              ))}
            </div>
          ))}
          <button type="submit">Submit</button>
        </>
      )}
    </>
  );
};

export default Menu;
