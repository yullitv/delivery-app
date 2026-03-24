import apiClient from './apiClient';
import type { Product } from '../types';

export const getProducts = async (shopId: number, page: number = 1, limit: number = 10): Promise<Product[]> => {
  const response = await apiClient.get<Product[]>('/products', {
    params: { shop_id: shopId, page, limit }
  });
  return response.data;
};