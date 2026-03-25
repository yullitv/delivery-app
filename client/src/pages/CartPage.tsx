import { useState } from "react";
import toast from "react-hot-toast";
import { useCartStore } from "../store/useCartStore";
import { submitOrder } from "../api/orderService";
import {
  normalizePhoneNumber,
  validateEmail,
  validatePhone,
} from "../lib/validation";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import { Send, ShoppingBag } from "lucide-react";
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

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "email":
        if (!validateEmail(value)) error = "Invalid email format";
        break;
      case "phone":
        if (!validatePhone(value)) error = "Format: +380XXXXXXXXX";
        break;
      case "name":
        if (value.trim().length < 2) error = "Name is too short";
        break;
      case "address":
        if (value.trim().length < 10) error = "Address is too short";
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
    if (errors[name])
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
  };

const applyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    
    const rewards: Record<string, number> = {
      "WELCOME10": 10,
      "ELIFTECH": 15,
      "SPRING20": 20,
      "HOTDEAL30": 30
    };

    if (rewards[code]) {
      setDiscountPercent(rewards[code]);
      toast.success(`Coupon applied! ${rewards[code]}% discount added.`);
    } else {
      toast.error("Invalid coupon code. Check the Coupons page!");
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
      toast.error("Please fill all fields correctly");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitOrder({
        userName: formData.name,
        email: formData.email,
        phone: normalizePhoneNumber(formData.phone),
        address: formData.address,
        totalPrice: Number(totalPrice.toFixed(2)),
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      });
      
      toast.success("Order placed successfully!", { duration: 4000 });
      clearCart();
      setFormData({ name: "", email: "", phone: "", address: "" });
      setDiscountPercent(0);
      setCouponCode("");
    } catch (err) {
      console.error("Order submission failed:", err);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <Card className="text-center py-20 animate-in fade-in duration-500">
        <div className="flex justify-center mb-4">
            <ShoppingBag size={64} className="text-gray-200" />
        </div>
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-in fade-in duration-500">
      <Card>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Send
            size={20}
            className={cn(isSubmitting ? "animate-pulse" : "text-orange-500")}
          />
          Delivery Information
        </h2>
        <form id="order-form" onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={(e) => validateField("name", e.target.value)}
            error={errors.name}
            disabled={isSubmitting}
            placeholder="Your full name"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={(e) => validateField("email", e.target.value)}
            error={errors.email}
            disabled={isSubmitting}
            placeholder="example@mail.com"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={(e) => validateField("phone", e.target.value)}
            error={errors.phone}
            disabled={isSubmitting}
            placeholder="+380XXXXXXXXX"
          />
          <Input
            label="Address"
            name="address"
            isTextArea
            value={formData.address}
            onChange={handleInputChange}
            onBlur={(e) => validateField("address", e.target.value)}
            error={errors.address}
            disabled={isSubmitting}
            placeholder="Street, building, apt..."
          />
        </form>
      </Card>

      <div className="space-y-4">
        <Card className="max-h-125 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-200">
          <div className="space-y-6">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
                disabled={isSubmitting}
              />
            ))}
          </div>
        </Card>

        <OrderSummary
          subtotal={subtotal}
          discountPercent={discountPercent}
          discountAmount={discountAmount}
          totalPrice={totalPrice}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          onApplyCoupon={applyCoupon}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default CartPage;