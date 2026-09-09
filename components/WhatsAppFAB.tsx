// components/WhatsAppFAB.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppFABProps {
  phoneNumber?: string;
  message?: string;
  hideOnDesktop?: boolean;
}

export default function WhatsAppFAB({
  phoneNumber = "2347068288647",
  message = "Hi, I would like to inquire about your products and services.",
  hideOnDesktop = false,
}: WhatsAppFABProps) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className={`fixed bottom-5 right-5 z-50 ${
              hideOnDesktop ? "sm:hidden" : ""
            }`}
          >
            <div className="relative">
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full bg-green-500 opacity-25 animate-ping" />

              <Button
                size="icon"
                className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
              >
                <FaWhatsapp className="h-7 w-7" />
              </Button>
            </div>
          </a>
        </TooltipTrigger>

        <TooltipContent side="left" align="center">
          <p>Chat with us on WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
