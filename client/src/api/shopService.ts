import apiClient from './apiClient';
import type { Shop } from '../types';

export const getShops = async (ratingMin?: number): Promise<Shop[]> => {
  const response = await apiClient.get<Shop[]>('/shops', {
    params: { rating_min: ratingMin }
  });
  return response.data;
};