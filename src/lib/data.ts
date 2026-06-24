import animeLocations from "@/data/anime-locations.json";
import animeScenes from "@/data/anime-scenes.json";
import assetsIndex from "@/data/assets-index.json";
import firstVisit from "@/data/first-visit.json";
import mapRoutes from "@/data/map-routes.json";
import routes from "@/data/routes.json";
import sources from "@/data/sources.json";
import spotStageTwo from "@/data/spot-stage-two.json";
import spots from "@/data/spots.json";
import videoIdeas from "@/data/video-ideas.json";

export type Spot = (typeof spots)[number];
export type RoutePlan = (typeof routes)[number];
export type VideoIdea = (typeof videoIdeas)[number];
export type SourceItem = (typeof sources)[number];
export type FirstVisitGuide = typeof firstVisit;
export type AnimeLocationGroup = (typeof animeLocations)[number];
export type AnimeScene = (typeof animeScenes)[number];
export type AssetIndexItem = (typeof assetsIndex)[number];
export type SpotStageTwo = (typeof spotStageTwo)[number];
export type MapRoute = (typeof mapRoutes)[number];

export function getSpots(): Spot[] {
  return spots;
}

export function getSpotBySlug(slug: string): Spot | undefined {
  return spots.find((spot) => spot.slug === slug);
}

export function getSpotStageTwo(slug: string): SpotStageTwo | undefined {
  return spotStageTwo.find((spot) => spot.slug === slug);
}

export function getSpotStageTwoList(): SpotStageTwo[] {
  return spotStageTwo;
}

export function getRoutes(): RoutePlan[] {
  return routes;
}

export function getMapRoutes(): MapRoute[] {
  return mapRoutes;
}

export function getVideoIdeas(): VideoIdea[] {
  return videoIdeas;
}

export function getSources(): SourceItem[] {
  return sources;
}

export function getFirstVisitGuide(): FirstVisitGuide {
  return firstVisit;
}

export function getAnimeLocations(): AnimeLocationGroup[] {
  return animeLocations;
}

export function getAnimeScenes(): AnimeScene[] {
  return [...animeScenes].sort((a, b) => a.priority - b.priority);
}

export function getAnimeScenesBySpotSlug(spotSlug: string): AnimeScene[] {
  return getAnimeScenes().filter((scene) => scene.spotSlug === spotSlug);
}

export function getAssetsIndex(): AssetIndexItem[] {
  return assetsIndex;
}
