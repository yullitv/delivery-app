import { useState } from "react";
import toast from "react-hot-toast";
import { getOrderHistory } from "../api/orderService";
import { useCartStore } from "../store/useCartStore";
import {
  normalizePhoneNumber,
  validateEmail,
  validatePhone,
} from "../lib/validation";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import {
  Search,
  RotateCcw,
  Package,
  Calendar,
  MapPin,
  Info,
} from "lucide-react";

const HistoryPage = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  const addItem = useCartStore((state) => state.addItem);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!email.trim() && !phone.trim()) {
      return toast.error("Please enter email or phone to search");
    }

    let hasError = false;
    if (email && !validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      hasError = true;
    }
    if (phone && !validatePhone(phone)) {
      setErrors((prev) => ({ ...prev, phone: "Invalid phone format" }));
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    try {
      const searchPhone = phone ? normalizePhoneNumber(phone) : "";
      const data = await getOrderHistory(email, searchPhone);
      setOrders(data);

      if (data.length === 0) {
        toast("No orders found for this contact", { icon: "🔍" });
      } else {
        toast.success(`Found ${data.length} orders`);
      }
    } catch (error) {
      toast.error("Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = (orderItems: any[]) => {
    orderItems.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        addItem(item.product);
      }
    });
    toast.success("Items added to cart!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Search className="text-orange-500" />
            Find Your Orders
          </h1>
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            <Info size={14} />
            Search by either Email OR Phone number
          </div>
        </div>

        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              className="bg-white"
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="e.g. +380XXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
              className="bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-fit md:px-12 bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-100 disabled:bg-orange-300 flex justify-center items-center gap-2 active:scale-95"
          >
            {loading ? "Searching..." : "Search Orders"}
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
                No orders found. Enter details above to see your history.
              </div>
            )}
      </div>
    </div>
  );
};

export default HistoryPage;
