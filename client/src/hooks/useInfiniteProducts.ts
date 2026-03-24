import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../api/productService';
import type { Product } from '../types';

export const useInfiniteProducts = (
  shopId: number | null,
  category: string,
  sortBy: string
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [shopId, category, sortBy]);


  const loadMore = useCallback(async () => {
    if (!shopId || loading || !hasMore) return;

    setLoading(true);
    try {
      const limit = 9;
      const data = await getProducts(shopId, page, limit, category, sortBy);
      
      if (data.length < limit) {
        setHasMore(false);
      }
      
      setProducts((prev) => [...prev, ...data]);

      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  }, [shopId, page, loading, hasMore, category, sortBy]);

  return { products, loading, hasMore, loadMore };
};