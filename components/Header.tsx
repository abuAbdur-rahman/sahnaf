// components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Route } from "next";
import Image from "next/image";

interface HeaderProps {
  shopStatus?: "open" | "closed";
}

export default function Header({ shopStatus = "open" }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/solar", label: "Solar" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div className="">
              <Image src="/logo.jpg" alt="LOGO" width={40} height={30} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">
                Sahnaf Global Tech
              </span>
              <span className="text-xs text-gray-600">Ogbomoso</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href as Route<string>}
                className={`font-medium transition ${
                  isActive(link.href)
                    ? "text-emerald-600"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Status Badge & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <div
              className={`${
                shopStatus === "open"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-red-100 text-red-800"
              } text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  shopStatus === "open"
                    ? "bg-emerald-500 animate-pulse"
                    : "bg-red-500"
                }`}
              ></div>
              Shop {shopStatus === "open" ? "Open" : "Closed"}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 border-t pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href as Route<string>}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition ${
                  isActive(link.href)
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
