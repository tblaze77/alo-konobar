import React, { useState, useEffect } from 'react';
import { getSpecificBranchProductByProductName } from '../apis/BranchProductApi';

const Order = () => {
  const [branchProductList, setBranchProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  const branchId = 1;

  const productList = ['heineken', 'caltenberg'];

  useEffect(() => {
    console.log('usa sam');
    loadData();
  }, []);

  const loadData = () => {
    productList.map(product =>
      getSpecificBranchProductByProductName(branchId, product).then(response => {
        branchProductList.push(response.data);
      })
    );
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
