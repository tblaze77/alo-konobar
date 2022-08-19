import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../apis/CategoryApi';
import { getAllProducts } from '../apis/ProductApi';
import { getAllBranchProductsFromSpecificBranch } from '../apis/BranchProductApi';
import { productsConverter } from '../utils/EntityConverter';
import * as RoutePaths from '../constants/RoutePaths';
import EditIcon from '@mui/icons-material/Edit';
import { branchProductHeader } from '../constants/constants';
import './BranchProducts.css';
import DeleteIcon from '@mui/icons-material/Delete';
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
        <div className="list-container">
          <h1>All products existing in caffe bar {user.branch.branchName}</h1>
          {products.map((categorized, index) => {
            if (categorized.products.length == 0) {
              return null;
            } else {
              return (
                <div className="card-container" key={index}>
                  <h1 className="category-header">
                    <b>{categorized.name}</b>
                  </h1>
                  <table className="table">
                    <thead>
                      {branchProductHeader.map((header, index) => (
                        <th>{header}</th>
                      ))}
                    </thead>
                    <tbody>
                      {categorized.products.map((product, index) => {
                        return (
                          <tr key={index}>
                            <td>{product.productName}</td>
                            <td>{product.price} HRK</td>
                            <td>{product.quantity} left</td>

                            <td>
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
                                <EditIcon />
                              </Link>
                            </td>
                            <td>
                              <DeleteIcon />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            }
          })}
        </div>
      )}
    </>
  );
};

export default BranchProducts;
