import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMenuForSpecificBranchTable, getNumberOfCategories } from '../apis/MenuApis';

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

  return (
    <>
      {loading ? (
        <h1>Stranics</h1>
      ) : (
        <>
          {categorizedArticles.map((category, index) => (
            <div key={index}>
              <h1>{category[0].categoryName}</h1>
              {category.map((item, index) => (
                <div key={index}>
                  {item.productName} {item.price} HRK
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Menu;
