import { useState } from "react";
import { getOrderHistory } from "../api/orderService";
import { useCartStore } from "../store/useCartStore";
import Card from "../components/ui/Card";
import { Search, RotateCcw, Package, Calendar, MapPin } from "lucide-react";

const HistoryPage = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !phone) return alert("Please enter email or phone");

    setLoading(true);
    try {
      const data = await getOrderHistory(email, phone);
      setOrders(data);
    } catch (error) {
      alert("Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = (orderItems: any[]) => {
    // Advanced Requirement: Додаємо товари з минулого замовлення в кошик
    orderItems.forEach((item) => {
      // Використовуємо цикл для додавання потрібної кількості одиниць товару
      for (let i = 0; i < item.quantity; i++) {
        addItem(item.product);
      }
    });
    alert("Items from previous order added to cart!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <Card>
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Search className="text-orange-500" />
          Find Your Orders
        </h1>
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          />
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-orange-300 flex justify-center items-center gap-2"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </Card>

      <div className="space-y-6">
        {orders.length > 0
          ? orders.map((order) => (
              <Card
                key={order.id}
                className="border-l-4 border-l-orange-500 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={14} />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    {/* Використовуємо іконку Package тут */}
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <Package size={18} className="text-orange-400" />
                      Order #{order.id}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={14} />
                      {order.address}
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="text-2xl font-black text-gray-900">
                      ₴{order.totalPrice.toFixed(2)}
                    </div>
                    <button
                      onClick={() => handleReorder(order.items)}
                      className="flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold hover:bg-orange-200 transition-colors ml-auto active:scale-95"
                    >
                      <RotateCcw size={18} />
                      Reorder
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-50">
                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-white rounded flex items-center justify-center text-xs font-bold text-orange-500 shadow-sm border border-orange-50">
                        x{item.quantity}
                      </div>
                      <div className="text-sm font-medium text-gray-700 truncate">
                        {item.product.name}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))
          : !loading &&
            orders.length === 0 && (
              <div className="text-center py-20 text-gray-400 italic bg-white rounded-xl border-2 border-dashed border-gray-100">
                No orders found. Enter your details to see your history.
              </div>
            )}
      </div>
    </div>
  );
};

export default HistoryPage;
