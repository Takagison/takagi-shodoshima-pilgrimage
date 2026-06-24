import { PageShell } from "@/components/PageShell";
import { PilgrimageProgress } from "@/components/PilgrimageActions";
import { MapRouteHighlighter } from "@/components/MapRouteHighlighter";
import { SpotCard } from "@/components/SpotCard";
import { getMapRoutes, getSpots } from "@/lib/data";

export default function MapPage() {
  const spots = getSpots();
  const mapRoutes = getMapRoutes();

  return (
    <PageShell
      eyebrow="Holy Land Map"
      title="圣地地图"
      intro="第一版先不用真实地图 API，用静态地点卡片呈现。后续可以把这些 JSON 数据接到 Mapbox、高德或自制插画地图上。"
    >
      <div className="mb-8">
        <PilgrimageProgress spots={spots.map(({ slug, name }) => ({ slug, name }))} />
      </div>
      <MapRouteHighlighter spots={spots} routes={mapRoutes} />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {spots.map((spot) => (
          <SpotCard key={spot.slug} spot={spot} />
        ))}
      </div>
    </PageShell>
  );
}
