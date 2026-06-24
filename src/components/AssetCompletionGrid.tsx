import Link from "next/link";
import type { AssetIndexItem } from "@/lib/data";

export function AssetCompletionGrid({
  assets,
  compact = false,
}: {
  assets: AssetIndexItem[];
  compact?: boolean;
}) {
  return (
    <div className={compact ? "grid gap-4 md:grid-cols-3" : "grid gap-5 md:grid-cols-2 lg:grid-cols-3"}>
      {assets.map((asset) => (
        <article
          key={asset.spotSlug}
          className="rounded-lg border border-sky-100 bg-white p-5 shadow-sm shadow-sky-100"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-coral-500">素材完成度</p>
              <h3 className="mt-1 text-xl font-black text-slate-900">
                {asset.spotName}
              </h3>
            </div>
            <span className="rounded-full bg-mint-50 px-3 py-1 text-sm font-black text-sky-700">
              {asset.completionPercent}%
            </span>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-sky-50">
            <div
              className="h-full rounded-full bg-sky-600"
              style={{ width: `${asset.completionPercent}%` }}
            />
          </div>
          <div className="mt-4 grid gap-2 text-sm text-slate-600">
            <AssetCount
              label="动画截图"
              current={asset.animeScreenshots.current}
              target={asset.animeScreenshots.target}
            />
            <AssetCount
              label="现实照片"
              current={asset.realityPhotos.current}
              target={asset.realityPhotos.target}
            />
            <AssetCount
              label="视频"
              current={asset.videos.current}
              target={asset.videos.target}
            />
          </div>
          {!compact ? (
            <>
              <p className="mt-4 rounded-lg bg-sky-50 px-4 py-3 text-sm leading-6 text-slate-600">
                {asset.nextAction}
              </p>
              <Link
                href={`/spots/${asset.spotSlug}`}
                className="mt-4 inline-flex text-sm font-bold text-sky-700 hover:text-coral-500"
              >
                查看地点 →
              </Link>
            </>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function AssetCount({
  label,
  current,
  target,
}: {
  label: string;
  current: number;
  target: number;
}) {
  return (
    <p className="flex items-center justify-between rounded-lg bg-mint-50 px-3 py-2">
      <span>{label}</span>
      <span className="font-black text-slate-900">
        {current}/{target}
      </span>
    </p>
  );
}
