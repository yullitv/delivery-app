import Card from '../components/ui/Card';

const HistoryPage = () => {
  return (
    <Card className="min-h-150">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Order History</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="tel"
          placeholder="Enter your phone"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button className="bg-orange-500 text-white px-8 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium">
          Search
        </button>
      </div>

      <div className="text-center py-20 text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
        <p className="italic">Enter your contact details to find your previous orders</p>
      </div>
    </Card>
  );
};

export default HistoryPage;