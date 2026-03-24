import type { Product } from '../types';
import { cn } from '../lib/utils'; 

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className={cn(
      "group bg-white rounded-xl overflow-hidden border border-gray-100",
      "hover:shadow-lg transition-all duration-300 flex flex-col"
    )}>
      <div className="aspect-video bg-gray-100 relative overflow-hidden flex items-center justify-center text-gray-400">
        No Image
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-sm font-bold text-gray-800">
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
        
        <button className={cn(
          "mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg",
          "flex items-center justify-center gap-2 transition-colors font-medium active:scale-95"
        )}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;