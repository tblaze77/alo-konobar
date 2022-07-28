import React, { useState, useEffect, useContext, useTransition } from 'react';
import { getAllCategories } from '../apis/CategoryApi';
import { getAllProducts, getAllProductsBySpecificBranch } from '../apis/ProductApi';
import AuthContext from '../context/AuthContext';
import { productsConverter } from '../utils/EntityConverter';
const Products = () => {
  const { accessToken, user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getInfo();
  }, [loading]);

  const getInfo = async () => {
    const responses = await Promise.all([
      getAllCategories(accessToken),
      getAllProducts(accessToken),
      getAllProductsBySpecificBranch(accessToken, user.branch.id),
    ]);
    setProducts(await productsConverter(responses[0].data, responses[1].data, responses[2].data));
    if (products != null) setLoading(false);
  };

  return (
    <>
      {loading ? (
        <h1>Loading ....</h1>
      ) : (
        <>
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
                      <h2>{product.productName}</h2> {!product.avaliable ? <button>Add</button> : null}
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
