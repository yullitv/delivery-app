import type { Product } from "../types";
import { cn } from "../lib/utils";
import { useCartStore } from "../store/useCartStore";
import { ShoppingBasket, UtensilsCrossed } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div
      className={cn(
        "group bg-white rounded-xl overflow-hidden border border-gray-100",
        "hover:shadow-lg transition-all duration-300 flex flex-col",
      )}
    >
      <div className="aspect-video bg-gray-50 relative overflow-hidden flex items-center justify-center">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-orange-200">
            <UtensilsCrossed size={48} strokeWidth={1.5} />
            <span className="text-[10px] font-bold uppercase tracking-widest mt-2 opacity-50">Delicious</span>
          </div>
        )}
        
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-sm font-bold text-gray-800 shadow-sm">
          ₴{product.price.toFixed(2)}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-800 mb-1 group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 uppercase tracking-wider bg-gray-50 px-2 py-0.5 rounded w-fit">
            {product.category}
          </p>
        </div>

        <button
          onClick={() => addItem(product)}
          className={cn(
            "mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg",
            "flex items-center justify-center gap-2 transition-colors font-medium active:scale-95",
          )}
        >
          <ShoppingBasket size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;