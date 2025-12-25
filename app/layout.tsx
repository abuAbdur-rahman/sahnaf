// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sahnaf Global Tech | Solar, Gas & Electronics",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  description:
    "Your one-stop shop for solar installations, gas refills, power banks, chargers, and tech accessories in Ogbomoso. Two convenient locations: Under-G and Randa.",
  keywords:
    "solar installation ogbomoso, gas refill ogbomoso, power bank shop, chargers ogbomoso, tech accessories, POS services",
  authors: [{ name: "Sahnaf Global Tech" }],
  openGraph: {
    title: "Sahnaf Global Tech | Solar, Gas & Electronics",
    description:
      "Your one-stop shop for solar installations, gas refills, and tech accessories in Ogbomoso",
    type: "website",
    locale: "en_NG",
  },
  verification: {
    google: "pyDiOct_10ovMfW5_jMokK-cWFUnGFeStYbIrPFIjl0",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <WhatsAppFAB />

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
