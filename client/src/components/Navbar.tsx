import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, History, Store, Ticket } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { cn } from '../lib/utils';

const Navbar = () => {
  const location = useLocation();
  const cartItems = useCartStore((state) => state.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { path: '/', name: 'Shop', icon: <Store size={20} /> },
    { path: '/cart', name: 'Shopping Cart', icon: <ShoppingCart size={20} />, count: totalItems },
    { path: '/history', name: 'History', icon: <History size={20} /> },
    { path: '/coupons', name: 'Coupons', icon: <Ticket size={20} /> },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-orange-600 flex items-center gap-2">
            DeliveryApp
          </Link>
          
          <div className="flex gap-2 md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-medium text-gray-600 hover:text-orange-500 hover:bg-gray-50",
                  location.pathname === link.path && "text-orange-600 bg-orange-50"
                )}
              >
                <span className="relative">
                  {link.icon}
                  {link.count !== undefined && link.count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {link.count}
                    </span>
                  )}
                </span>
                <span className="hidden md:inline">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;