import Card from '../components/ui/Card';

const CartPage = () => {
  return (
    <Card className="min-h-150">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Shopping Cart</h1>
      <p className="text-gray-500 italic">Your cart is currently empty. Go get some burgers!</p>
    </Card>
  );
};

export default CartPage;