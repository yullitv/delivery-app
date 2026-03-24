import type { Shop } from '../types';
import { cn } from '../lib/utils';

interface ShopSidebarProps {
  shops: Shop[];
  selectedShopId: number | null;
  onSelectShop: (id: number) => void;
}

const ShopSidebar = ({ shops, selectedShopId, onSelectShop }: ShopSidebarProps) => {
  return (
    <aside className="w-full md:w-64 bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-20">
      <h2 className="text-xl font-bold mb-4 px-2">Shops</h2>
      <div className="flex flex-col gap-2">
        {shops.map((shop) => (
          <button
            key={shop.id}
            onClick={() => onSelectShop(shop.id)}
            className={cn(
              "w-full text-left px-4 py-3 rounded-lg transition-all font-medium bg-gray-50 text-gray-700 hover:bg-orange-100",
              selectedShopId === shop.id && "bg-orange-500 text-white shadow-md transform scale-[1.02]"
            )}
          >
            {shop.name}
            <div className={cn(
              "text-xs mt-1 text-gray-400",
              selectedShopId === shop.id && "text-orange-100"
            )}>
              Rating: {shop.rating}
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default ShopSidebar;