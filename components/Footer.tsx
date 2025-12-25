import Link from "next/link";
import * as React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-3">Sahnaf Global Tech</h3>
            <p className="text-gray-400 text-sm">
              Your trusted partner for solar installations, gas refills, and
              quality tech products in Ogbomoso.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/solar" className="hover:text-white transition">
                  Solar Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-3">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>General: 07068288647</li>
              <li>Under-G: 08032580975</li>
              <li>Randa: 08161154835</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()}{" "}
            <Link
              className="hover:text-white transition"
              target="_blank"
              href="https://abdulazeez.name.ng"
            >
              Abdulazeez
            </Link>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
