import { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { submitOrder } from "../api/orderService";
import Card from "../components/ui/Card";
import {
  Trash2,
  Plus,
  Minus,
  Send,
  Loader2,
  TicketCheck,
  AlertCircle,
} from "lucide-react";
import { cn } from "../lib/utils";

const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const discountAmount = (subtotal * discountPercent) / 100;
  const totalPrice = subtotal - discountAmount;

  // --- Validation Logic ---
  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "email":
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          error = "Enter a valid email (e.g., user@mail.com)";
        }
        break;
      case "phone":
        const cleanPhone = value.replace(/[\s\(\)-]/g, "");
        const phoneRegex = /^(\+?38)?0\d{9}$/;
        if (!phoneRegex.test(cleanPhone)) {
          error = "Format: +380XXXXXXXXX or 0XXXXXXXXX";
        }
        break;
      case "name":
        if (value.trim().length < 2) {
          error = "Name is too short (min. 2 characters)";
        }
        break;
      case "address":
        if (value.trim().length < 10) {
          error = "Provide full address (street, building, apt)";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    validateField(e.target.name, e.target.value);
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "WELCOME10") {
      setDiscountPercent(10);
      alert("Coupon applied! 10% discount added. 🎉");
    } else {
      alert("Invalid coupon code. Try WELCOME10");
      setDiscountPercent(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isNameValid = validateField("name", formData.name);
    const isEmailValid = validateField("email", formData.email);
    const isPhoneValid = validateField("phone", formData.phone);
    const isAddressValid = validateField("address", formData.address);

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isAddressValid) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Normalize phone to +380 format
      let formattedPhone = formData.phone.replace(/[\s\(\)-]/g, "");
      if (formattedPhone.startsWith("0"))
        formattedPhone = "+38" + formattedPhone;
      if (formattedPhone.startsWith("380"))
        formattedPhone = "+" + formattedPhone;

      const orderData = {
        userName: formData.name,
        email: formData.email,
        phone: formattedPhone,
        address: formData.address,
        totalPrice: Number(totalPrice.toFixed(2)),
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      await submitOrder(orderData);
      alert("Order placed successfully! 🎉");
      clearCart();
      setFormData({ name: "", email: "", phone: "", address: "" });
      setDiscountPercent(0);
      setCouponCode("");
    } catch (error) {
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <Card className="text-center py-20 animate-in fade-in duration-500">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500">
          Go back to the shop and pick something delicious!
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Send
            size={20}
            className={cn(isSubmitting ? "animate-pulse" : "text-orange-500")}
          />
          Delivery Information
        </h2>
        <form id="order-form" onSubmit={handleSubmit} className="space-y-5">
          {[
            {
              label: "Name",
              name: "name",
              type: "text",
              placeholder: "Your full name",
            },
            {
              label: "Email",
              name: "email",
              type: "email",
              placeholder: "example@mail.com",
            },
            {
              label: "Phone",
              name: "phone",
              type: "tel",
              placeholder: "+380XXXXXXXXX",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <div className="relative">
                <input
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={cn(
                    "w-full px-4 py-2 border rounded-lg outline-none transition-all disabled:bg-gray-50",
                    errors[field.name]
                      ? "border-red-500 bg-red-50 focus:ring-red-100"
                      : "border-gray-200 focus:ring-2 focus:ring-orange-500",
                  )}
                  disabled={isSubmitting}
                />
                {errors[field.name] && (
                  <AlertCircle
                    className="absolute right-3 top-2.5 text-red-500"
                    size={18}
                  />
                )}
              </div>
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Street, building, apartment..."
              className={cn(
                "w-full px-4 py-2 border rounded-lg outline-none transition-all disabled:bg-gray-50",
                errors.address
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 focus:ring-2 focus:ring-orange-500",
              )}
              rows={3}
              disabled={isSubmitting}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.address}
              </p>
            )}
          </div>
        </form>
      </Card>

      <div className="space-y-4">
        <Card className="max-h-125 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-200">
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center border-b border-gray-50 pb-4 last:border-0"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 shrink-0 overflow-hidden shadow-inner">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs italic text-gray-400">
                      No image
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm md:text-base">
                    {item.name}
                  </h3>
                  <p className="text-orange-600 font-bold">₴{item.price}</p>
                </div>
                <div className="flex items-center gap-1 md:gap-3 bg-gray-50 p-1 rounded-lg border border-gray-100">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="p-1 hover:bg-white rounded disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold w-6 text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-white rounded disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="ml-2 p-1.5 text-gray-400 hover:text-red-500 rounded disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-gray-50/50 border-dashed">
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
              className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500 uppercase font-mono"
            />
            <button
              type="button"
              onClick={applyCoupon}
              className="px-4 py-2 bg-gray-800 text-white text-sm font-bold rounded-lg hover:bg-black transition-colors"
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
              <div className="flex justify-between text-green-600 font-medium text-sm">
                <span>Discount ({discountPercent}%):</span>
                <span>-₴{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t border-orange-100">
              <span className="text-gray-800 font-bold text-lg">
                Total Amount:
              </span>
              <span className="text-3xl font-black text-gray-900">
                ₴{totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
          <button
            type="submit"
            form="order-form"
            disabled={isSubmitting}
            className={cn(
              "w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-200 transition-all flex justify-center items-center gap-2 disabled:bg-orange-300 active:scale-[0.98]",
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
    </div>
  );
};

export default CartPage;
