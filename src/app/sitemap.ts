import type { MetadataRoute } from "next";
import { getSpots } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const staticRoutes = [
    "",
    "/map",
    "/my-pilgrimage",
    "/routes",
    "/first-time",
    "/anime-locations",
    "/video-ideas",
    "/sources",
    "/about",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...getSpots().map((spot) => ({
      url: `${baseUrl}/spots/${spot.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
