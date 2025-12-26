import { Product } from "@/types";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://sahnaf.vercel.app";

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/solar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  try {
    const productsRes = await fetch(`${baseUrl}/api/products`, {
      next: { revalidate: 3600 },
    });

    if (productsRes.ok) {
      const products = await productsRes.json();
      const categories = [...new Set(products.map((p: Product) => p.category))];

      const categoryRoutes = categories.map((category) => ({
        url: `${baseUrl}/shop?category=${encodeURIComponent(category as string)}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
      routes.push(...categoryRoutes);
    }
  } catch (error) {
    console.error("Sitemap generation error:", error);
  }

  return routes;
}
