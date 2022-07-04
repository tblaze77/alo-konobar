import React, { useState, useEffect } from 'react';
import { getSpecificBranchProductByProductName } from '../apis/BranchProductApi';

const Order = () => {
  const [branchProductList, setBranchProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  const branchId = 1;

  const productList = ['heineken', 'caltenberg', 'paulaner', 'schweppes'];

  useEffect(() => {
    console.log('usa sam');
    loadData();
  }, []);

  const loadData = () => {
    productList.map((product, index, array) => {
      if (index + 1 == array.length) {
        getSpecificBranchProductByProductName(branchId, product)
          .then(response => {
            setBranchProductList(oldState => [...oldState, response.data]);
          })
          .finally(() => setLoading(false));
      } else {
        getSpecificBranchProductByProductName(branchId, product).then(response => {
          setBranchProductList(oldState => [...oldState, response.data]);
        });
      }
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  return (
    <div>
      {loading ? (
        <div>loading</div>
      ) : (
        <div>
          {branchProductList.map(branchProduct => {
            return (
              <div>
                <p>{branchProduct.branch.branchName}</p>
                <p>{branchProduct.product.productName}</p>
                <p>{branchProduct.price}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Order;
