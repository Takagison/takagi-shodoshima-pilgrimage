import Link from "next/link";
import { SpotCard } from "@/components/SpotCard";
import { SpotImage } from "@/components/SpotImage";
import { getRoutes, getSpots, getVideoIdeas } from "@/lib/data";

export default function Home() {
  const spots = getSpots();
  const routes = getRoutes();
  const videoIdeas = getVideoIdeas().slice(0, 3);
  const heroSpot = spots.find((spot) => spot.slug === "angel-road") ?? spots[0];
  const hotSpots = spots.filter((spot) =>
    ["angel-road", "seaside-road", "tonosho-port"].includes(spot.slug),
  );
  const entryCards = [
    {
      title: "地点探索",
      subtitle: "从海边路、港口、神社开始走进小豆岛。",
      href: "/map",
      image: heroSpot.image.hero,
      alt: heroSpot.image.alt,
    },
    {
      title: "推荐路线",
      subtitle: "半日、一日、两日，把时间安排得更像巡礼。",
      href: "/routes",
      image: spots.find((spot) => spot.slug === "tonosho-port")?.image.hero ?? heroSpot.image.hero,
      alt: "土庄港与小豆岛海面",
    },
    {
      title: "动画对照",
      subtitle: "整理动画截图、集数、时间码和场景说明。",
      href: "/comparison",
      image: "/images/comparison/angel-road/anime.jpg",
      alt: "高木同学动画截图对照",
    },
  ];

  return (
    <main>
      <section className="relative grid min-h-[calc(100svh-73px)] place-items-center overflow-hidden bg-slate-900 text-white">
        <img
          src={heroSpot.image.hero}
          alt={heroSpot.image.alt}
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-82"
        />
        <div className="absolute inset-0 bg-slate-950/42" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 text-center">
          <p className="mb-6 rounded-full border border-white/35 bg-white/15 px-5 py-2 text-sm font-bold backdrop-blur">
            高木同学圣地巡礼 · 小豆岛
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-normal drop-shadow-2xl sm:text-7xl">
            欢迎来到高木同学的小豆岛
          </h1>
          <Link
            href="/map"
            className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-white px-9 text-base font-black text-sky-800 shadow-2xl shadow-slate-950/25 transition hover:-translate-y-1 hover:scale-105 hover:bg-sky-50"
          >
            开始巡礼
          </Link>
        </div>
      </section>

      <section className="bg-[#f4f1eb]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="grid gap-5 md:grid-cols-3">
            {entryCards.map((card) => (
              <ImageEntryCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#ebe8e0]">
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
              className="group overflow-hidden rounded-[16px] bg-white/82 shadow-sm shadow-sky-100 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-200/50"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={heroSpot.image.thumbnail}
                  alt={route.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 to-transparent" />
                <div className="absolute bottom-0 p-5 text-white">
                  <p className="text-sm font-bold text-white/75">{route.duration}</p>
                  <h3 className="mt-1 text-2xl font-black">{route.title}</h3>
                </div>
              </div>
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
                className="rounded-[16px] bg-white px-5 py-4 leading-7 text-slate-700 shadow-sm shadow-sky-100"
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
            <article key={idea.title} className="group overflow-hidden rounded-[16px] bg-white/85 shadow-sm shadow-sky-100 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-200/50">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                <img
                  src="/images/comparison/seaside-road/anime.jpg"
                  alt={idea.title}
                  className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <div className="absolute bottom-0 p-5 text-white">
                  <p className="text-sm font-bold text-white/75">{idea.coverText}</p>
                  <h3 className="mt-1 text-xl font-black">{idea.title}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#ebe8e0]">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-18">
          <div className="mb-8">
            <p className="text-sm font-bold text-coral-500">All Spots</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">
              六个地点入口
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {spots.map((spot) => (
              <Link key={spot.slug} href={`/spots/${spot.slug}`} className="group block overflow-hidden rounded-[16px] bg-white/85 shadow-sm shadow-sky-100 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-200/50">
                <SpotImage spot={spot} className="aspect-[4/3]" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ImageEntryCard({
  title,
  subtitle,
  href,
  image,
  alt,
}: {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  alt: string;
}) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-[16px] bg-white/82 shadow-sm shadow-sky-100 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-200/50"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={alt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/72 via-slate-950/12 to-transparent" />
        <div className="absolute bottom-0 p-5 text-white">
          <h2 className="text-2xl font-black">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-white/82">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}
