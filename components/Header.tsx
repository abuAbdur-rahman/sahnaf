"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Route } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface HeaderProps {
  shopStatus?: "open" | "closed";
}

export default function Header({ shopStatus = "open" }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
          >
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
              <Image
                src="/logo.png"
                alt="Sahnaf Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">
                Sahnaf Global Tech
              </span>
              <span className="text-xs text-muted-foreground">
                Ogbomoso, Nigeria
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href as Route<string>}>
                <Button
                  variant={isActive(link.href) ? "default" : "ghost"}
                  className={
                    isActive(link.href)
                      ? "bg-emerald-600 hover:bg-emerald-500"
                      : ""
                  }
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Right Side: Status Badge & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Status Badge */}
            <Badge
              variant={shopStatus === "open" ? "default" : "destructive"}
              className={`hidden sm:flex items-center gap-2 ${
                shopStatus === "open"
                  ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                  : ""
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  shopStatus === "open"
                    ? "bg-emerald-500 animate-pulse"
                    : "bg-red-500"
                }`}
              />
              <span className="text-xs font-semibold">
                {shopStatus === "open" ? "We're Open" : "Closed"}
              </span>
            </Badge>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-75 sm:w-100">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href as Route<string>}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant={isActive(link.href) ? "default" : "ghost"}
                        className={`w-full justify-between ${
                          isActive(link.href)
                            ? "bg-emerald-600 hover:bg-emerald-500"
                            : ""
                        }`}
                      >
                        {link.label}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  ))}

                  {/* Shop Status in Mobile */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <span className="text-sm font-medium">Shop Status</span>
                      <Badge
                        variant={
                          shopStatus === "open" ? "default" : "destructive"
                        }
                        className={
                          shopStatus === "open"
                            ? "bg-emerald-100 text-emerald-800"
                            : ""
                        }
                      >
                        <span
                          className={`w-2 h-2 rounded-full mr-2 ${
                            shopStatus === "open"
                              ? "bg-emerald-500 animate-pulse"
                              : "bg-red-500"
                          }`}
                        />
                        {shopStatus === "open" ? "Open" : "Closed"}
                      </Badge>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                    <p className="text-sm font-semibold text-emerald-900 mb-2">
                      Contact Us
                    </p>
                    <div className="space-y-1 text-sm text-emerald-700">
                      <p>General: 07068288647</p>
                      <p>Under-G: 08032580975</p>
                      <p>Randa: 08161154835</p>
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
