import apiClient from "./apiClient";
import type { Product } from "../types";

interface CreateOrderItemDto {
  productId: number;
  quantity: number;
  price: number;
}

interface CreateOrderDto {
  userName: string;
  email: string;
  phone: string;
  address: string;
  totalPrice: number;
  items: CreateOrderItemDto[];
}

interface OrderHistoryResponse {
  id: number;
  address: string;
  totalPrice: number;
  createdAt: string;
  items: {
    id: number;
    quantity: number;
    product: Product;
  }[];
}

export const submitOrder = async (orderData: CreateOrderDto) => {
  const response = await apiClient.post("/orders", orderData);
  return response.data;
};

export const getOrderHistory = async (email: string, phone: string): Promise<OrderHistoryResponse[]> => {
  const response = await apiClient.get<OrderHistoryResponse[]>("/orders/history", {
    params: { email, phone },
  });
  return response.data;
};