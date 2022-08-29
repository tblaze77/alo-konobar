import axios from 'axios';

export const getAllOrdersFromSpecificBranch = async (accessToken, branchId) => {
  return await axios.get(`http://localhost:8080/v1/api/order/byBranch/${branchId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getSpecificOrder = async (accessToken, orderId) => {
  return await axios.get(`http://localhost:8080/v1/api/order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const createNewOrder = async (accessToken, order) => {
  return await axios.post('http://localhost:8080/v1/api/order/new', order, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const createNewOrderForCheckout = async (accessToken, order) => {
  return await axios.post('http://localhost:8080/v1/api/order/forCheckout', order, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updatePaymentMethod = async (accessToken, orderId, paymentMethod) => {
  return await axios.put(`http://localhost:8080/v1/api/order/${orderId}/updatePaymentMethod/${paymentMethod}`, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
