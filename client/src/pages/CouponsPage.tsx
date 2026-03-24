import Card from '../components/ui/Card';

const CouponsPage = () => {
  return (
    <Card className="min-h-150">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Special Offers & Coupons</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border-2 border-dashed border-orange-200 p-6 rounded-xl bg-orange-50 flex flex-col items-center text-center">
          <span className="text-3xl mb-2">🎁</span>
          <h3 className="font-bold text-lg text-orange-800">Welcome Discount</h3>
          <p className="text-orange-600 text-sm mb-4">Get 10% off your first order</p>
          <div className="bg-white px-4 py-2 rounded border border-orange-200 font-mono font-bold text-orange-700">
            WELCOME10
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CouponsPage;