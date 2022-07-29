import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../apis/CategoryApi';
import { getAllProducts } from '../apis/ProductApi';
import { getAllBranchProductsFromSpecificBranch } from '../apis/BranchProductApi';
import { productsConverter } from '../utils/EntityConverter';
import * as RoutePaths from '../constants/RoutePaths';
const BranchProducts = () => {
  const { accessToken, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getInfo();
  }, [loading]);

  const getInfo = async () => {
    const responses = await Promise.all([
      getAllCategories(accessToken),
      getAllProducts(accessToken),
      getAllBranchProductsFromSpecificBranch(accessToken, user.branch.id),
    ]);
    setProducts(await productsConverter(responses[0].data, responses[1].data, responses[2].data));
    if (products != []) setLoading(false);
  };

  return (
    <>
      {loading ? (
        <h1>Loading ....</h1>
      ) : (
        <>
          <h1>All products existing in {user.branch.branchName}</h1>
          {products.map((categorized, index) => {
            return (
              <div key={index}>
                <h1>
                  <b>{categorized.name}</b>
                </h1>
                {categorized.products.map((product, index) => {
                  return (
                    <div key={index}>
                      <h2>{product.productName}</h2>
                      <h2>{product.price} HRK</h2>
                      <h2>{product.quantity} left</h2>
                      <button>
                        <Link
                          to={
                            RoutePaths.BRANCH +
                            '/' +
                            user.branch.id +
                            RoutePaths.PRODUCTS +
                            '/' +
                            product.id +
                            RoutePaths.UPDATE
                          }
                        >
                          Edit
                        </Link>
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default BranchProducts;
