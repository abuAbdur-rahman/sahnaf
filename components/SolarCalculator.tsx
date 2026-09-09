// components/SolarCalculator.tsx
"use client";

import { useState } from "react";
import {
  Zap,
  Fan,
  Tv,
  Refrigerator,
  Lightbulb,
  Laptop,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SolarCalculation } from "@/types";
import { FaWhatsapp } from "react-icons/fa";

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
      [field]: Math.max(0, Math.floor(Number.isNaN(value) ? 0 : value)),
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
      (calculation.fans || 0) * wattages.fan +
      (calculation.tvs || 0) * wattages.tv +
      (calculation.fridges || 0) * wattages.fridge +
      (calculation.bulbs || 0) * wattages.bulb +
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
    const appliances: string[] = [];

    if (calculation.fans > 0) appliances.push(`${calculation.fans} fan(s)`);
    if (calculation.tvs > 0) appliances.push(`${calculation.tvs} TV(s)`);
    if (calculation.fridges > 0)
      appliances.push(`${calculation.fridges} fridge(s)`);
    if (calculation.bulbs > 0) appliances.push(`${calculation.bulbs} bulb(s)`);
    if (calculation.laptops && calculation.laptops > 0)
      appliances.push(`${calculation.laptops} laptop(s)`);
    if (calculation.other && calculation.other > 0)
      appliances.push(`${calculation.other} other appliance(s)`);

    const message = `Hi, I need a solar setup for ${appliances.join(
      ", ",
    )}. Estimated requirement: ${kva}KVA. What's the estimate and installation cost?`;
    const whatsappUrl = `https://wa.me/2347068288647?text=${encodeURIComponent(
      message,
    )}`;
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
    <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-gray-200 shadow-lg w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="bg-emerald-100 p-3 rounded-xl shrink-0">
          <Zap className="h-6 w-6 text-emerald-600" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg sm:text-2xl font-bold truncate">
            Solar Calculator
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 truncate">
            Estimate daily load & recommended system size
          </p>
        </div>
      </div>

      {/* Inputs: responsive list (mobile-first, then compact horizontally on sm+) */}
      <div className="grid gap-3 mb-4">
        {appliances.map(({ field, label, icon: Icon, wattage }) => {
          const current = calculation[field] ?? 0;
          return (
            <div
              key={field}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-lg hover:shadow-sm transition bg-white/60"
            >
              {/* Left: icon + labels */}
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="bg-gray-100 p-2 rounded-lg shrink-0">
                  <Icon className="h-5 w-5 text-gray-600" />
                </div>

                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-700 truncate">
                    {label}
                  </label>
                  <div className="text-xs text-gray-500 truncate">
                    ~{wattage}W each
                  </div>
                </div>
              </div>

              {/* Right: controls */}
              <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleChange(field, Math.max(0, current - 1))}
                  aria-label={`Decrease ${label}`}
                  className="w-12 h-10 sm:w-9 sm:h-9 p-0"
                >
                  −
                </Button>

                <Input
                  type="number"
                  aria-label={`${label} count`}
                  value={current}
                  onChange={(e) =>
                    handleChange(
                      field,
                      parseInt(e.target.value || "0", 10) || 0,
                    )
                  }
                  min={0}
                  className="w-20 sm:w-16 text-center px-2 py-1 h-10 sm:h-9"
                />

                <Button
                  size="icon"
                  onClick={() => handleChange(field, current + 1)}
                  aria-label={`Increase ${label}`}
                  className="w-12 h-10 sm:w-9 sm:h-9 p-0"
                >
                  +
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Results */}
      <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border-2 border-emerald-200 mb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="text-sm text-emerald-800 font-medium">
              Total Power Consumption
            </div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-900">
              {calculateTotalWatts()}W
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-sm text-emerald-800 font-medium">
              Recommended System Size
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-600">
              {calculateKVA()} KVA
            </div>
          </div>
        </div>

        <div className="bg-white/60 rounded-lg p-3 mt-3 text-xs text-gray-700">
          <strong>Note:</strong> This is an estimated calculation with a 1.5x
          safety margin. Actual requirements may vary based on usage patterns
          and system efficiency.
        </div>
      </div>

      {/* WhatsApp CTA */}
      <Button
        onClick={handleWhatsAppQuote}
        disabled={calculateTotalWatts() === 0}
        className="w-full py-3 rounded-lg font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2"
      >
        <FaWhatsapp className="h-4 w-4" />
        Get Quote via WhatsApp
      </Button>

      <div className="mt-3 text-center text-xs text-gray-500">
        Our team will contact you with detailed pricing and installation options
      </div>
    </div>
  );
}
