import { useState, useEffect } from "react";
import { Smartphone, Zap } from "lucide-react";
import Image from "next/image";

export default function BannerSlideshow({
  gasPrice,
}: {
  gasPrice: {
    price: number;
    updatedAt: string;
  };
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: "gas-price",
      content: {
        price: gasPrice.price,
        updatedAt: gasPrice.updatedAt,
      },
    },
    {
      type: "image",
      content: {
        url: "/pa_banner.png",
        alt: "A collection of phone accessories including chargers, cables, and power banks.",
        title: "Your One-Stop Tech Shop",
        subtitle:
          "Discover genuine chargers, durable cables, power banks, and other essential phone accessories.",
      },
    },
    {
      type: "phone-charging",
      content: {
        title: "Never Run Low on Battery",
        subtitle:
          "Our secure phone charging service is fast, reliable, and compatible with all devices.",
        features: ["Quick Charge", "All Devices", "Safe & Secure"],
      },
    },
    {
      type: "image",
      content: {
        url: "/s_banner.png",
        alt: "Professional solar panel installation on a residential rooftop.",
        title: "Power Your Life with Solar",
        subtitle:
          "Expert solar installations for 24/7 electricity. Say goodbye to power outages and high bills.",
      },
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full bg-gray-900 overflow-hidden">
      {/* Slides Container */}
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-80">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
            }`}
          >
            {/* Image Slide */}
            {slide.type === "image" && slide.content.url && (
              <div className="h-full relative">
                <Image
                  src={slide.content.url}
                  alt={slide.content.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center text-white px-4 max-w-3xl">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 drop-shadow-lg">
                      {slide.content.title}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 drop-shadow-lg">
                      {slide.content.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Phone Charging Slide */}
            {slide.type === "phone-charging" && (
              <div className="h-full bg-linear-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white flex items-center justify-center px-4">
                <div className="text-center max-w-4xl w-full">
                  <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <Smartphone className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16" />
                    <Zap className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-yellow-300 animate-pulse" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
                    {slide.content.title}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-3 sm:mb-4 opacity-90">
                    {slide.content.subtitle}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                    {slide.content.features?.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
