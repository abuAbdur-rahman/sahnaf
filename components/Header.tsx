// components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Route } from "next";

interface HeaderProps {
  shopStatus?: "open" | "closed";
}

export default function Header({ shopStatus = "open" }: HeaderProps) {
  const pathname = usePathname() || "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/solar", label: "Solar" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-12" : "h-16"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity group shrink-0"
            aria-label="Go to homepage"
          >
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors shrink-0">
              <Image
                src="/logo.png"
                alt="Sahnaf Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>

            {/* Show text only on sm+ to save horizontal space on very small screens */}
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-bold text-lg">Sahnaf Global Tech</span>
              <span className="text-xs text-muted-foreground">
                Ogbomoso, Nigeria
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-2 lg:gap-3 flex-1 justify-center"
            aria-label="Primary"
          >
            <div className="flex gap-2 overflow-x-auto no-scrollbar px-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href as Route<string>}>
                  <Button
                    variant={isActive(link.href) ? "default" : "ghost"}
                    className={`whitespace-nowrap ${
                      isActive(link.href)
                        ? "bg-emerald-600 hover:bg-emerald-500"
                        : ""
                    }`}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>
          </nav>

          {/* Right Side: Status Badge & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Status Badge - visible from xs (compact) */}
            <Badge
              variant={shopStatus === "open" ? "default" : "destructive"}
              className={`flex items-center gap-2 px-3 py-1 text-xs ${
                shopStatus === "open" ? "bg-emerald-100 text-emerald-800" : ""
              }`}
              aria-hidden={false}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  shopStatus === "open"
                    ? "bg-emerald-500 animate-pulse"
                    : "bg-red-500"
                }`}
                aria-hidden
              />
              <span className="font-semibold">
                {shopStatus === "open" ? "Open" : "Closed"}
              </span>
            </Badge>

            {/* Desktop CTA (small on md+, hidden on mobile) */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="https://wa.me/2347068288647"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap"
              >
                <Button size="sm">Contact</Button>
              </Link>
            </div>

            {/* Mobile Menu (Sheet) */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-72 sm:w-80">
                <SheetHeader className="flex items-center justify-between">
                  <SheetTitle>Menu</SheetTitle>
                  {/* Close button for clarity inside sheet */}
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" aria-label="Close menu">
                      <X className="h-4 w-4" />
                    </Button>
                  </SheetClose>
                </SheetHeader>

                <nav
                  className="flex flex-col gap-3 mt-6"
                  aria-label="Mobile primary"
                >
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href as Route<string>}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full"
                    >
                      <Button
                        variant={isActive(link.href) ? "default" : "ghost"}
                        className={`w-full justify-between ${
                          isActive(link.href)
                            ? "bg-emerald-600 hover:bg-emerald-500"
                            : ""
                        }`}
                        aria-current={isActive(link.href) ? "page" : undefined}
                      >
                        {link.label}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  ))}

                  {/* Shop Status in Mobile */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <div className="text-sm font-medium">Shop Status</div>
                        <div className="text-xs text-gray-600">
                          {shopStatus === "open"
                            ? "We're open — come by!"
                            : "Currently closed"}
                        </div>
                      </div>
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
                  <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
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
