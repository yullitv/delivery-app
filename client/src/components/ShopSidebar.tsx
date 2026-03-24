import type { Shop } from "../types";
import { cn } from "../lib/utils";
import { Star, Filter, Store } from "lucide-react";
import { useState } from "react";

interface ShopSidebarProps {
  shops: Shop[];
  selectedShopId: number | null;
  onSelectShop: (id: number) => void;
}

const ShopSidebar = ({
  shops,
  selectedShopId,
  onSelectShop,
}: ShopSidebarProps) => {
  const [minRating, setMinRating] = useState(0);

  const filteredShops = shops.filter((shop) => shop.rating >= minRating);

  return (
    <aside className="w-full md:w-64 space-y-6 md:sticky md:top-24 h-fit z-30">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
          <Filter size={18} className="text-orange-500" />
          Filters
        </h2>
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-600">
            Min. Rating: <span className="text-orange-600">{minRating}</span>
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={minRating}
            onChange={(e) => setMinRating(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
            <span>Low</span>
            <span>2.5</span>
            <span>High</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
          <Store size={18} className="text-orange-500" />
          Shops
        </h2>
        <div className="flex flex-col gap-2.5">
          {filteredShops.map((shop) => (
            <button
              key={shop.id}
              onClick={() => onSelectShop(shop.id)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium",
                "border-2 border-transparent",
                selectedShopId === shop.id
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-100 scale-[1.02]"
                  : "bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-orange-600"
              )}
            >
              <div className="flex justify-between items-center">
                <span className="truncate pr-2">{shop.name}</span>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full",
                  selectedShopId === shop.id ? "bg-white/20" : "bg-white shadow-sm text-orange-500"
                )}>
                  <Star size={10} fill="currentColor" />
                  {shop.rating.toFixed(1)}
                </div>
              </div>
            </button>
          ))}
          {filteredShops.length === 0 && (
            <div className="text-center py-6 px-2">
              <p className="text-xs text-gray-400 italic">No shops matching this rating</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default ShopSidebar;