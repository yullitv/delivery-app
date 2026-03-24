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
      <div className="flex justify-center items-center min-h-[60vh]">
         <div className="animate-pulse text-orange-500 font-bold text-xl">Loading Shops...</div>
      </div>
    );

  const currentShopName = shops.find((s) => s.id === selectedShopId)?.name;

return (
    <div className={cn("flex flex-col md:flex-row gap-6 items-start pb-10 px-2 md:px-0")}>
      <ShopSidebar
        shops={shops}
        selectedShopId={selectedShopId}
        onSelectShop={setSelectedShopId}
      />

      <Card className="flex-1 min-h-150 w-full p-4 md:p-8 relative z-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-gray-50 pb-6">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              {selectedShopId ? currentShopName : "Select a Shop"}
            </h2>
            {selectedShopId && (
               <p className="text-gray-400 text-sm font-medium">
                 Discover the best dishes from our menu
               </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-40 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer shadow-sm"
            >
              <option value="">All Categories</option>
              <option value="Burgers">Burgers</option>
              <option value="Drinks">Drinks</option>
              <option value="Desserts">Desserts</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-48 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer shadow-sm"
            >
              <option value="name-asc">A → Z</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {selectedShopId ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div
              ref={ref}
              className="py-12 text-center flex justify-center items-center h-24 mt-6"
            >
              {productsLoading ? (
                <div className="flex items-center gap-2 text-orange-500 font-bold animate-pulse">
                   <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" />
                   <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                   <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              ) : !hasMore && products.length > 0 ? (
                <span className="text-gray-300 text-sm font-medium bg-gray-50 px-4 py-2 rounded-full">
                  No more items to show
                </span>
              ) : null}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300 space-y-4">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-4xl opacity-50">
               🍔
             </div>
             <p className="font-bold text-lg">Pick a restaurant to see the menu</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ShopPage;