"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Spot } from "@/lib/data";

const favoriteKey = "takagi-pilgrimage:favorites";
const checkedKey = "takagi-pilgrimage:checked";

function readSet(key: string) {
  try {
    const raw = window.localStorage.getItem(key);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set<string>();
  }
}

function estimateMinutes(duration: string) {
  const numbers = duration.match(/\d+/g)?.map(Number) ?? [];
  if (numbers.length >= 2) {
    return Math.round((numbers[0] + numbers[1]) / 2);
  }
  return numbers[0] ?? 45;
}

export function MyPilgrimageClient({ spots }: { spots: Spot[] }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    const sync = () => {
      setFavorites(readSet(favoriteKey));
      setChecked(readSet(checkedKey));
    };
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("takagi-pilgrimage:update", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("takagi-pilgrimage:update", sync);
    };
  }, []);

  const favoriteSpots = spots.filter((spot) => favorites.has(spot.slug));
  const checkedSpots = spots.filter((spot) => checked.has(spot.slug));
  const remainingSpots = spots.filter((spot) => !checked.has(spot.slug));
  const progress = Math.round((checkedSpots.length / spots.length) * 100);
  const remainingMinutes = useMemo(
    () => remainingSpots.reduce((total, spot) => total + estimateMinutes(spot.duration), 0),
    [remainingSpots],
  );

  const remainingText =
    remainingMinutes >= 60
      ? `约 ${Math.floor(remainingMinutes / 60)} 小时 ${remainingMinutes % 60} 分钟`
      : `约 ${remainingMinutes} 分钟`;

  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-sky-100 bg-white p-5 shadow-sm shadow-sky-100">
        <p className="text-sm font-bold text-coral-500">My Pilgrimage</p>
        <h2 className="mt-2 text-3xl font-black text-slate-900">
          巡礼进度 {progress}%
        </h2>
        <div className="mt-5 h-3 overflow-hidden rounded-full bg-sky-50">
          <div
            className="h-full rounded-full bg-sky-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Stat label="已收藏地点" value={`${favoriteSpots.length}`} />
          <Stat label="已打卡地点" value={`${checkedSpots.length}/${spots.length}`} />
          <Stat label="预计剩余时间" value={remainingText} />
        </div>
        {progress === 100 ? (
          <p className="mt-5 rounded-lg bg-sand-100 px-4 py-3 text-sm font-bold text-slate-800">
            你已完成小豆岛青春巡礼。下一步可以整理截图对照和短视频素材。
          </p>
        ) : (
          <p className="mt-5 text-sm leading-6 text-slate-600">
            在地图或地点详情页点击收藏、标记打卡，这里会自动同步你的巡礼记录。
          </p>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <SpotList title="已收藏地点" empty="还没有收藏地点。" spots={favoriteSpots} />
        <SpotList title="已打卡地点" empty="还没有打卡地点。" spots={checkedSpots} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-sky-50 px-4 py-3">
      <p className="text-xs font-bold text-coral-500">{label}</p>
      <p className="mt-1 text-xl font-black text-slate-900">{value}</p>
    </div>
  );
}

function SpotList({
  title,
  empty,
  spots,
}: {
  title: string;
  empty: string;
  spots: Spot[];
}) {
  return (
    <section className="rounded-lg border border-sky-100 bg-white p-5 shadow-sm shadow-sky-100">
      <h2 className="text-2xl font-black text-slate-900">{title}</h2>
      {spots.length === 0 ? (
        <p className="mt-4 rounded-lg bg-mint-50 px-4 py-3 text-sm text-slate-600">
          {empty}
        </p>
      ) : (
        <div className="mt-4 grid gap-3">
          {spots.map((spot) => (
            <Link
              key={spot.slug}
              href={`/spots/${spot.slug}`}
              className="rounded-lg bg-sky-50 px-4 py-3 transition hover:bg-mint-50"
            >
              <span className="block font-black text-slate-900">{spot.name}</span>
              <span className="mt-1 block text-sm text-slate-600">{spot.duration}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
