import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

// Function to create a new order
export const createOrder = (orderData) => {
  return axios.post(API_URL, orderData);
};
