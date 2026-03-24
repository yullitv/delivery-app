import { create } from 'zustand';
import type { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()((set) => ({
  items: [],
  addItem: (product: Product) => set((state) => {
    const existing = state.items.find(item => item.id === product.id);
    if (existing) {
      return {
        items: state.items.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
    }
    return { items: [...state.items, { ...product, quantity: 1 }] };
  }),
  removeItem: (productId: number) => set((state) => ({
    items: state.items.filter(item => item.id !== productId)
  })),
  updateQuantity: (productId: number, quantity: number) => set((state) => ({
    items: state.items.map(item => 
      item.id === productId ? { ...item, quantity } : item
    )
  })),
  clearCart: () => set({ items: [] }),
}));