import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || "https://sahnaf.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/", // Keep raw JSON out of search results
        "/private/",
        "/_next/", // Usually unnecessary to block, but safe
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
