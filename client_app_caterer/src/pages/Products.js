import React, { useState, useEffect, useContext, useTransition } from 'react';
import { getAllCategories } from '../apis/CategoryApi';
import { getAllProducts, getAllProductsBySpecificBranch } from '../apis/ProductApi';
import AuthContext from '../context/AuthContext';
import { productsConverter } from '../utils/EntityConverter';
import * as RoutePaths from '../constants/RoutePaths';
import { Link } from 'react-router-dom';
const Products = () => {
  const { accessToken, user } = useContext(AuthContext);
  const branchId = user.branch.id;
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getInfo();
    console.log(branchId);
  }, [loading]);

  const getInfo = async () => {
    const responses = await Promise.all([
      getAllCategories(accessToken),
      getAllProducts(accessToken),
      getAllProductsBySpecificBranch(accessToken, user.branch.id),
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
          <h1>All possible products for {user.branch.branchName}</h1>
          {products.map((categorized, index) => {
            return (
              <div key={index}>
                <h1>
                  <b>{categorized.name}</b>
                </h1>
                {categorized.products.map(product => {
                  return (
                    <div>
                      {' '}
                      <h2>{product.productName}</h2>{' '}
                      {!product.avaliable ? (
                        <Link to={RoutePaths.BRANCH + '/' + branchId + RoutePaths.PRODUCTS + '/' + product.id}>
                          <button>Add</button>
                        </Link>
                      ) : null}
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

export default Products;
