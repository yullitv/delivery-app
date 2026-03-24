import { Loader2, TicketCheck } from "lucide-react";
import Card from "./ui/Card";
import { cn } from "../lib/utils";

interface OrderSummaryProps {
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  totalPrice: number;
  couponCode: string;
  setCouponCode: (val: string) => void;
  onApplyCoupon: () => void;
  isSubmitting: boolean;
}

const OrderSummary = ({
  subtotal,
  discountPercent,
  discountAmount,
  totalPrice,
  couponCode,
  setCouponCode,
  onApplyCoupon,
  isSubmitting,
}: OrderSummaryProps) => {
  return (
    <div className="space-y-4">
      <Card className="bg-gray-50/50 border-dashed border-gray-200">
        <div className="flex items-center gap-2 mb-3 text-gray-700 font-bold">
          <TicketCheck size={18} className="text-orange-500" />
          <span>Have a coupon?</span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Code: WELCOME10"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500 uppercase font-mono transition-all"
          />
          <button
            type="button"
            onClick={onApplyCoupon}
            className="px-4 py-2 bg-gray-800 text-white text-sm font-bold rounded-lg hover:bg-black transition-colors active:scale-95"
          >
            Apply
          </button>
        </div>
      </Card>

      <Card className="bg-orange-50/30 border-orange-100">
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-gray-500 text-sm">
            <span>Subtotal:</span>
            <span>₴{subtotal.toFixed(2)}</span>
          </div>
          {discountPercent > 0 && (
            <div className="flex justify-between text-green-600 font-medium text-sm animate-in fade-in">
              <span>Discount ({discountPercent}%):</span>
              <span>-₴{discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t border-orange-100">
            <span className="text-gray-800 font-bold text-lg">Total Amount:</span>
            <span className="text-3xl font-black text-gray-900">
              ₴{totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          type="submit"
          form="order-form" // Зв'язок із формою в іншому компоненті
          disabled={isSubmitting}
          className={cn(
            "w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-200 transition-all flex justify-center items-center gap-2",
            "disabled:bg-orange-300 disabled:cursor-not-allowed active:scale-[0.98]"
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" /> Processing...
            </>
          ) : (
            "Confirm & Order"
          )}
        </button>
      </Card>
    </div>
  );
};

export default OrderSummary;