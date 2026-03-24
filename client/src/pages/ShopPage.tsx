import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useShops } from "../hooks/useShops";
import { useInfiniteProducts } from "../hooks/useInfiniteProducts";
import ShopSidebar from "../components/ShopSidebar";
import ProductCard from "../components/ProductCard";
import Card from "../components/ui/Card";
import { cn } from "../lib/utils";

const ShopPage = () => {
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  const {
    shops,
    selectedShopId,
    setSelectedShopId,
    loading: shopsLoading,
  } = useShops();

  const {
    products,
    loading: productsLoading,
    hasMore,
    loadMore,
  } = useInfiniteProducts(selectedShopId, category, sortBy);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore && !productsLoading) {
      loadMore();
    }
  }, [inView, hasMore, productsLoading, loadMore]);

  if (shopsLoading)
    return (
      <div className="text-center py-10 font-medium">Loading shops...</div>
    );

  const currentShopName = shops.find((s) => s.id === selectedShopId)?.name;

  return (
    <div className={cn("flex flex-col md:flex-row gap-6")}>
      <ShopSidebar
        shops={shops}
        selectedShopId={selectedShopId}
        onSelectShop={setSelectedShopId}
      />

      <Card className="flex-1 min-h-150">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedShopId
              ? `Products from ${currentShopName}`
              : "Select a shop"}
          </h2>

          <div className="flex flex-wrap gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">All Categories</option>
              <option value="Burgers">Burgers</option>
              <option value="Drinks">Drinks</option>
              <option value="Desserts">Desserts</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="name-asc">Alphabetical (A → Z)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {selectedShopId ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div
              ref={ref}
              className="py-8 text-center flex justify-center items-center h-16 mt-6"
            >
              {productsLoading && (
                <p className="text-orange-500 font-medium animate-pulse">
                  Loading more items...
                </p>
              )}
              {!hasMore && products.length > 0 && (
                <p className="text-gray-400 italic text-sm">
                  No more products in this shop.
                </p>
              )}
              {!productsLoading && products.length === 0 && (
                <p className="text-gray-500 italic py-10">
                  No products match your filters.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
            Please select a shop to start ordering
          </div>
        )}
      </Card>
    </div>
  );
};

export default ShopPage;
