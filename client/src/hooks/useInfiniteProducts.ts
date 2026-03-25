import { useState, useEffect, useCallback } from "react";
import { getProducts } from "../api/productService";
import type { Product } from "../types";

export const useInfiniteProducts = (
  shopId: number | null,
  categories: string[],
  sortBy: string,
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const categoriesKey = JSON.stringify(categories);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [shopId, categoriesKey, sortBy]);

  const loadMore = useCallback(async () => {
    if (!shopId || loading || !hasMore) return;

    setLoading(true);
    try {
      const limit = 9;
      const data = await getProducts(shopId, page, limit, categories, sortBy);

      if (data.length < limit) {
        setHasMore(false);
      }

      setProducts((prev) => (page === 1 ? data : [...prev, ...data]));
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopId, page, loading, hasMore, categoriesKey, sortBy]);

  return { products, loading, hasMore, loadMore };
};