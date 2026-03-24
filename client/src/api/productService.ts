import apiClient from './apiClient';
import type { Product } from '../types';

// Розширюємо функцію новими параметрами
export const getProducts = async (
  shopId: number, 
  page: number = 1, 
  limit: number = 9, // Advanced
  category?: string, // Middle
  sortBy?: string    // Middle
): Promise<Product[]> => {
  const response = await apiClient.get<Product[]>('/products', {
    params: { 
      shop_id: shopId, 
      page, 
      limit, 
      category, 
      sortBy 
    }
  });
  return response.data;
};