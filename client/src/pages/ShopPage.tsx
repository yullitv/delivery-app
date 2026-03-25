import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useShops } from "../hooks/useShops";
import { useInfiniteProducts } from "../hooks/useInfiniteProducts";
import ShopSidebar from "../components/ShopSidebar";
import ProductCard from "../components/ProductCard";
import Card from "../components/ui/Card";
import { cn } from "../lib/utils";

const ShopPage = () => {
const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("");

  const { shops, selectedShopId, setSelectedShopId, loading: shopsLoading } = useShops();

  const { products, loading: productsLoading, hasMore, loadMore } = 
    useInfiniteProducts(selectedShopId, selectedCategories, sortBy);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore && !productsLoading) {
      loadMore();
    }
  }, [inView, hasMore, productsLoading, loadMore]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  if (shopsLoading) return <div className="flex justify-center py-20 animate-pulse text-orange-500 font-bold">Loading Shops...</div>;

  const currentShopName = shops.find((s) => s.id === selectedShopId)?.name;
  const categories = ["Burgers", "Drinks", "Desserts"];

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start pb-10 px-2 md:px-0">
      <ShopSidebar shops={shops} selectedShopId={selectedShopId} onSelectShop={setSelectedShopId} />

      <Card className="flex-1 min-h-150 w-full p-4 md:p-8 relative z-0">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6 border-b border-gray-50 pb-6">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              {selectedShopId ? currentShopName : "Select a Shop"}
            </h2>
            {selectedShopId && <p className="text-gray-400 text-sm font-medium">Select multiple categories to filter</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-center">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold transition-all border",
                    selectedCategories.includes(cat)
                      ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-100"
                      : "bg-white border-gray-200 text-gray-500 hover:border-orange-300"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-48 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer shadow-sm"
            >
              <option value="">Sort: None</option>
              <option value="name-asc">Alphabetical: A → Z</option>
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
            <div ref={ref} className="py-12 flex justify-center h-24 mt-6">
              {productsLoading && <div className="text-orange-500 animate-bounce">...</div>}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300 space-y-4">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-4xl opacity-50">🍔</div>
             <p className="font-bold text-lg">Pick a restaurant to see the menu</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ShopPage;