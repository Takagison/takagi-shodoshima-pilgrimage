import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimeSceneCompare } from "@/components/AnimeSceneCompare";
import { SpotActionButtons } from "@/components/PilgrimageActions";
import { SpotImage } from "@/components/SpotImage";
import {
  getAnimeScenesBySpotSlug,
  getSpotBySlug,
  getSpots,
  getSpotStageTwo,
} from "@/lib/data";

export function generateStaticParams() {
  return getSpots().map((spot) => ({ slug: spot.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spot = getSpotBySlug(slug);

  if (!spot) {
    return {};
  }

  return {
    title: `${spot.name}圣地巡礼攻略`,
    description: `${spot.name}（${spot.japaneseName}）小豆岛巡礼攻略：地址、交通、最佳拍摄时间、推荐镜头、动画关联和注意事项。`,
    openGraph: {
      title: `${spot.name}｜高木同学小豆岛巡礼`,
      description: spot.summary,
      images: [{ url: spot.image.hero, alt: spot.image.alt }],
    },
  };
}

export default async function SpotDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spot = getSpotBySlug(slug);
  const stage = getSpotStageTwo(slug);
  const scenes = getAnimeScenesBySpotSlug(slug);

  if (!spot || !stage) {
    notFound();
  }

  return (
    <main>
      <section className="border-b border-sky-100 bg-gradient-to-b from-sky-50 via-white to-mint-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Link href="/map" className="text-sm font-bold text-sky-700">
              ← 返回圣地地图
            </Link>
            <p className="mt-8 text-sm font-bold text-coral-500">{spot.area}</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-normal text-slate-900 sm:text-5xl">
              {spot.name}
            </h1>
            <p className="mt-3 text-lg font-semibold text-sky-700">
              {spot.japaneseName}
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {spot.summary}
            </p>
            <SpotActionButtons spot={{ slug: spot.slug, name: spot.name }} />
          </div>
          <SpotImage spot={spot} variant="hero" className="aspect-[16/10] shadow-xl shadow-sky-100" />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-12 lg:grid-cols-[1.3fr_0.7fr]">
        <article className="rounded-[16px] border border-sky-100 bg-white p-6 shadow-sm shadow-sky-100">
          <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <DetailBadge
              label="动画关联度"
              value={"★".repeat(stage.animeRelevance) + "☆".repeat(5 - stage.animeRelevance)}
            />
            <DetailBadge label="推荐季节" value={stage.recommendedSeasons.join("、")} />
            <DetailBadge label="推荐停留" value={stage.recommendedStay} />
            <DetailBadge label="交通方式" value={stage.transportSummary} />
          </div>
          <h2 className="text-2xl font-black text-slate-900">打卡说明</h2>
          <p className="mt-4 leading-8 text-slate-600">{spot.description}</p>
          <section className="mt-7 rounded-[16px] bg-sky-50 p-5">
            <h2 className="text-xl font-black text-slate-900">巡礼价值说明</h2>
            <p className="mt-3 leading-8 text-slate-700">{stage.visitValue}</p>
          </section>
          <section className="mt-7 rounded-[16px] bg-sand-100 p-5">
            <h2 className="text-xl font-black text-slate-900">历史背景</h2>
            <p className="mt-3 leading-8 text-slate-700">{spot.history}</p>
          </section>
          <section className="mt-7 rounded-[16px] bg-mint-50 p-5">
            <h2 className="text-xl font-black text-slate-900">动画关联内容</h2>
            <p className="mt-3 leading-8 text-slate-700">{spot.animeConnection}</p>
          </section>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[16px] bg-sky-50 p-4">
              <p className="text-sm font-bold text-coral-500">现实地址</p>
              <p className="mt-2 leading-7 text-slate-700">{spot.address}</p>
            </div>
            <div className="rounded-[16px] bg-mint-50 p-4">
              <p className="text-sm font-bold text-coral-500">交通方式</p>
              <p className="mt-2 leading-7 text-slate-700">{spot.access}</p>
            </div>
          </div>
          <InfoList title="拍照建议" items={spot.photoTips} />
          <InfoList title="推荐镜头" items={spot.recommendedShots} />
          <InfoList title="注意事项" items={spot.cautions} />
          <InfoList title="适合剪辑成短视频的角度" items={spot.videoAngles} />
          <section className="mt-7 rounded-[16px] bg-sky-50 p-5">
            <h2 className="text-xl font-black text-slate-900">巡礼建议</h2>
            <p className="mt-3 leading-8 text-slate-700">{spot.pilgrimageAdvice}</p>
          </section>
          <AnimeSceneCompare scenes={scenes} />
          <div className="mt-6 flex flex-wrap gap-2">
            {spot.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-sand-100 px-3 py-1 text-sm font-medium text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>

        <aside className="space-y-4">
          <div className="rounded-[16px] border border-sky-100 bg-mint-50 p-5">
            <p className="text-sm font-bold text-coral-500">动画关联度</p>
            <p className="mt-2 text-2xl font-black text-coral-500">
              {"★".repeat(stage.animeRelevance)}
              <span className="text-slate-200">{"★".repeat(5 - stage.animeRelevance)}</span>
            </p>
          </div>
          <div className="rounded-[16px] border border-sky-100 bg-white p-5">
            <p className="text-sm font-bold text-coral-500">推荐巡礼季节</p>
            <p className="mt-2 text-lg font-black text-slate-900">
              {stage.recommendedSeasons.join("、")}
            </p>
          </div>
          <div className="rounded-[16px] border border-sky-100 bg-mint-50 p-5">
            <p className="text-sm font-bold text-coral-500">推荐拍照时间</p>
            <p className="mt-2 text-lg font-black text-slate-900">
              {spot.photoTime}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {spot.bestPhotoTime}
            </p>
          </div>
          <div className="rounded-[16px] border border-sky-100 bg-white p-5">
            <p className="text-sm font-bold text-coral-500">建议停留</p>
            <p className="mt-2 text-lg font-black text-slate-900">
              {spot.duration}
            </p>
          </div>
          <div className="rounded-[16px] border border-sky-100 bg-white p-5">
            <p className="text-sm font-bold text-coral-500">第一次去适合吗</p>
            <p className="mt-2 text-lg font-black text-slate-900">
              {spot.firstVisitFriendly ? "适合第一次优先安排" : "更适合时间充裕时加入"}
            </p>
          </div>
          <div className="rounded-[16px] border border-sky-100 bg-sky-50 p-5">
            <p className="text-sm font-bold text-coral-500">小提示</p>
            <p className="mt-2 leading-7 text-slate-700">{spot.tips}</p>
          </div>
          <div className="rounded-[16px] border border-sky-100 bg-white p-5">
            <p className="text-sm font-bold text-coral-500">图片来源</p>
            <a
              href={spot.image.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex text-sm font-bold text-sky-700 hover:text-coral-500"
            >
              {spot.image.credit}
            </a>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              {spot.image.license}。如用于商业物料，请再次打开原文件页核对授权。
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

function DetailBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] bg-mint-50 px-4 py-3">
      <p className="text-xs font-bold text-coral-500">{label}</p>
      <p className="mt-1 text-sm font-black leading-6 text-slate-900">{value}</p>
    </div>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-7">
      <h2 className="text-xl font-black text-slate-900">{title}</h2>
      <div className="mt-3 grid gap-3">
        {items.map((item) => (
          <p
            key={item}
            className="rounded-[16px] border border-sky-100 bg-white px-4 py-3 leading-7 text-slate-600"
          >
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
