// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  ShoppingBag,
  CreditCard,
  Droplets,
  ChevronRight,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ShopCard from "@/components/ShopCard";
import { Shop } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { formatPrice } from "@/lib/utils";

async function getGasPrice() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/gas-price`,
      { cache: "no-store" },
    );
    return res.json();
  } catch {
    return { price: 1300, updatedAt: new Date() };
  }
}

async function getShops() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/shops`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch {
    return [
      // {
      //   id: "1",
      //   name: "Jornalis Junction (Under-G)",
      //   address: "UnderG Area, Ogbomoso, Oyo State",
      //   phone: "08061154835",
      //   services: ["Gas Refill", "Oil", "POS", "Tech Products", "Solar Pickup"],
      //   hasGas: true,
      //   mapEmbed:
      //     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d476.8335889582579!2d4.26279230063179!3d8.159310035985504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10370daf2d14ff23%3A0xeacf0a78619bdb88!2sJolanis%20Guest%20House!5e0!3m2!1sen!2sng!4v1766588385761!5m2!1sen!2sng",
      // },
      // {
      //   id: "2",
      //   name: "Opposite Anbode Filling Station",
      //   address: "Randa Area, Ogbomoso, Oyo State",
      //   phone: "08032580975",
      //   services: ["Solar Consults", "Tech Pickup", "POS"],
      //   hasGas: false,
      //   mapEmbed:
      //     "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1974.7155995482967!2d4.263815!3d8.159237!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10370db54ee94e5b%3A0xee2927c9c86f1d4a!2sDainty%20store!5e0!3m2!1sen!2sng!4v1766662847881!5m2!1sen!2sng",
      // },
    ];
  }
}

export default async function HomePage() {
  const gasPrice = await getGasPrice();
  const shops = await getShops();

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      {/* Hero Section with Image */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/hero_image.jpg"
            alt="Solar Installation Hero"
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/95 to-slate-950/40" />
        </div>

        {/* Decorative Blur Effects */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500 rounded-full blur-[150px]" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-500 rounded-full blur-[150px]" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-emerald-500/30 px-4 py-1.5">
              <Zap className="h-3.5 w-3.5 mr-2 fill-current" />
              Trusted Solar & Tech Solutions
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Power Your Life,{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-400">
                Your Way
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              From reliable solar installations to quality tech products and
              convenient services—all in Ogbomoso.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold h-14 px-8 shadow-lg shadow-emerald-500/20"
                asChild
              >
                <Link href="/solar">
                  Explore Solar Solutions
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-semibold h-14 px-8"
                asChild
              >
                <Link href="/shop">Browse Products</Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 mb-10 sm:pt-16 border-t border-white/10">
              {[
                { label: "Projects Completed", value: "100+" },
                { label: "Happy Customers", value: "500+" },
                { label: "Years Experience", value: "5+" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gas Price Card */}
          <Card className="bg-linear-to-br from-emerald-500 to-teal-600 border-0 shadow-xl hover:shadow-2xl transition-all group cursor-pointer">
            <Link href="/shop">
              <CardContent className="p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <Droplets className="h-10 w-10" />
                  <Badge className="bg-white/20 text-white border-0">
                    Live Price
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Today&apos;s Gas Price
                </h3>
                <div className="text-sm opacity-90 mb-3">Under-G Location</div>
                <div className="text-5xl font-bold font-mono mb-3">
                  ₦{formatPrice(gasPrice.price)}
                </div>
                <div className="text-xs opacity-80 mb-4">
                  per kg • Updated{" "}
                  {gasPrice.updatedAt &&
                    formatDistanceToNow(gasPrice.updatedAt, {
                      addSuffix: true,
                    })}
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                  Visit Shop <ChevronRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Link>
          </Card>

          {/* Solar Services Card */}
          <Card className="border-2 shadow-lg hover:shadow-xl hover:border-emerald-500 transition-all group cursor-pointer">
            <Link href="/solar">
              <CardContent className="p-6">
                <div className="bg-linear-to-br from-amber-500 to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">Solar Solutions</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Professional solar installation for homes and businesses. Say
                  goodbye to NEPA stress.
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all">
                  Learn More <ChevronRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Link>
          </Card>

          {/* Tech Products Card */}
          <Card className="border-2 shadow-lg hover:shadow-xl hover:border-emerald-500 transition-all group cursor-pointer">
            <Link href="/shop">
              <CardContent className="p-6">
                <div className="bg-linear-to-br from-emerald-500 to-teal-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-2">
                  Phone Accessories Store
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Quality chargers, power banks, accessories, and more. All in
                  stock and ready.
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all">
                  Browse Shop <ChevronRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Our Services
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From solar power to everyday essentials, we&apos;ve got Ogbomoso
            covered
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Zap,
              title: "Solar Installation",
              desc: "Expert installation with warranty. Power your space 24/7 without NEPA stress.",
              color: "from-amber-500 to-orange-600",
            },
            {
              icon: ShoppingBag,
              title: "Tech Products",
              desc: "Genuine electronics, chargers, and accessories you can trust.",
              color: "from-emerald-500 to-teal-600",
            },
            {
              icon: Droplets,
              title: "Gas Refills",
              desc: "Affordable cooking gas at competitive prices. Available at Under-G.",
              color: "from-teal-500 to-cyan-600",
            },
            {
              icon: CreditCard,
              title: "POS Services",
              desc: "Quick and reliable point-of-sale transactions at both locations.",
              color: "from-emerald-500 to-green-600",
            },
          ].map((service, i) => (
            <Card
              key={i}
              className="border-2 hover:border-emerald-500 transition-all group hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div
                  className={`bg-linear-to-br ${service.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <service.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Locations Section */}
      <section className="bg-slate-50 py-20 md:py-28 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              <MapPin className="h-3 w-3 mr-2" />
              Find Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Visit Our Locations
            </h2>
            <p className="text-muted-foreground text-lg">
              Two convenient locations serving Ogbomoso
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {shops.map((shop: Shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <Card className="bg-linear-to-br from-emerald-600 to-teal-700 border-0 shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-white/10 mask-[linear-gradient(0deg,transparent,black)]" />
          <CardContent className="p-12 md:p-16 relative z-10 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-emerald-50 max-w-2xl mx-auto">
              Whether you need solar power, tech products, or gas
              refills—we&apos;re here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-slate-100 font-bold h-14 px-8 shadow-xl"
                asChild
              >
                <a
                  href="https://wa.me/2347068288647"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  WhatsApp Us
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold h-14 px-8"
                asChild
              >
                <a href="tel:07068288647">
                  <Phone className="mr-2 h-5 w-5" />
                  Call 07068288647
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
