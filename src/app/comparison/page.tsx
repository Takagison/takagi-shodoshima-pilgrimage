import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { getComparisonSpots } from "@/lib/data";

export const metadata: Metadata = {
  title: "动漫截图对照",
  description:
    "高木同学小豆岛圣地巡礼动漫截图对照栏目，包含动漫截图、现实照片、集数、场景介绍和 Google Maps 入口。",
};

export default function ComparisonPage() {
  const spots = getComparisonSpots();

  return (
    <PageShell
      eyebrow="Comparison"
      title="动漫截图对照"
      intro="这里用于集中展示高木同学圣地巡礼的动漫画面与现实地点。动漫截图暂时使用占位图，现实照片优先使用可公开授权素材；后续可以逐张替换成你的真实截图与实拍照片。"
    >
      <section className="mb-8 rounded-lg border border-sky-100 bg-mint-50 p-5">
        <p className="text-sm font-bold text-coral-500">版权说明</p>
        <p className="mt-3 leading-8 text-slate-700">
          动漫截图没有自动抓取。页面中动漫侧均为占位图，等你确认授权或手动上传截图后再替换。
          现实照片已尽量使用 Wikimedia Commons 等公开授权素材；占位图代表暂未找到可确认授权的同角度照片。
        </p>
      </section>

      <section className="grid gap-6">
        {spots.map((spot) => (
          <article
            key={spot.id}
            className="overflow-hidden rounded-lg border border-sky-100 bg-white shadow-sm shadow-sky-100"
          >
            <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold text-coral-500">
                    {spot.japaneseName}
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-slate-900">
                    {spot.name}
                  </h2>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.mapsQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-700"
                >
                  Google Maps
                </a>
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-2">
              <ComparisonImage
                label="动漫截图"
                src={spot.animeImage.src}
                alt={spot.animeImage.alt}
                dark
              />
              <ComparisonImage
                label="现实照片"
                src={spot.realityImage.src}
                alt={spot.realityImage.alt}
                credit={spot.realityImage.credit}
                license={spot.realityImage.license}
                sourceUrl={spot.realityImage.sourceUrl}
              />
            </div>

            <div className="grid gap-4 border-t border-sky-100 px-5 py-5 lg:grid-cols-[0.7fr_1.3fr]">
              <div className="rounded-lg bg-mint-50 p-4">
                <p className="text-xs font-bold text-coral-500">集数</p>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-800">
                  {spot.episode}
                </p>
              </div>
              <div className="rounded-lg bg-sky-50 p-4">
                <p className="text-xs font-bold text-coral-500">场景介绍</p>
                <p className="mt-2 leading-7 text-slate-700">
                  {spot.sceneIntro}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}

function ComparisonImage({
  label,
  src,
  alt,
  dark = false,
  credit,
  license,
  sourceUrl,
}: {
  label: string;
  src: string;
  alt: string;
  dark?: boolean;
  credit?: string;
  license?: string;
  sourceUrl?: string;
}) {
  return (
    <div className={dark ? "bg-slate-900 p-5 text-white" : "bg-white p-5"}>
      <p className={dark ? "text-xs font-bold text-sky-100" : "text-xs font-bold text-coral-500"}>
        {label}
      </p>
      <figure className="mt-3 overflow-hidden rounded-lg bg-sky-100">
        <img src={src} alt={alt} className="aspect-video w-full object-cover" loading="lazy" />
        <figcaption
          className={
            dark
              ? "bg-white/10 px-4 py-3 text-xs leading-5 text-white/75"
              : "bg-sky-50 px-4 py-3 text-xs leading-5 text-slate-500"
          }
        >
          {dark ? "动漫截图占位图，后续可替换为手动上传截图。" : (
            <>
              {credit ? `${credit}，${license}` : "现实照片占位图，后续可替换。"}
              {sourceUrl ? (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-2 font-bold text-sky-700 hover:text-coral-500"
                >
                  来源
                </a>
              ) : null}
            </>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
