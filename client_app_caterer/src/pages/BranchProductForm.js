import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSpecificProduct } from '../apis/ProductApi';
import AuthContext from '../context/AuthContext';
import { createBranchProduct, getSpecificBranchProduct, updateSpecificBranchProduct } from '../apis/BranchProductApi';
import { branchProductInputs } from '../constants/InputBlueprints';
import FormInput from '../components/FormInput';
import './BranchProductForm.css';
const BranchProductForm = ({ type }) => {
  const { branchId, productId } = useParams();
  const { accessToken, user } = useContext(AuthContext);
  const [branchProduct, setBranchProduct] = useState({
    description: '',
    quantity: '',
    price: '',
  });
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    getInfo();
  }, [loading]);

  const getInfo = async () => {
    if (type === 'update') {
      const responses = await Promise.all([
        getSpecificProduct(accessToken, productId),
        getSpecificBranchProduct(accessToken, branchId, productId),
      ]);
      setProduct(responses[0].data);
      branchProduct['description'] = responses[1].data.description;
      branchProduct['quantity'] = responses[1].data.quantity;
      branchProduct['price'] = responses[1].data.price;
    } else {
      branchProduct['branch'] = branchId;
      branchProduct['product'] = productId;
      const { data } = await getSpecificProduct(accessToken, productId);
      setProduct(data);
    }
    console.log(branchProduct);
    setLoading(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (type == 'create') await createBranchProduct(accessToken, branchProduct);
    else await updateSpecificBranchProduct(accessToken, branchId, product.id, branchProduct);
    clearState();
  };

  const onChange = e => {
    setBranchProduct({ ...branchProduct, [e.target.name]: e.target.value });
  };

  const clearState = () => {
    setBranchProduct({
      quantity: '',
      price: '',
      description: '',
    });
  };

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="list-container">
          <h1>
            Adding "{product.productName}" to "{user.branch.branchName}" caffe
          </h1>
          <form className="branchProduct-form" onSubmit={handleSubmit}>
            {branchProductInputs.map(input => (
              <FormInput key={input.id} {...input} value={branchProduct[input.name]} onChange={onChange} />
            ))}
            <button className="button" type="submit">
              Submit
            </button>
          </form>
          <button className="button clear" onClick={clearState}>
            Clear
          </button>
        </div>
      )}
    </>
  );
};

export default BranchProductForm;
