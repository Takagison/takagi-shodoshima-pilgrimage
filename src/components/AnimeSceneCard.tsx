import Link from "next/link";
import type { AnimeScene } from "@/lib/data";
import { SceneCompareSlider } from "@/components/SceneCompareSlider";

export function AnimeSceneCard({
  scene,
  showSpotLink = true,
}: {
  scene: AnimeScene;
  showSpotLink?: boolean;
}) {
  return (
    <article className="overflow-hidden rounded-[16px] border border-sky-100 bg-white shadow-sm shadow-sky-100">
      <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold text-coral-500">
              动画场景 · {scene.spotName}
            </p>
            <h3 className="mt-1 text-xl font-black text-slate-900">
              {scene.sceneName}
            </h3>
          </div>
          <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-bold text-sky-700">
            优先级 {scene.priority}
          </span>
        </div>
      </div>

      <div className="grid gap-0 md:grid-cols-2">
        <SceneImage
          label="动画截图"
          src={scene.animeImage.src}
          alt={scene.animeImage.alt}
          caption={scene.animeImage.note}
          dark
        />
        <SceneImage
          label="现实照片"
          src={scene.realityImage.src}
          alt={scene.realityImage.alt}
          caption={scene.realityImage.caption}
        />
      </div>

      <div className="grid gap-4 border-t border-sky-100 px-5 py-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[16px] bg-mint-50 p-4">
          <p className="text-xs font-bold text-coral-500">出现集数</p>
          <p className="mt-2 text-sm font-bold leading-6 text-slate-800">
            {scene.episode}
          </p>
        </div>
        <div className="rounded-[16px] bg-sky-50 p-4">
          <p className="text-xs font-bold text-coral-500">场景说明</p>
          <p className="mt-2 leading-7 text-slate-700">{scene.description}</p>
        </div>
      </div>

      <div className="border-t border-sky-100 px-5 pb-5 pt-1">
        <SceneCompareSlider scene={scene} />
        {showSpotLink ? (
          <Link
            href={`/spots/${scene.spotSlug}`}
            className="mt-4 inline-flex text-sm font-bold text-sky-700 hover:text-coral-500"
          >
            查看地点详情 →
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function SceneImage({
  label,
  src,
  alt,
  caption,
  dark = false,
}: {
  label: string;
  src: string;
  alt: string;
  caption: string;
  dark?: boolean;
}) {
  return (
    <div className={dark ? "bg-slate-900 p-5 text-white" : "bg-white p-5"}>
      <p className={dark ? "text-xs font-bold text-sky-100" : "text-xs font-bold text-coral-500"}>
        {label}
      </p>
      <figure className="mt-3 overflow-hidden rounded-[16px] bg-sky-100">
        <img src={src} alt={alt} className="aspect-video w-full object-cover" loading="lazy" />
        <figcaption
          className={
            dark
              ? "bg-white/10 px-4 py-3 text-xs leading-5 text-white/75"
              : "bg-sky-50 px-4 py-3 text-xs leading-5 text-slate-500"
          }
        >
          {caption}
        </figcaption>
      </figure>
    </div>
  );
}
