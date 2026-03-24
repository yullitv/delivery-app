import { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { submitOrder } from '../api/orderService'; // Імпорт сервісу
import Card from '../components/ui/Card';
import { Trash2, Plus, Minus, Send, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const orderData = {
        userName: formData.name, // Мапимо name на userName для БД
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        totalPrice,
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      await submitOrder(orderData);
      
      alert('Order placed successfully! 🎉');
      clearCart();
      setFormData({ name: '', email: '', phone: '', address: '' });
    } catch (error) {
      console.error('Order error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <Card className="text-center py-20 animate-in fade-in duration-500">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500">Go back to the shop and pick something delicious!</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Send size={20} className={cn(isSubmitting ? "animate-pulse" : "text-orange-500")} />
          Delivery Information
        </h2>
        <form id="order-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              name="name"
              type="text" 
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
              disabled={isSubmitting}
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              name="email"
              type="email" 
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
              disabled={isSubmitting}
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input 
              name="phone"
              type="tel" 
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
              disabled={isSubmitting}
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea 
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
              rows={3} 
              disabled={isSubmitting}
              required 
            />
          </div>
        </form>
      </Card>

      <div className="space-y-4">
        <Card className="max-h-125 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-200">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center border-b border-gray-50 pb-4 last:border-0">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 shrink-0 overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs italic">No image</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm md:text-base">{item.name}</h3>
                  <p className="text-orange-600 font-bold">₴{item.price}</p>
                </div>
                <div className="flex items-center gap-1 md:gap-3 bg-gray-50 p-1 rounded-lg">
                  <button 
                    type="button"
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="p-1 hover:bg-white hover:shadow-sm rounded transition-all disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold w-6 text-center text-sm">{item.quantity}</span>
                  <button 
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-white hover:shadow-sm rounded transition-all disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    <Plus size={16} />
                  </button>
                  <button 
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="ml-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-orange-50/30 border-orange-100">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600 font-medium text-lg">Total Amount:</span>
            <span className="text-3xl font-black text-gray-900">₴{totalPrice.toFixed(2)}</span>
          </div>
          <button 
            type="submit"
            form="order-form"
            disabled={isSubmitting}
            className={cn(
              "w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl",
              "font-bold text-lg shadow-lg shadow-orange-200 transition-all",
              "active:scale-[0.98] focus:ring-4 focus:ring-orange-200 disabled:bg-orange-300 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                Processing...
              </>
            ) : (
              'Confirm & Order'
            )}
          </button>
        </Card>
      </div>
    </div>
  );
};

export default CartPage;