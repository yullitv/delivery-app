import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        {/* Navigation */}
        <nav className="bg-white shadow-sm p-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex gap-6">
            <Link to="/" className="font-bold text-orange-600 mr-auto">Delivery App</Link>
            <Link to="/" className="hover:text-orange-500 transition">Shop</Link>
            <Link to="/cart" className="hover:text-orange-500 transition">Shopping Cart</Link>
            <Link to="/history" className="hover:text-orange-500 transition">History</Link>
            <Link to="/coupons" className="hover:text-orange-500 transition">Coupons</Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<h1 className="text-2xl font-bold">Shops Page (Coming Soon)</h1>} />
            <Route path="/cart" element={<h1 className="text-2xl font-bold">Shopping Cart (Coming Soon)</h1>} />
            <Route path="/history" element={<h1 className="text-2xl font-bold">Order History (Coming Soon)</h1>} />
            <Route path="/coupons" element={<h1 className="text-2xl font-bold">Coupons (Coming Soon)</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;