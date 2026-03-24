export interface Shop {
  id: number;
  name: string;
  rating: number;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  shopId: number;
  image?: string;
}

export interface Coupon {
  id: number;
  code: string;
  discount: number;
  description: string;
}