import Link from "next/link";
import type { Spot } from "@/lib/data";
import { SpotActionButtons } from "@/components/PilgrimageActions";
import { SpotImage } from "@/components/SpotImage";

export function SpotCard({ spot }: { spot: Spot }) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-sky-100 bg-white p-5 shadow-sm shadow-sky-100/70 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-100">
      <SpotImage spot={spot} className="mb-5 aspect-[4/3]" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-coral-500">{spot.area}</p>
          <h3 className="mt-1 text-xl font-bold text-slate-850">{spot.name}</h3>
          <p className="mt-1 text-sm text-slate-400">{spot.japaneseName}</p>
        </div>
        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
          {spot.duration}
        </span>
      </div>
      <p className="mt-4 flex-1 leading-7 text-slate-600">{spot.summary}</p>
      <div className="mt-4 rounded-lg bg-mint-50 px-4 py-3 text-sm text-slate-600">
        推荐拍照时间：{spot.photoTime}
      </div>
      <div className="mt-3 rounded-lg bg-sky-50 px-4 py-3 text-sm text-slate-600">
        第一次去：{spot.firstVisitFriendly ? "适合优先安排" : "建议时间充裕时加入"}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {spot.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-sand-100 px-3 py-1 text-xs font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>
      <SpotActionButtons spot={{ slug: spot.slug, name: spot.name }} />
      <Link
        href={`/spots/${spot.slug}`}
        className="mt-5 inline-flex items-center text-sm font-bold text-sky-700 transition group-hover:text-coral-500"
      >
        查看详情 <span className="ml-1">→</span>
      </Link>
    </article>
  );
}
