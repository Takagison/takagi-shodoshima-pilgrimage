import Link from "next/link";
import { AssetCompletionGrid } from "@/components/AssetCompletionGrid";
import { PilgrimageProgress } from "@/components/PilgrimageActions";
import { SpotCard } from "@/components/SpotCard";
import { SpotImage } from "@/components/SpotImage";
import { getAssetsIndex, getRoutes, getSpots, getVideoIdeas } from "@/lib/data";

export default function Home() {
  const spots = getSpots();
  const routes = getRoutes();
  const assets = getAssetsIndex();
  const videoIdeas = getVideoIdeas().slice(0, 3);
  const heroSpot = spots.find((spot) => spot.slug === "angel-road") ?? spots[0];
  const hotSpots = spots.filter((spot) =>
    ["angel-road", "seaside-road", "tonosho-port"].includes(spot.slug),
  );

  return (
    <main>
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <img
          src={heroSpot.image.hero}
          alt={heroSpot.image.alt}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/82 via-slate-950/45 to-slate-950/10" />
        <div className="relative mx-auto flex min-h-[620px] max-w-6xl flex-col justify-end px-5 py-16">
          <p className="mb-5 w-fit rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
            高木同学圣地巡礼 · 小豆岛
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-normal sm:text-7xl">
            欢迎来到高木同学的小豆岛
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-white/85">
            这里是《擅长捉弄人的高木同学》的现实舞台。
          </p>
          <p className="mt-4 max-w-2xl leading-8 text-white/80">
            收录动画相关地点、巡礼路线、拍摄建议与个人打卡记录。
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/my-pilgrimage"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-base font-bold text-sky-800 transition hover:bg-sky-50"
            >
              开始巡礼
            </Link>
            <Link
              href="/map"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 text-base font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              查看地图
            </Link>
          </div>
          <p className="mt-5 text-xs text-white/70">
            图片：{heroSpot.image.credit}，{heroSpot.image.license}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <PilgrimageProgress spots={spots.map(({ slug, name }) => ({ slug, name }))} />
      </section>

      <section className="bg-mint-50/70">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-18">
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold text-coral-500">Database</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">
                资料库入口
              </h2>
              <p className="mt-4 leading-8 text-slate-600">
                动画截图、现实照片和视频素材都先按规范登记。资料库越整齐，后面做圣地对照和短视频脚本就越省时间。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/scene-library"
                  className="rounded-full bg-sky-600 px-5 py-3 text-sm font-bold text-white"
                >
                  动画场景资料库
                </Link>
                <Link
                  href="/asset-guide"
                  className="rounded-full bg-white px-5 py-3 text-sm font-bold text-sky-700"
                >
                  素材上传指南
                </Link>
              </div>
            </div>
            <AssetCompletionGrid assets={assets.slice(0, 3)} compact />
          </div>
        </div>
      </section>

      <section className="bg-white/70">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-18">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold text-coral-500">Hot Spots</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">
                热门地点
              </h2>
            </div>
            <Link href="/map" className="font-bold text-sky-700 hover:text-coral-500">
              查看全部 6 个地点 →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {hotSpots.map((spot) => (
              <SpotCard key={spot.slug} spot={spot} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-18">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-coral-500">Routes</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">
              推荐路线
            </h2>
          </div>
          <Link href="/routes" className="font-bold text-sky-700 hover:text-coral-500">
            查看路线细节 →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {routes.map((route) => (
            <Link
              key={route.title}
              href="/routes"
              className="rounded-lg border border-sky-100 bg-white p-5 shadow-sm shadow-sky-100 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-sm font-bold text-coral-500">{route.duration}</p>
              <h3 className="mt-2 text-2xl font-black text-slate-900">
                {route.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">{route.subtitle}</p>
              <p className="mt-4 rounded-lg bg-sky-50 px-4 py-3 text-sm leading-6 text-slate-600">
                {route.budget}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-mint-50/70">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:py-18 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold text-coral-500">Guide</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">
              巡礼攻略
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              第一次去小豆岛，先解决三件事：从哪里上岛、天使之路潮汐是否合适、岛内交通怎么接。
              之后再决定要不要加入橄榄公园和神社等补充点。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/first-time"
                className="rounded-full bg-sky-600 px-5 py-3 text-sm font-bold text-white"
              >
                第一次去小豆岛
              </Link>
              <Link
                href="/anime-locations"
                className="rounded-full bg-white px-5 py-3 text-sm font-bold text-sky-700"
              >
                动画地点整理
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              "东京/大阪出发：先到高松或冈山，再乘船进土庄港。",
              "高松出发：高松港到土庄港约 60 分钟，是最稳入口。",
              "天使之路：先查潮汐，再安排路线顺序。",
              "拍视频：港口开场、街景过程、天使之路高潮、渡轮结尾。"
            ].map((item, index) => (
              <p
                key={item}
                className="rounded-lg bg-white px-5 py-4 leading-7 text-slate-700 shadow-sm shadow-sky-100"
              >
                <span className="mr-3 font-black text-coral-500">0{index + 1}</span>
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-18">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-coral-500">Latest Videos</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">
              最新视频选题
            </h2>
          </div>
          <Link
            href="/video-ideas"
            className="font-bold text-sky-700 hover:text-coral-500"
          >
            查看 10 个选题 →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {videoIdeas.map((idea) => (
            <article key={idea.title} className="rounded-lg border border-sky-100 bg-white p-5 shadow-sm shadow-sky-100">
              <p className="text-sm font-bold text-coral-500">{idea.coverText}</p>
              <h3 className="mt-2 text-xl font-black text-slate-900">{idea.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{idea.hook}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white/70">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-18">
          <div className="mb-8">
            <p className="text-sm font-bold text-coral-500">All Spots</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">
              六个地点入口
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {spots.map((spot) => (
              <Link key={spot.slug} href={`/spots/${spot.slug}`} className="group block">
                <SpotImage spot={spot} className="aspect-[4/3] transition group-hover:-translate-y-1" />
                <h3 className="mt-3 text-lg font-black text-slate-900 group-hover:text-sky-700">
                  {spot.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
