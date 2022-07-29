import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSpecificProduct } from '../apis/ProductApi';
import AuthContext from '../context/AuthContext';
import { createBranchProduct } from '../apis/BranchProductApi';
import { branchProductInputs } from '../constants/InputBlueprints';
import FormInput from '../components/FormInput';
const BranchProductForm = () => {
  const { branchId, productId } = useParams();
  const { accessToken, user } = useContext(AuthContext);
  const [branchProduct, setBranchProduct] = useState({
    branch: branchId,
    product: productId,
    description: '',
    quantity: '',
    price: '',
  });
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getInfo();
  }, [loading]);

  const getInfo = async () => {
    const { data } = await getSpecificProduct(accessToken, productId);
    setProduct(data);
    setLoading(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await createBranchProduct(accessToken, branchProduct);
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
        <div>
          <h1>
            Adding {product.productName} to {user.branch.branchName} caffe
          </h1>
          <form onSubmit={handleSubmit}>
            {branchProductInputs.map(input => (
              <FormInput key={input.id} {...input} value={branchProduct[input.name]} onChange={onChange} />
            ))}
            <button type="submit">Submit</button>
          </form>
          <button onClick={clearState}>CLEAR STATE</button>
        </div>
      )}
    </>
  );
};

export default BranchProductForm;
