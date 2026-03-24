import { useState, useEffect } from "react";
import { getShops } from "../api/shopService";
import type { Shop } from "../types";

export const useShops = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const data = await getShops();
        setShops(data);
        if (data?.[0]) {
          setSelectedShopId(data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch shops:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  return { shops, selectedShopId, setSelectedShopId, loading };
};
