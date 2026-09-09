// components/ShopCard.tsx
"use client";

import { MapPin, Phone, Check, X, ExternalLink } from "lucide-react";
import { Shop } from "@/types";
import { isShopOpen } from "@/lib/utils";

interface ShopCardProps {
  shop: Shop;
}

export default function ShopCard({ shop }: ShopCardProps) {
  const handleMapClick = () => {
    window.open(shop.mapEmbed.replace("output=embed", "output=map"), "_blank");
  };

  const handleCallClick = () => {
    window.location.href = `tel:${shop.phone}`;
  };

  const open = isShopOpen();

  return (
    <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md">
      {/* Map Embed */}
      <div className="relative h-48 bg-gray-100">
        <iframe
          src={shop.mapEmbed}
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${shop.name}`}
        />
        <button
          onClick={handleMapClick}
          className="absolute top-3 right-3 bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition"
          aria-label="Open in Google Maps"
        >
          <ExternalLink className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* Shop Details */}
      <div className="p-6">
        <h3 className="font-bold text-xl mb-3">{shop.name}</h3>

        {/* Address */}
        <div className="flex items-start gap-2 text-gray-600 text-sm mb-2">
          <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-emerald-600" />
          <span>{shop.address}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 mb-4">
          <Phone className="h-4 w-4 text-emerald-600" />
          <button
            onClick={handleCallClick}
            className="text-gray-600 text-sm hover:text-emerald-600 transition font-medium"
          >
            {shop.phone}
          </button>
        </div>

        {/* Services */}
        <div className="mb-4">
          <div className="text-sm font-semibold text-gray-700 mb-2">
            Available Services:
          </div>
          <div className="flex flex-wrap gap-2">
            {shop.services.map((service) => (
              <span
                key={service}
                className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-full flex items-center gap-1 font-medium"
              >
                <Check className="h-3 w-3" /> {service}
              </span>
            ))}
          </div>
        </div>

        {/* Gas Availability Notice */}
        {!shop.hasGas && (
          <div className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <X className="h-4 w-4 text-orange-600 mt-0.5 shrink-0" />
            <span className="text-xs text-orange-800 font-medium">
              Gas refill not available at this location
            </span>
          </div>
        )}

        {/* Status Badge */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status:</span>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                open
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {open ? "Open Now" : "Closed"}
            </span>
          </div>
        </div>

        {/* View Map Button */}
        <button
          onClick={handleMapClick}
          className="w-full mt-4 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2"
        >
          <MapPin className="h-4 w-4" />
          View on Google Maps
        </button>
      </div>
    </div>
  );
}
