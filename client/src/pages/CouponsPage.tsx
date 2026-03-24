import Card from "../components/ui/Card";
import { Gift } from "lucide-react"; // Додамо іконку для солідності

const CouponsPage = () => {
  return (
    <Card className="min-h-150 flex flex-col">
      <h1 className="text-2xl font-bold mb-10 text-gray-800">
        Special Offers & Coupons
      </h1>

      {/* Центруємо контент по вертикалі та горизонталі всередині Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-sm w-full border-2 border-dashed border-orange-200 p-10 rounded-2xl bg-orange-50/50 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-white p-4 rounded-full shadow-inner mb-4">
            <Gift className="text-orange-500 w-10 h-10" />
          </div>

          <h3 className="font-bold text-2xl text-orange-800 mb-2">
            Welcome Discount
          </h3>
          <p className="text-orange-600 mb-6">
            Get 10% off your first order by using this code at checkout
          </p>

          <div className="group relative cursor-pointer">
            <div className="absolute -inset-1 bg-orange-200 rounded blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <div className="relative bg-white px-8 py-3 rounded-xl border-2 border-orange-200 font-mono font-bold text-2xl text-orange-700 tracking-wider">
              WELCOME10
            </div>
          </div>

          <p className="mt-6 text-xs text-orange-400 font-medium uppercase tracking-widest">
            Valid for new users only
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CouponsPage;
