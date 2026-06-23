import { PageShell } from "@/components/PageShell";
import { PilgrimageProgress } from "@/components/PilgrimageActions";
import { SpotCard } from "@/components/SpotCard";
import { getSpots } from "@/lib/data";

export default function MapPage() {
  const spots = getSpots();

  return (
    <PageShell
      eyebrow="Holy Land Map"
      title="圣地地图"
      intro="第一版先不用真实地图 API，用静态地点卡片呈现。后续可以把这些 JSON 数据接到 Mapbox、高德或自制插画地图上。"
    >
      <div className="mb-8">
        <PilgrimageProgress spots={spots.map(({ slug, name }) => ({ slug, name }))} />
      </div>
      <div className="mb-8 rounded-lg border border-sky-100 bg-white p-5 shadow-sm shadow-sky-100">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-sm font-bold text-coral-500">Static Map MVP</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">
              小豆岛巡礼点位概览
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              当前版本以卡片替代真实地图，重点先验证内容结构、页面风格和路线转化。
            </p>
          </div>
          <div className="relative min-h-56 overflow-hidden rounded-lg bg-gradient-to-br from-sky-100 via-mint-50 to-sand-100">
            <div className="absolute left-[14%] top-[25%] rounded-full bg-white px-3 py-2 text-xs font-bold text-sky-700 shadow">
              土庄港
            </div>
            <div className="absolute right-[18%] top-[22%] rounded-full bg-white px-3 py-2 text-xs font-bold text-coral-500 shadow">
              天使之路
            </div>
            <div className="absolute left-[35%] top-[52%] rounded-full bg-white px-3 py-2 text-xs font-bold text-sky-700 shadow">
              海边路
            </div>
            <div className="absolute right-[10%] bottom-[18%] rounded-full bg-white px-3 py-2 text-xs font-bold text-sky-700 shadow">
              橄榄公园
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {spots.map((spot) => (
          <SpotCard key={spot.slug} spot={spot} />
        ))}
      </div>
    </PageShell>
  );
}
