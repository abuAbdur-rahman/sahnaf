// src/components/banner/BannerSlideshow.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Droplets,
  Smartphone,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

export default function BannerSlideshow({
  gasPrice,
}: {
  gasPrice: {
    price: number;
    updatedAt: string;
  };
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Slides derived from props (memoize so imageErrors initial state can match length)
  const slides = useMemo(
    () => [
      {
        type: "gas-price",
        content: { price: gasPrice.price, updatedAt: gasPrice.updatedAt },
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
    ],
    [gasPrice],
  );

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  return (
    <div className="relative w-full bg-linear-to-r from-slate-800 via-slate-900 to-zinc-900 text-white overflow-hidden">
      {/* Slides container */}
      <div className="relative h-56 sm:h-64 md:h-72 lg:h-80">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          const translateClass = isActive
            ? "opacity-100 translate-x-0"
            : index < currentSlide
              ? "opacity-0 -translate-x-full"
              : "opacity-0 translate-x-full";

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${translateClass}`}
              aria-hidden={!isActive}
            >
              {/* GAS PRICE SLIDE */}
              {slide.type === "gas-price" && (
                <div className="h-full bg-linear-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-center px-4">
                  <div className="text-center max-w-4xl w-full">
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <Droplets className="h-9 w-9 sm:h-11 sm:w-11 md:h-14 md:w-14" />
                      <div className="text-left">
                        <div className="text-sm sm:text-base opacity-95">
                          Today&apos;s Gas Price (Under-G)
                        </div>
                        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-mono">
                          ₦{formatPrice(slide.content.price ?? 0)}/kg
                        </div>
                        <div className="text-xs sm:text-sm opacity-90 mt-1">
                          Updated {slide.content.updatedAt}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* IMAGE SLIDE (with fallback if error) */}
              {slide.type === "image" && (
                <div className="w-full h-full relative">
                  {/* if the image failed to load, render a dark gradient fallback */}
                  {!slide.content.url ? (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-r from-slate-700 to-slate-900 px-6">
                      <div className="text-center max-w-3xl">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                          {slide.content.title}
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90">
                          {slide.content.subtitle}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Image
                        src={slide.content.url}
                        alt={slide.content.alt}
                        fill
                        // onError={() => handleImageError(index)}
                        className="w-full h-full object-cover"
                        priority={index === 1} // prioritize first image
                      />
                      {/* stronger overlay for better contrast */}
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center text-white px-4 max-w-3xl">
                          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 drop-shadow">
                            {slide.content.title}
                          </h2>
                          <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-95 drop-shadow">
                            {slide.content.subtitle}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* PHONE CHARGING SLIDE */}
              {slide.type === "phone-charging" && (
                <div className="h-full bg-linear-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-center px-4">
                  <div className="text-center max-w-4xl w-full">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <Smartphone className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16" />
                      <Zap className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-yellow-300 animate-pulse" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                      {slide.content.title}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 opacity-95">
                      {slide.content.subtitle}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {slide.content.features?.map(
                        (feature: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium border border-white/20 bg-white/10 text-white"
                          >
                            {feature}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-20 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full z-20 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-200 rounded-full ${
              idx === currentSlide
                ? "bg-white w-8 h-2"
                : "bg-white/50 w-2 h-2 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Auto indicator */}
      {isAutoPlaying && (
        <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
          Auto
        </div>
      )}
    </div>
  );
}
