// components/WhatsAppFAB.tsx
"use client";

import { MessageCircle } from "lucide-react";

interface WhatsAppFABProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppFAB({
  phoneNumber = "2347068288647",
  message = "Hi, I would like to inquire about your products and services.",
}: WhatsAppFABProps) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-[#25D366] p-4 rounded-full shadow-lg z-50 hover:scale-110 transition-transform duration-200 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-white" />

      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us
      </span>

      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
    </button>
  );
}
