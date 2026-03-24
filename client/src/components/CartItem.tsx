import { Minus, Plus, Trash2, Utensils } from "lucide-react";
import type { Product } from "../types";

interface CartItemProps {
  item: Product & { quantity: number };
  onUpdateQuantity: (id: number, q: number) => void;
  onRemove: (id: number) => void;
  disabled?: boolean;
}

const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
  disabled,
}: CartItemProps) => (
  <div className="flex gap-4 items-center border-b border-gray-50 pb-4 last:border-0 animate-in slide-in-from-right-2 duration-300">
    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 shrink-0 overflow-hidden shadow-inner border border-gray-50">
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform hover:scale-110"
        />
      ) : (
        <div className="flex flex-col items-center gap-1 opacity-40">
          <Utensils size={24} />
        </div>
      )}
    </div>
    <div className="flex-1">
      <h3 className="font-bold text-gray-800 text-sm md:text-base leading-tight">
        {item.name}
      </h3>
      <p className="text-orange-600 font-bold">₴{item.price.toFixed(2)}</p>
    </div>
    <div className="flex items-center gap-1 md:gap-3 bg-gray-50 p-1 rounded-lg border border-gray-100">
      <button
        type="button"
        onClick={() =>
          onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
        }
        className="p-1 hover:bg-white rounded disabled:opacity-50 transition-all hover:shadow-sm"
        disabled={disabled}
      >
        <Minus size={16} />
      </button>
      <span className="font-bold w-6 text-center text-sm">{item.quantity}</span>
      <button
        type="button"
        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        className="p-1 hover:bg-white rounded disabled:opacity-50 transition-all hover:shadow-sm"
        disabled={disabled}
      >
        <Plus size={16} />
      </button>
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="ml-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all"
        disabled={disabled}
      >
        <Trash2 size={18} />
      </button>
    </div>
  </div>
);

export default CartItem;