import Link from "next/link";
import type { Spot } from "@/lib/data";
import { SpotActionButtons } from "@/components/PilgrimageActions";
import { SpotImage } from "@/components/SpotImage";

export function SpotCard({ spot }: { spot: Spot }) {
  return (
    <article className="group flex h-[460px] flex-col overflow-hidden rounded-[16px] bg-white/86 shadow-sm shadow-sky-100/70 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-200/55">
      <Link href={`/spots/${spot.slug}`} className="relative block h-[72%] shrink-0 overflow-hidden">
        <SpotImage
          spot={spot}
          className="h-full rounded-none"
          showCaption={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/68 via-slate-950/12 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="text-xs font-semibold text-white/75">{spot.area}</p>
          <h3 className="mt-1 text-2xl font-black">{spot.name}</h3>
          <p className="mt-1 text-sm text-white/75">{spot.japaneseName}</p>
        </div>
        <span className="absolute right-4 top-4 rounded-full bg-white/88 px-3 py-1 text-xs font-bold text-sky-700 backdrop-blur">
          {spot.duration}
        </span>
      </Link>

      <div className="flex flex-1 flex-col justify-between p-4">
        <p className="line-clamp-1 text-sm leading-6 text-slate-600">
          {spot.summary}
        </p>
        <div>
          <p className="mt-2 text-xs font-bold text-coral-500">
            推荐拍照时间：{spot.photoTime}
          </p>
          <SpotActionButtons spot={{ slug: spot.slug, name: spot.name }} />
        </div>
      </div>
    </article>
  );
}
