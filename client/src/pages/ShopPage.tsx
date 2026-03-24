import { useShops } from '../hooks/useShops';
import ShopSidebar from '../components/ShopSidebar';
import Card from '../components/ui/Card';

const ShopPage = () => {
  const { shops, selectedShopId, setSelectedShopId, loading } = useShops();

  if (loading) return <div className="text-center py-10 font-medium">Loading shops...</div>;

  const currentShopName = shops.find(s => s.id === selectedShopId)?.name;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <ShopSidebar 
        shops={shops} 
        selectedShopId={selectedShopId} 
        onSelectShop={setSelectedShopId} 
      />

      <Card className="flex-1 min-h-150">
        {selectedShopId ? (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Products from {currentShopName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {/* Наступним кроком ми додамо сюди ProductCard та Infinite Scroll */}
               <p className="text-gray-400 italic">Loading products...</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Please select a shop to see products
          </div>
        )}
      </Card>
    </div>
  );
};

export default ShopPage;