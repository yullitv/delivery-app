import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import HistoryPage from "./pages/HistoryPage";
import CouponsPage from "./pages/CouponsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto py-6 px-4">
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/coupons" element={<CouponsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
