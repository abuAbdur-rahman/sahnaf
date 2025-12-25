// components/ProductCard.tsx
"use client";

import { ShoppingBag } from "lucide-react";
import { Image } from "@imagekit/next";
import { Product } from "@/types";
import { FaWhatsapp } from "react-icons/fa";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hi, I'm interested in the ${product.name} priced at ₦${product.price.toLocaleString()}. Is it available at ${product.shop}?`;
    const whatsappUrl = `https://wa.me/2347068288647?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const getStockColor = () => {
    switch (product.stock) {
      case "in-stock":
        return "bg-emerald-500";
      case "low-stock":
        return "bg-orange-500";
      case "out-of-stock":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStockText = () => {
    switch (product.stock) {
      case "in-stock":
        return "In Stock";
      case "low-stock":
        return "Low Stock";
      case "out-of-stock":
        return "Out of Stock";
      default:
        return "Unknown";
    }
  };

  const imageKitEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-emerald-500 hover:shadow-lg transition-all duration-200 cursor-pointer group">
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
        {product.image ? (
          <Image
            urlEndpoint={imageKitEndpoint}
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <ShoppingBag className="h-16 w-16 text-gray-300 group-hover:text-gray-400 transition" />
        )}

        {/* Stock Badge */}
        {product.stock === "out-of-stock" && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-3">
        <h3 className="text-sm font-medium line-clamp-2 mb-2 min-h-10">
          {product.name}
        </h3>

        {/* Stock Status */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className={`w-2 h-2 rounded-full ${getStockColor()}`}></div>
          <span className="text-xs text-gray-600">{getStockText()}</span>
        </div>

        {/* Location */}
        <div className="text-xs text-gray-500 mb-3">
          Available at:{" "}
          <span className="font-medium text-gray-700">{product.shop}</span>
        </div>

        {/* Price and WhatsApp Button */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-emerald-600 font-bold font-mono text-lg">
              ₦{product.price.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleWhatsAppClick}
            disabled={product.stock === "out-of-stock"}
            className="bg-[#25D366] p-2.5 rounded-lg hover:bg-[#20BA5A] transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#25D366]"
            aria-label="Contact on WhatsApp"
          >
            <FaWhatsapp className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
