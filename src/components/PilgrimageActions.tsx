"use client";

import { useEffect, useMemo, useState } from "react";

type SpotBrief = {
  slug: string;
  name: string;
};

const favoriteKey = "takagi-pilgrimage:favorites";
const checkedKey = "takagi-pilgrimage:checked";

function readSet(key: string) {
  if (typeof window === "undefined") {
    return new Set<string>();
  }

  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    return new Set(parsed);
  } catch {
    return new Set<string>();
  }
}

function writeSet(key: string, value: Set<string>) {
  window.localStorage.setItem(key, JSON.stringify([...value]));
}

export function SpotActionButtons({ spot }: { spot: SpotBrief }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    setFavorites(readSet(favoriteKey));
    setChecked(readSet(checkedKey));
  }, []);

  const isFavorite = favorites.has(spot.slug);
  const isChecked = checked.has(spot.slug);

  function toggle(key: string, slug: string, setter: (value: Set<string>) => void) {
    const next = readSet(key);
    if (next.has(slug)) {
      next.delete(slug);
    } else {
      next.add(slug);
    }
    writeSet(key, next);
    setter(new Set(next));
    window.dispatchEvent(new Event("takagi-pilgrimage:update"));
  }

  return (
    <div className="mt-4 grid gap-2 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => toggle(favoriteKey, spot.slug, setFavorites)}
        className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
          isFavorite
            ? "border-coral-500 bg-coral-100 text-slate-900"
            : "border-sky-100 bg-white text-slate-600 hover:bg-sky-50"
        }`}
      >
        {isFavorite ? "已收藏" : "收藏地点"}
      </button>
      <button
        type="button"
        onClick={() => toggle(checkedKey, spot.slug, setChecked)}
        className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
          isChecked
            ? "border-sky-600 bg-sky-600 text-white"
            : "border-sky-100 bg-white text-slate-600 hover:bg-sky-50"
        }`}
      >
        {isChecked ? "已打卡" : "标记打卡"}
      </button>
    </div>
  );
}

export function PilgrimageProgress({ spots }: { spots: SpotBrief[] }) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    const sync = () => setChecked(readSet(checkedKey));
    sync();
    window.addEventListener("takagi-pilgrimage:update", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("takagi-pilgrimage:update", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const checkedCount = useMemo(
    () => spots.filter((spot) => checked.has(spot.slug)).length,
    [checked, spots],
  );
  const progress = Math.round((checkedCount / spots.length) * 100);
  const completed = checkedCount === spots.length;

  return (
    <section className="rounded-[16px] border border-sky-100 bg-white p-5 shadow-sm shadow-sky-100">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-coral-500">巡礼进度</p>
          <h2 className="mt-1 text-2xl font-black text-slate-900">
            {checkedCount}/{spots.length} 个地点已打卡
          </h2>
        </div>
        <span className="w-fit rounded-full bg-mint-50 px-4 py-2 text-sm font-bold text-sky-700">
          {completed ? "巡礼完成徽章已解锁" : `${progress}%`}
        </span>
      </div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-sky-50">
        <div
          className="h-full rounded-full bg-sky-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      {completed ? (
        <div className="mt-5 rounded-[16px] bg-sand-100 px-4 py-3 text-sm font-bold text-slate-800">
          恭喜解锁「小豆岛青春巡礼完成」徽章。下一步可以补拍截图对比和短视频素材。
        </div>
      ) : (
        <p className="mt-4 text-sm leading-6 text-slate-600">
          在地点卡片或详情页点击“标记打卡”，进度会保存在当前浏览器 LocalStorage。
        </p>
      )}
    </section>
  );
}
