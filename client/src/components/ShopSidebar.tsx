import type { Shop } from "../types";
import { cn } from "../lib/utils";
import { Star } from "lucide-react";
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
    <aside className="w-full md:w-64 space-y-6 sticky top-20 h-fit">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4 px-2">Filters</h2>
        <div className="px-2 space-y-3">
          <label className="text-sm font-medium text-gray-600">
            Minimum Rating: {minRating}
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={minRating}
            onChange={(e) => setMinRating(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <div className="flex justify-between text-[10px] text-gray-400 px-1 font-bold">
            <span>0</span>
            <span>2.5</span>
            <span>5.0</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4 px-2">Shops</h2>
        <div className="flex flex-col gap-2">
          {filteredShops.map((shop) => (
            <button
              key={shop.id}
              onClick={() => onSelectShop(shop.id)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg transition-all font-medium bg-gray-50 text-gray-700 hover:bg-orange-100",
                selectedShopId === shop.id &&
                  "bg-orange-500 text-white shadow-md transform scale-[1.02]",
              )}
            >
              <div className="flex justify-between items-center">
                <span>{shop.name}</span>
                <div className="flex items-center gap-1 text-xs">
                  <Star size={12} fill="currentColor" />
                  {shop.rating}
                </div>
              </div>
            </button>
          ))}
          {filteredShops.length === 0 && (
            <p className="text-xs text-center text-gray-400 py-4">
              No shops with such rating
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default ShopSidebar;
