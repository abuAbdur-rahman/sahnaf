import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || "https://sahnaf.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/solar",
          "/shop",
          "/sitemap.xml", // 👈 Explicitly allow the sitemap
        ],
        disallow: [
          "/admin/*",
          "/api/*", // ⚠️ This often conflicts with Search Console fetching
          "/_next/*",
          "/private/*",
        ],
      },
      {
        userAgent: ["Googlebot", "Bingbot"],
        allow: [
          "/",
          "/sitemap.xml",
          "/api/products", // 👈 Allow Google to see the data sources
          "/api/solar-projects", // 👈 Allow Google to see the data sources
        ],
        disallow: ["/admin/*", "/api/auth/*"], // Only block sensitive API parts
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
