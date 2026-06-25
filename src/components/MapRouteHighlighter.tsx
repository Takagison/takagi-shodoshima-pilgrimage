"use client";

import { useMemo, useState } from "react";
import type { MapRoute, Spot } from "@/lib/data";

const positions: Record<string, string> = {
  "tonosho-port": "left-[12%] top-[22%]",
  "angel-road": "right-[16%] top-[24%]",
  "seaside-road": "left-[35%] top-[52%]",
  "olive-park": "right-[10%] bottom-[16%]",
  "kashima-myojin-shrine": "left-[20%] bottom-[22%]",
  "dofuchi-strait": "left-[46%] top-[30%]",
};

export function MapRouteHighlighter({
  spots,
  routes,
}: {
  spots: Spot[];
  routes: MapRoute[];
}) {
  const [selectedRouteId, setSelectedRouteId] = useState(routes[2]?.id ?? routes[0]?.id);
  const selectedRoute = routes.find((route) => route.id === selectedRouteId) ?? routes[0];
  const selectedSlugs = useMemo(
    () => new Set(selectedRoute?.spotSlugs ?? []),
    [selectedRoute],
  );

  return (
    <section className="mb-8 rounded-[16px] border border-sky-100 bg-white p-5 shadow-sm shadow-sky-100">
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.25fr]">
        <div>
          <p className="text-sm font-bold text-coral-500">Route Map</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">
            巡礼路线推荐
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            选择路线后，静态地图会高亮对应地点。后续接真实地图 API 时可以继续复用这些 JSON 数据。
          </p>
          <div className="mt-5 grid gap-3">
            {routes.map((route) => {
              const active = route.id === selectedRouteId;
              return (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`rounded-[16px] border px-4 py-3 text-left transition ${
                    active
                      ? "border-sky-600 bg-sky-50 shadow-sm"
                      : "border-sky-100 bg-white hover:bg-sky-50"
                  }`}
                >
                  <span className="text-sm font-bold text-coral-500">
                    {route.duration}
                  </span>
                  <span className="mt-1 block text-lg font-black text-slate-900">
                    {route.title}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">
                    {route.summary}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-[16px] bg-gradient-to-br from-sky-100 via-mint-50 to-sand-100">
          <div className="absolute inset-x-[-10%] bottom-0 h-28 rounded-t-[50%] bg-sky-300/45" />
          <div className="absolute inset-x-[-8%] bottom-8 h-20 rounded-[50%] bg-white/45" />
          {spots.map((spot) => {
            const active = selectedSlugs.has(spot.slug);
            return (
              <div
                key={spot.slug}
                className={`absolute ${positions[spot.slug] ?? "left-1/2 top-1/2"} transition`}
              >
                <div
                  className={`rounded-full px-3 py-2 text-xs font-black shadow ${
                    active
                      ? "scale-110 bg-coral-500 text-white ring-4 ring-coral-100"
                      : "bg-white text-slate-500 opacity-65"
                  }`}
                >
                  {spot.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
