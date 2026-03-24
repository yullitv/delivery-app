import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../api/productService';
import type { Product } from '../types';

export const useInfiniteProducts = (
  shopId: number | null,
  category: string, // Middle
  sortBy: string    // Middle
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1); // Керування поточною сторінкою
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Чи є ще товари на сервері

  // Ефект для скидання списку, коли змінюється магазин, категорія або сортування
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [shopId, category, sortBy]);

  // Функція для завантаження наступної порції товарів
  const loadMore = useCallback(async () => {
    if (!shopId || loading || !hasMore) return;

    setLoading(true);
    try {
      const limit = 9; // Розмір Batch (кратний 3 для сітки)
      const data = await getProducts(shopId, page, limit, category, sortBy);
      
      // Якщо прийшло менше, ніж просили — значить товари закінчилися
      if (data.length < limit) {
        setHasMore(false);
      }
      
      // Додаємо нові товари до старих
      setProducts((prev) => [...prev, ...data]);
      // Збільшуємо номер сторінки для наступного запиту
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  }, [shopId, page, loading, hasMore, category, sortBy]);

  return { products, loading, hasMore, loadMore };
};