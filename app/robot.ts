import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || "https://sahnaf.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/solar", "/shop"],
        disallow: ["/admin/*", "/api/*", "/_next/*", "/private/*"],
        crawlDelay: 2, // Be nice to servers
      },
      {
        // Special rules for major search engines
        userAgent: ["Googlebot", "Bingbot"],
        allow: "/",
        disallow: ["/admin/*", "/api/*"],
      },
      {
        // Block AI scrapers if desired
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
        ],
        allow: "/", // Uncomment if you want to block AI crawlers
        disallow: ["/admin/*", "/api/*"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
