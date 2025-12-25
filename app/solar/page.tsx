"use client";

import { useState, useEffect } from "react";
import { Image } from "@imagekit/next";
import {
  Zap,
  MapPin,
  Shield,
  Clock,
  Award,
  TrendingUp,
  Loader2,
  Phone,
} from "lucide-react";
import SolarCalculator from "@/components/SolarCalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SolarProject } from "@/types";

export default function SolarPage() {
  const [projects, setProjects] = useState<SolarProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/solar-projects");
        if (res.ok) setProjects(await res.json());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);
  const imageKitEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-slate-950 text-white py-16 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-emerald-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-amber-500 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-emerald-500/30 px-3 py-1">
                <Zap className="h-3 w-3 mr-2 fill-current" /> Reliable Energy
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                Power Your Home <br />
                <span className="text-emerald-400">or Hostel</span>
              </h1>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-lg">
                24/7 electricity without the stress. Affordable solar solutions
                designed for zero <q>NEPA wahala.</q>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-14 px-8"
                  asChild
                >
                  <a href="#calculator">Calculate Requirements</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold h-14 px-8"
                  asChild
                >
                  <a href="#gallery">View Our Work</a>
                </Button>
              </div>
            </div>

            <div className="relative aspect-square md:h-125 w-full">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl -rotate-2 scale-105" />
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/hero_image.jpg"
                  alt="Solar Panels Installation"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Why Choose Solar Power?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Shield,
              title: "Reliable Power",
              desc: "24/7 electricity without depending on the grid.",
            },
            {
              icon: TrendingUp,
              title: "Cost Savings",
              desc: "Reduce bills significantly. Solar pays for itself.",
            },
            {
              icon: Clock,
              title: "Quick Setup",
              desc: "Professional installation within 1-3 days.",
            },
            {
              icon: Award,
              title: "Warranty",
              desc: "Quality components with full warranty coverage.",
            },
          ].map((b, i) => (
            <Card
              key={i}
              className="border-2 hover:border-emerald-500 transition-colors"
            >
              <CardHeader>
                <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-2">
                  <b.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="text-lg">{b.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {b.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="bg-slate-50 py-20 border-y">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Calculate Requirements</h2>
            <p className="text-muted-foreground">
              Recommend the right system size for your appliances.
            </p>
          </div>
          <SolarCalculator />
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12">Our Recent Installations</h2>
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          </div>
        ) : projects.length === 0 ? (
          <Card className="p-20 text-center text-muted-foreground bg-slate-50 border-dashed">
            <Zap className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>Gallery coming soon!</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((p) => (
              <Card key={p.id} className="overflow-hidden group border-2">
                <div className="aspect-video relative overflow-hidden bg-emerald-900">
                  {p.image ? (
                    <Image
                      urlEndpoint={imageKitEndpoint}
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <Zap className="h-12 w-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20" />
                  )}
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 text-emerald-600" /> {p.location}
                  </div>
                  {p.kva && (
                    <Badge
                      variant="secondary"
                      className="text-emerald-700 bg-emerald-50"
                    >
                      {p.kva} System
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Go Solar?</h2>
          <p className="text-xl mb-10 text-emerald-50 opacity-90">
            Get a free consultation and customized quote today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-slate-100 font-bold px-8"
              asChild
            >
              <a href="https://wa.me/2347068288647" target="_blank">
                WhatsApp Us
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-emerald-700/50 hover:bg-emerald-700 text-white font-bold px-8"
              asChild
            >
              <a href="tel:07068288647">
                <Phone className="mr-2 h-5 w-5" /> Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
