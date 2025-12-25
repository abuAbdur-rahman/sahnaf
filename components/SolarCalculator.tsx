// components/SolarCalculator.tsx
"use client";

import { useState } from "react";
import {
  MessageCircle,
  Zap,
  Fan,
  Tv,
  Refrigerator,
  Lightbulb,
  Laptop,
  Plus,
} from "lucide-react";
import { SolarCalculation } from "@/types";

export default function SolarCalculator() {
  const [calculation, setCalculation] = useState<SolarCalculation>({
    fans: 2,
    tvs: 1,
    fridges: 1,
    bulbs: 5,
    laptops: 0,
    other: 0,
  });

  const handleChange = (field: keyof SolarCalculation, value: number) => {
    setCalculation((prev) => ({
      ...prev,
      [field]: Math.max(0, value),
    }));
  };

  // Wattage estimates for common appliances
  const wattages = {
    fan: 75,
    tv: 100,
    fridge: 150,
    bulb: 15,
    laptop: 65,
    other: 100,
  };

  const calculateTotalWatts = () => {
    return (
      calculation.fans * wattages.fan +
      calculation.tvs * wattages.tv +
      calculation.fridges * wattages.fridge +
      calculation.bulbs * wattages.bulb +
      (calculation.laptops || 0) * wattages.laptop +
      (calculation.other || 0) * wattages.other
    );
  };

  const calculateKVA = () => {
    const totalWatts = calculateTotalWatts();
    const kva = (totalWatts / 1000) * 1.5; // 1.5x safety margin
    return kva.toFixed(2);
  };

  const handleWhatsAppQuote = () => {
    const kva = calculateKVA();
    const appliances = [];

    if (calculation.fans > 0) appliances.push(`${calculation.fans} fan(s)`);
    if (calculation.tvs > 0) appliances.push(`${calculation.tvs} TV(s)`);
    if (calculation.fridges > 0)
      appliances.push(`${calculation.fridges} fridge(s)`);
    if (calculation.bulbs > 0) appliances.push(`${calculation.bulbs} bulb(s)`);
    if (calculation.laptops && calculation.laptops > 0)
      appliances.push(`${calculation.laptops} laptop(s)`);
    if (calculation.other && calculation.other > 0)
      appliances.push(`${calculation.other} other appliance(s)`);

    const message = `Hi, I need a solar setup for ${appliances.join(", ")}. Estimated requirement: ${kva}KVA. What's the estimate and installation cost?`;
    const whatsappUrl = `https://wa.me/2347068288647?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const appliances = [
    {
      field: "fans" as keyof SolarCalculation,
      label: "Fans",
      icon: Fan,
      wattage: wattages.fan,
    },
    {
      field: "tvs" as keyof SolarCalculation,
      label: "TVs",
      icon: Tv,
      wattage: wattages.tv,
    },
    {
      field: "fridges" as keyof SolarCalculation,
      label: "Fridges/Freezers",
      icon: Refrigerator,
      wattage: wattages.fridge,
    },
    {
      field: "bulbs" as keyof SolarCalculation,
      label: "Light Bulbs",
      icon: Lightbulb,
      wattage: wattages.bulb,
    },
    {
      field: "laptops" as keyof SolarCalculation,
      label: "Laptops",
      icon: Laptop,
      wattage: wattages.laptop,
    },
    {
      field: "other" as keyof SolarCalculation,
      label: "Other Appliances",
      icon: Plus,
      wattage: wattages.other,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-100 p-3 rounded-xl">
          <Zap className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Solar Calculator</h2>
          <p className="text-sm text-gray-600">
            Calculate your power requirements
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {appliances.map(({ field, label, icon: Icon, wattage }) => (
          <div key={field} className="flex items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="bg-gray-100 p-2 rounded-lg">
                <Icon className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <span className="text-xs text-gray-500">~{wattage}W each</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleChange(field, calculation[field] ?? 0 - 1)}
                className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition font-bold text-gray-600"
                aria-label="Decrease"
              >
                −
              </button>
              <input
                type="number"
                value={calculation[field]}
                onChange={(e) =>
                  handleChange(field, parseInt(e.target.value) || 0)
                }
                className="w-16 text-center px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none font-semibold"
                min="0"
              />
              <button
                onClick={() => handleChange(field, calculation[field] ?? 0 + 1)}
                className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition font-bold text-gray-600"
                aria-label="Increase"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-emerald-800 font-medium mb-1">
              Total Power Consumption
            </div>
            <div className="text-2xl font-bold text-emerald-900">
              {calculateTotalWatts()}W
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-emerald-800 font-medium mb-1">
              Recommended System Size
            </div>
            <div className="text-3xl font-bold text-emerald-600">
              {calculateKVA()} KVA
            </div>
          </div>
        </div>

        <div className="bg-white/50 rounded-lg p-3 mb-4">
          <p className="text-xs text-gray-700">
            <strong>Note:</strong> This is an estimated calculation with a 1.5x
            safety margin. Actual requirements may vary based on usage patterns
            and system efficiency.
          </p>
        </div>

        <button
          onClick={handleWhatsAppQuote}
          disabled={calculateTotalWatts() === 0}
          className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <MessageCircle className="h-5 w-5" />
          Get Quote via WhatsApp
        </button>
      </div>

      <div className="mt-4 text-center text-xs text-gray-500">
        Our team will contact you with detailed pricing and installation options
      </div>
    </div>
  );
}
