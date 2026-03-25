import { useState } from "react";
import toast from "react-hot-toast";
import { useCartStore } from "../store/useCartStore";
import { submitOrder } from "../api/orderService";
import { normalizePhoneNumber, validateEmail, validatePhone } from "../lib/validation";
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
    phone: "+380",
    address: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const totalPrice = subtotal - discountAmount;

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "email":
        if (!validateEmail(value)) error = "Invalid email format (e.g. user@mail.com)";
        break;
      case "phone":
        if (!validatePhone(value)) error = "Phone must be +380 and 9 digits";
        break;
      case "name":
        if (value.trim().length < 2) error = "Name is too short";
        break;
      case "address":
        if (value.trim().length < 10) error = "Address must be at least 10 chars";
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!value.startsWith("+380")) {
        setFormData((prev) => ({ ...prev, phone: "+380" }));
        return;
      }
      if (value.length > 13) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const applyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    const rewards: Record<string, number> = { "WELCOME10": 10, "ELIFTECH": 15, "SPRING20": 20, "HOTDEAL30": 30 };
    if (rewards[code]) {
      setDiscountPercent(rewards[code]);
      toast.success(`Coupon applied! ${rewards[code]}% discount.`);
    } else {
      toast.error("Invalid coupon.");
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
      toast.error("Please fix errors in the form");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitOrder({
        userName: formData.name.trim(),
        email: formData.email.trim(),
        phone: normalizePhoneNumber(formData.phone),
        address: formData.address.trim(),
        totalPrice: Number(totalPrice.toFixed(2)),
        items: items.map(item => ({ productId: item.id, quantity: item.quantity, price: item.price })),
      });
      
      toast.success("Order placed!");
      clearCart();
      setFormData({ name: "", email: "", phone: "+380", address: "" });
      setDiscountPercent(0);
      setCouponCode("");
    } catch (err) {
      console.error(err);
      toast.error("Order failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <Card className="text-center py-20">
        <ShoppingBag size={64} className="mx-auto text-gray-200 mb-4" />
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-in fade-in duration-500">
      <Card>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Send size={20} className={cn(isSubmitting ? "animate-pulse" : "text-orange-500")} />
          Delivery Information
        </h2>
        <form id="order-form" onSubmit={handleSubmit} className="space-y-5">
          <Input label="Name" name="name" value={formData.name} onChange={handleInputChange} onBlur={(e) => validateField("name", e.target.value)} error={errors.name} placeholder="John Doe" />
          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} onBlur={(e) => validateField("email", e.target.value)} error={errors.email} placeholder="john@example.com" />
          <Input label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} onBlur={(e) => validateField("phone", e.target.value)} error={errors.phone} />
          <Input label="Address" name="address" isTextArea value={formData.address} onChange={handleInputChange} onBlur={(e) => validateField("address", e.target.value)} error={errors.address} placeholder="City, Street, House..." />
        </form>
      </Card>

      <div className="space-y-4">
        <Card className="max-h-125 overflow-y-auto">
          <div className="space-y-6">
            {items.map((item) => (
              <CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} disabled={isSubmitting} />
            ))}
          </div>
        </Card>
        <OrderSummary subtotal={subtotal} discountPercent={discountPercent} discountAmount={discountAmount} totalPrice={totalPrice} couponCode={couponCode} setCouponCode={setCouponCode} onApplyCoupon={applyCoupon} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export default CartPage;