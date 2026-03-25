import { useState } from "react";
import toast from "react-hot-toast";
import Card from "../components/ui/Card";
import { Gift, Copy, Check } from "lucide-react";

const COUPONS = [
  {
    code: "WELCOME10",
    discount: 10,
    desc: "Special offer for your first order",
  },
  { code: "ELIFTECH", discount: 15, desc: "Exclusive partner discount" },
  { code: "SPRING20", discount: 20, desc: "Spring season celebration sale" },
  { code: "HOTDEAL30", discount: 30, desc: "Limited time hot deal" },
];

const CouponsPage = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Code ${code} copied to clipboard!`);

    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <Card className="min-h-150">
      <h1 className="text-2xl font-bold mb-10 text-gray-800 tracking-tight">
        Special Offers & Coupons
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COUPONS.map((coupon) => (
          <div
            key={coupon.code}
            onClick={() => copyToClipboard(coupon.code)}
            className="group relative border-2 border-dashed border-orange-200 p-8 rounded-2xl bg-orange-50/30 flex flex-col items-center text-center hover:bg-orange-50 hover:border-orange-400 transition-all cursor-pointer shadow-sm hover:shadow-md"
          >
            <div className="bg-white p-4 rounded-full shadow-inner mb-4 transition-transform group-hover:scale-110">
              <Gift className="text-orange-500 w-8 h-8" />
            </div>

            <h3 className="font-black text-2xl text-orange-800 mb-1">
              {coupon.discount}% OFF
            </h3>
            <p className="text-orange-600 text-sm mb-6 font-medium">
              {coupon.desc}
            </p>

            <div className="w-full relative flex items-center justify-center bg-white py-4 rounded-xl border-2 border-orange-200 group-hover:border-orange-400 transition-colors shadow-sm">
              <span className="font-mono font-black text-2xl text-orange-700 tracking-[0.2em]">
                {coupon.code}
              </span>
              <div className="absolute right-4">
                {copiedCode === coupon.code ? (
                  <Check
                    size={20}
                    className="text-green-500 animate-in zoom-in"
                  />
                ) : (
                  <Copy
                    size={20}
                    className="text-orange-300 group-hover:text-orange-500 transition-colors"
                  />
                )}
              </div>
            </div>

            <p className="mt-4 text-[10px] text-orange-400 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Click to copy code
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CouponsPage;
