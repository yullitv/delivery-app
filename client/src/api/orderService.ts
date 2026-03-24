import apiClient from './apiClient';

export const submitOrder = async (orderData: any) => {
  const response = await apiClient.post('/orders', orderData);
  return response.data;
};