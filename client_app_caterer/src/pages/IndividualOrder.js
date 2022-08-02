import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getSpecificOrder } from '../apis/OrderApi';
import AuthContext from '../context/AuthContext';
const IndividualOrder = () => {
  const { orderId, branchId } = useParams();
  const { user, accessToken } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const { data } = await getSpecificOrder(accessToken, orderId);
    console.log(data);
    setOrder(data);
    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div>
          <h1>Employee: </h1>
        </div>
      )}
    </div>
  );
};

export default IndividualOrder;
