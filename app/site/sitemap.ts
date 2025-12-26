import { Product, SolarProject } from "@/types";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://sahnaf.vercel.app";

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/solar`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ];

  // Optionally fetch dynamic routes (products, projects)
  try {
    // Fetch solar projects for dynamic URLs
    const projectsRes = await fetch(`${baseUrl}/api/solar-projects`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (projectsRes.ok) {
      const projects = await projectsRes.json();
      const projectRoutes = projects.map((project: SolarProject) => ({
        url: `${baseUrl}/solar#project-${project.id}`,
        lastModified: new Date(project.updatedAt || project.createdAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
      routes.push(...projectRoutes);
    }

    // Fetch product categories for dynamic URLs
    const productsRes = await fetch(`${baseUrl}/api/products`, {
      next: { revalidate: 3600 },
    });

    if (productsRes.ok) {
      const products = await productsRes.json();
      // Get unique categories
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
    console.error("Error generating dynamic sitemap routes:", error);
  }

  return routes;
}
