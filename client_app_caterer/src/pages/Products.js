import React, { useState, useEffect, useContext, useTransition } from 'react';
import { getAllCategories } from '../apis/CategoryApi';
import { getAllProducts } from '../apis/ProductApi';
import { getAllBranchProductsFromSpecificBranch } from '../apis/BranchProductApi';
import AuthContext from '../context/AuthContext';
import { productsConverter } from '../utils/EntityConverter';
import * as RoutePaths from '../constants/RoutePaths';
import { Link } from 'react-router-dom';
const Products = () => {
  const { accessToken, user } = useContext(AuthContext);
  const branchId = user.branch.id;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getInfo();
  }, [loading]);

  const getInfo = async () => {
    const responses = await Promise.all([
      getAllCategories(accessToken),
      getAllProducts(accessToken),
      getAllBranchProductsFromSpecificBranch(accessToken, user.branch.id),
    ]);
    setProducts(await productsConverter(responses[0].data, responses[1].data, responses[2].data, true));
    if (products != []) setLoading(false);
  };

  return (
    <>
      {loading ? (
        <h1>Loading ....</h1>
      ) : (
        <div className="list-container">
          <h1>All possible products for {user.branch.branchName}</h1>
          {products.map((categorized, index) => {
            if (categorized.products.length == 0) {
              return null;
            } else {
              return (
                <div key={index}>
                  <h1 className="category-header">
                    <b>{categorized.name}</b>
                  </h1>
                  {categorized.products.map((product, index) => {
                    return (
                      <>
                        <div className="branch-product-card" key={index}>
                          <h2>{product.productName}</h2>
                          <Link
                            to={
                              RoutePaths.BRANCH +
                              '/' +
                              branchId +
                              RoutePaths.PRODUCTS +
                              '/' +
                              product.id +
                              RoutePaths.CREATE
                            }
                          >
                            <button className="button">Add</button>
                          </Link>
                        </div>
                      </>
                    );
                  })}
                </div>
              );
            }
          })}
        </div>
      )}
    </>
  );
};

export default Products;
