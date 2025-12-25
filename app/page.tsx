// app/page.tsx
import Link from "next/link";
import {
  Zap,
  ShoppingBag,
  CreditCard,
  Droplets,
  ChevronRight,
} from "lucide-react";
import ShopCard from "@/components/ShopCard";
import { Shop } from "@/types";
import { formatDistanceToNow } from "date-fns";

async function getGasPrice() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/gas-price`,
      { cache: "no-store" },
    );
    return res.json();
  } catch {
    // USE A DATE OBJECT HERE
    return { price: 1300, updatedAt: new Date() };
  }
}

async function getShops() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/shops`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch {
    // Fallback data
    return [
      {
        id: "1",
        name: "Jornalis Junction (Under-G)",
        address: "UnderG Area, Ogbomoso, Oyo State",
        phone: "08032580975",
        services: ["Gas Refill", "Oil", "POS", "Tech Products", "Solar Pickup"],
        hasGas: true,
        mapEmbed:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d476.8335889582579!2d4.26279230063179!3d8.159310035985504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10370daf2d14ff23%3A0xeacf0a78619bdb88!2sJolanis%20Guest%20House!5e0!3m2!1sen!2sng!4v1766588385761!5m2!1sen!2sng",
        isOpen: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        name: "Opposite Anbode Filling Station",
        address: "Randa Area, Ogbomoso, Oyo State",
        phone: "08161154835",
        services: ["Solar Consults", "Tech Pickup", "POS"],
        hasGas: false,
        mapEmbed:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.6514888351066!2d4.228969499999999!3d8.1369169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103713ce14357323%3A0x91aef1b44edb59ed!2sSAHNAF%20GLOBAL%20TECH!5e0!3m2!1sen!2sng!4v1766588087593!5m2!1sen!2sng",
        isOpen: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}

export default async function HomePage() {
  const gasPrice = await getGasPrice();
  const shops = await getShops();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Bento Grid */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Solar Focus - Large Block */}
          <Link
            href="/solar"
            className="md:col-span-2 lg:col-span-2 bg-linear-to-br from-amber-500 to-orange-600 rounded-2xl p-8 text-white relative overflow-hidden min-h-75 flex flex-col justify-end hover:shadow-xl transition-all group"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <Zap className="h-12 w-12 mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Reliable Solar Solutions
              </h2>
              <p className="text-white/90 mb-4 text-sm md:text-base">
                Stop depending on NEPA. Power your home or business 24/7
              </p>
              <div className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-gray-100 transition">
                See Our Work <ChevronRight className="h-5 w-5" />
              </div>
            </div>
          </Link>

          {/* Gas Price - The Hook */}
          <Link
            href="/shop"
            className="bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white hover:shadow-xl transition-all group"
          >
            <Droplets className="h-8 w-8 mb-3" />
            <div className="text-sm font-medium mb-2">
              TODAY&apos;S GAS PRICE
            </div>
            <div className="text-sm opacity-90 mb-1">(Under-G Location)</div>
            <div className="text-5xl font-bold font-mono mb-2">
              ₦{gasPrice.price}
            </div>
            <div className="text-xs opacity-80">
              per kg • Updated{" "}
              {gasPrice.updatedAt &&
                formatDistanceToNow(gasPrice.updatedAt, {
                  addSuffix: true,
                })}
            </div>
            <div className="mt-4 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Visit Shop <ChevronRight className="h-4 w-4" />
            </div>
          </Link>

          {/* Tech Products Quick Link */}
          <Link
            href="/shop"
            className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer group"
          >
            <ShoppingBag className="h-8 w-8 text-emerald-600 mb-3 group-hover:scale-110 transition" />
            <h3 className="font-bold text-lg mb-2">Power Solutions</h3>
            <p className="text-gray-600 text-sm mb-3">
              Chargers, power banks & accessories in stock
            </p>
            <div className="text-emerald-600 font-semibold flex items-center gap-1 group-hover:gap-2 text-sm transition-all">
              Browse Shop <ChevronRight className="h-4 w-4" />
            </div>
          </Link>

          {/* POS Services */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all group">
            <CreditCard className="h-8 w-8 text-emerald-600 mb-3 group-hover:scale-110 transition" />
            <h3 className="font-bold text-lg mb-2">POS Services</h3>
            <p className="text-gray-600 text-sm mb-3">
              Available at both locations for your convenience
            </p>
            <div className="text-emerald-600 font-semibold flex items-center gap-1 text-sm">
              Both Locations <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Location Splitter */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Locations</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {shops.map((shop: Shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Why Choose Sahnaf?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">
                Expert Solar Installation
              </h3>
              <p className="text-gray-600 text-sm">
                Professional installation with warranty. Power your home
                reliably.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Quality Products</h3>
              <p className="text-gray-600 text-sm">
                Genuine tech accessories and electronics you can trust.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Convenient Services</h3>
              <p className="text-gray-600 text-sm">
                Gas refills, POS services, and tech support at both locations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
