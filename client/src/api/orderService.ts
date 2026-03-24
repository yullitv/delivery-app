import apiClient from "./apiClient";

export const submitOrder = async (orderData: any) => {
  const response = await apiClient.post("/orders", orderData);
  return response.data;
};

export const getOrderHistory = async (email: string, phone: string) => {
  const response = await apiClient.get("/orders/history", {
    params: { email, phone },
  });
  return response.data;
};
