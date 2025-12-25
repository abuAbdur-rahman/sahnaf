import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sahnaf Global Tech - Solar, Gas & Electronics",
    short_name: "Sahnaf Tech",
    description:
      "Your trusted partner for solar installations, cooking gas refills, and quality tech products in Ogbomoso. Professional solar power solutions, electronics, and convenient services.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#059669", // Emerald-600
    orientation: "portrait-primary",
    scope: "/",
    categories: ["business", "shopping", "utilities", "lifestyle"],
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/icon.png",
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow",
        label: "Sahnaf Tech Mobile View",
      },
      {
        src: "/icon.png",
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide",
        label: "Sahnaf Tech Desktop View",
      },
    ],
    shortcuts: [
      {
        name: "Solar Services",
        short_name: "Solar",
        description: "View our solar installation services",
        url: "/solar",
        icons: [{ src: "/icon.png", sizes: "192x192" }],
      },
      {
        name: "Shop Products",
        short_name: "Shop",
        description: "Browse our tech products",
        url: "/shop",
        icons: [{ src: "/icon.png", sizes: "192x192" }],
      },
      {
        name: "Contact Us",
        short_name: "Contact",
        description: "Get in touch with us",
        url: "/#contact",
        icons: [{ src: "/icon.png", sizes: "192x192" }],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
    lang: "en-NG",
    dir: "ltr",
  };
}
