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
  Sun,
  Battery,
  Lightbulb,
  Calendar,
} from "lucide-react";
import SolarCalculator from "@/components/SolarCalculator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { SolarProject } from "@/types";
import { format } from "date-fns";

export default function SolarPage() {
  const [projects, setProjects] = useState<SolarProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<SolarProject | null>(
    null,
  );

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/solar-projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const imageKitEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      {/* Hero Section - No Image */}
      <section className="relative bg-linear-to-br from-slate-950 via-slate-900 to-emerald-950 text-white py-20 md:py-32 overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-500 rounded-full blur-[120px] animate-pulse delay-75" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.05] mask-[linear-gradient(0deg,transparent,black)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-emerald-500/30 px-4 py-2 text-base">
              <Sun className="h-4 w-4 mr-2 fill-current" />
              Renewable Energy Solutions
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Power Your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400">
                Home or Hostel
              </span>{" "}
              24/7
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Affordable solar installations designed for Nigeria. No more NEPA
              wahala—just reliable, clean energy every single day.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-14 px-8 shadow-lg shadow-emerald-500/20"
                asChild
              >
                <a href="#calculator">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Calculate Your Needs
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-bold h-14 px-8"
                asChild
              >
                <a href="#gallery">View Installations</a>
              </Button>
            </div>

            {/* Key Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/10">
              {[
                { icon: Battery, label: "Long-lasting Batteries" },
                { icon: Shield, label: "Full Warranty" },
                { icon: Clock, label: "Fast Installation" },
                { icon: Award, label: "Expert Service" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3 group cursor-pointer"
                >
                  <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-all group-hover:scale-110">
                    <item.icon className="h-7 w-7 text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-300">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Why Go Solar?
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Smart Choice for Nigerian Homes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join hundreds of satisfied customers enjoying uninterrupted power
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Shield,
              title: "Reliable 24/7 Power",
              desc: "Never worry about power outages again. Solar runs day and night with battery backup.",
              color: "from-emerald-500 to-teal-600",
            },
            {
              icon: TrendingUp,
              title: "Massive Savings",
              desc: "Cut your electricity bills by up to 90%. Solar pays for itself within 2-3 years.",
              color: "from-amber-500 to-orange-600",
            },
            {
              icon: Clock,
              title: "Quick Installation",
              desc: "Professional setup completed in just 1-3 days. Minimal disruption to your routine.",
              color: "from-teal-500 to-cyan-600",
            },
            {
              icon: Award,
              title: "Quality Guarantee",
              desc: "Premium components with comprehensive warranty coverage for peace of mind.",
              color: "from-emerald-500 to-green-600",
            },
          ].map((benefit, i) => (
            <Card
              key={i}
              className="border-2 hover:border-emerald-500 transition-all group hover:shadow-xl"
            >
              <CardHeader>
                <div
                  className={`bg-linear-to-br ${benefit.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <benefit.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {benefit.desc}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 py-20 md:py-28 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              Our Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Getting Solar is Easy
            </h2>
            <p className="text-muted-foreground text-lg">
              From consultation to installation in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Consultation",
                desc: "Tell us your power needs and budget. We'll recommend the perfect system.",
              },
              {
                step: "02",
                title: "Site Survey",
                desc: "Our team visits your location to assess space, wiring, and optimal panel placement.",
              },
              {
                step: "03",
                title: "Installation",
                desc: "Professional installation completed in 1-3 days with minimal disruption.",
              },
              {
                step: "04",
                title: "Enjoy Power",
                desc: "Start enjoying 24/7 electricity immediately. We provide ongoing support.",
              },
            ].map((item, i) => (
              <Card key={i} className="border-2 relative overflow-hidden group">
                <div className="absolute top-0 right-0 text-8xl font-bold text-emerald-50 group-hover:text-emerald-100 transition-colors">
                  {item.step}
                </div>
                <CardHeader className="relative z-10">
                  <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 font-bold text-lg">
                    {item.step}
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section
        id="calculator"
        className="container mx-auto px-4 py-20 md:py-28"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">
              <Lightbulb className="h-3 w-3 mr-2" />
              System Calculator
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Find Your Perfect Solar System
            </h2>
            <p className="text-muted-foreground text-lg">
              Answer a few questions to get a customized recommendation
            </p>
          </div>

          <Card className="shadow-xl border-2">
            <CardContent className="p-8">
              <SolarCalculator />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="bg-slate-50 py-20 md:py-28 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">
              Our Work
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recent Solar Installations
            </h2>
            <p className="text-muted-foreground text-lg">
              Real projects from satisfied customers across Ogbomoso
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mb-4" />
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : error ? (
            <Alert variant="destructive" className="max-w-2xl mx-auto">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : projects.length === 0 ? (
            <Card className="p-20 text-center bg-white border-2 border-dashed max-w-2xl mx-auto">
              <Zap className="h-16 w-16 mx-auto mb-4 text-muted-foreground/20" />
              <p className="text-muted-foreground text-lg mb-2">
                Gallery Coming Soon
              </p>
              <p className="text-sm text-muted-foreground">
                Check back later to see our completed installations
              </p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="overflow-hidden group border-2 hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="aspect-4/3 relative overflow-hidden bg-slate-900">
                    {project.image ? (
                      <Image
                        urlEndpoint={imageKitEndpoint}
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="h-16 w-16 text-white/10" />
                      </div>
                    )}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                          View Details
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-1">
                      {project.title}
                    </CardTitle>
                    {project.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                        {project.location}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    {project.kva && (
                      <Badge
                        variant="secondary"
                        className="text-emerald-700 bg-emerald-50"
                      >
                        {project.kva} System
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Details Modal */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-2xl">
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="overflow-y-auto px-6 pb-6">
            {/* Large Image */}
            {selectedProject?.image && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-900 mb-6">
                <Image
                  urlEndpoint={imageKitEndpoint}
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}

            {/* Project Details */}
            <div className="space-y-6">
              {/* Info Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {selectedProject?.location && (
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Location
                      </p>
                      <p className="font-semibold">
                        {selectedProject.location}
                      </p>
                    </div>
                  </div>
                )}

                {selectedProject?.kva && (
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <Zap className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        System Size
                      </p>
                      <p className="font-semibold">{selectedProject.kva}</p>
                    </div>
                  </div>
                )}

                {selectedProject?.completedAt && (
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                    <div className="bg-teal-100 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Completed
                      </p>
                      <p className="font-semibold">
                        {format(
                          new Date(selectedProject.completedAt),
                          "MMMM yyyy",
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {selectedProject?.description && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-lg mb-3">
                      Project Details
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
                </>
              )}

              {/* CTA */}
              <Separator />
              <div className="bg-linear-to-r from-emerald-50 to-teal-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">
                  Interested in a Similar System?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Get a free consultation and customized quote for your home or
                  business.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-500"
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
                  <Button variant="outline" asChild>
                    <a href="tel:07068288647">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <Card className="bg-linear-to-br from-emerald-600 via-emerald-700 to-teal-700 border-0 shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-white/10 mask-[linear-gradient(0deg,transparent,black)]" />
          <CardContent className="p-12 md:p-20 relative z-10 text-center text-white">
            <Sun className="h-16 w-16 mx-auto mb-6 text-amber-300" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Go Solar?
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-emerald-50 max-w-2xl mx-auto leading-relaxed">
              Get a free consultation and customized quote today. Join hundreds
              of satisfied customers enjoying 24/7 power.
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
                  WhatsApp Us Now
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
