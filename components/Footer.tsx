import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Zap,
  ShoppingBag,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Route } from "next";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                <Image
                  src="/logo.png"
                  alt="Sahnaf Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg">
                  Sahnaf Global Tech
                </span>
                <span className="text-xs text-slate-400">
                  Energy & Technology
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Your trusted partner for solar installations, cooking gas, and
              quality tech products in Ogbomoso. Powering homes and businesses
              since 2019.
            </p>
            <div className="flex gap-3">
              <Button
                size="icon"
                variant="ghost"
                className="bg-slate-800/50 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
                asChild
              >
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="bg-slate-800/50 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
                asChild
              >
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="bg-slate-800/50 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
                asChild
              >
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-emerald-400" />
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop Products" },
                { href: "/solar", label: "Solar Services" },
                { href: "#about", label: "About Us" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as Route<string>}
                    className="text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-400" />
              Our Services
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { icon: Sun, label: "Solar Installation" },
                { icon: ShoppingBag, label: "Tech Products" },
                { icon: Zap, label: "Gas Refills" },
                { icon: Phone, label: "POS Services" },
                { icon: Phone, label: "Repairs & Support" },
              ].map((service, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-400">
                  <service.icon className="h-4 w-4 text-emerald-400" />
                  {service.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
              <Phone className="h-5 w-5 text-emerald-400" />
              Get in Touch
            </h3>
            <div className="space-y-4 text-sm">
              {/* Phone Numbers */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-emerald-400 mt-0.5" />
                  <div>
                    <p className="text-slate-400 text-xs mb-1">General Line</p>
                    <a
                      href="tel:07068288647"
                      className="text-white hover:text-emerald-400 transition-colors font-medium"
                    >
                      070 6828 8647
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-emerald-400 mt-0.5" />
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Under-G Shop</p>
                    <a
                      href="tel:08032580975"
                      className="text-white hover:text-emerald-400 transition-colors font-medium"
                    >
                      080 3258 0975
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-emerald-400 mt-0.5" />
                  <div>
                    <p className="text-slate-400 text-xs mb-1">Randa Shop</p>
                    <a
                      href="tel:08161154835"
                      className="text-white hover:text-emerald-400 transition-colors font-medium"
                    >
                      081 6115 4835
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 pt-4">
                <MapPin className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <p className="text-slate-400 leading-relaxed">
                  Under-G & Randa Areas
                  <br />
                  Ogbomoso, Oyo State, Nigeria
                </p>
              </div>

              {/* WhatsApp Button */}
              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white mt-4"
                asChild
              >
                <a
                  href="https://wa.me/2347068288647"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-800" />

        {/* Bottom Bar */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © {currentYear} Sahnaf Global Tech. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="#privacy"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#terms"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="https://abdulazeez.name.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Built by Abdulazeez
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
