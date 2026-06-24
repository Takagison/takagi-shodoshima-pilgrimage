import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { getComparisonSpots } from "@/lib/data";

export const metadata: Metadata = {
  title: "动漫截图对照",
  description:
    "高木同学小豆岛圣地巡礼动漫截图资料库，整理动画出现地点、季数、集数、时间码与场景说明。",
};

export default function ComparisonPage() {
  const spots = getComparisonSpots();

  return (
    <PageShell
      eyebrow="Comparison"
      title="动漫截图对照"
      intro="这里先整理《擅长捉弄人的高木同学》动画截图与地点信息。现实照片暂时不显示，后续再继续做同角度对照。"
    >
      <section className="mb-8 rounded-lg border border-sky-100 bg-mint-50 p-5">
        <p className="text-sm font-bold text-coral-500">素材说明</p>
        <p className="mt-3 leading-8 text-slate-700">
          当前截图来自你提供的地点总表，仅用于圣地巡礼资料整理与对照研究。后续如果要做公开传播或商业化页面，
          建议继续补充版权说明、截图来源与可替换的实拍照片。
        </p>
      </section>

      <section className="grid gap-5">
        {spots.map((spot, index) => (
          <article
            key={spot.id}
            className="overflow-hidden rounded-lg border border-sky-100 bg-white shadow-sm shadow-sky-100"
          >
            <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
              <figure className="bg-slate-900 p-4">
                <img
                  src={spot.animeImage}
                  alt={`${spot.name}动画截图`}
                  className="aspect-[2.75/1] w-full rounded-md object-cover"
                  loading="lazy"
                />
              </figure>

              <div className="flex flex-col justify-between p-5">
                <div>
                  <p className="text-xs font-bold text-coral-500">
                    #{String(index + 1).padStart(2, "0")} / {spot.englishName}
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-slate-900">
                    {spot.name}
                  </h2>
                  <div className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                    <Info label="季数" value={spot.season} />
                    <Info label="集数" value={spot.episode} />
                    <Info label="标题" value={`《${spot.episodeTitle}》`} />
                    <Info label="时间" value={spot.time} />
                  </div>
                </div>

                <div className="mt-5 rounded-lg bg-sky-50 p-4">
                  <p className="text-xs font-bold text-coral-500">场景说明</p>
                  <p className="mt-2 leading-7 text-slate-700">
                    {spot.description}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-mint-50 px-3 py-2">
      <p className="text-[11px] font-bold text-slate-400">{label}</p>
      <p className="mt-1 font-bold text-slate-800">{value}</p>
    </div>
  );
}
