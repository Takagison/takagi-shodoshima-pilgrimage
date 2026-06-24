"use client";

import { useState } from "react";
import type { AnimeScene } from "@/lib/data";

export function SceneCompareSlider({ scene }: { scene: AnimeScene }) {
  const [position, setPosition] = useState(50);

  return (
    <div className="mt-4">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-sky-100">
        <img
          src={scene.realityImage.src}
          alt={scene.realityImage.alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0 border-r-2 border-white"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={scene.animeImage.src}
            alt={scene.animeImage.alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div
          className="absolute top-0 h-full w-1 -translate-x-1/2 bg-white shadow-lg"
          style={{ left: `${position}%` }}
        >
          <span className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xs font-black text-sky-700 shadow-md">
            ⇄
          </span>
        </div>
        <div className="absolute left-3 top-3 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-bold text-white">
          动画
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-slate-700">
          现实
        </div>
      </div>
      <label className="mt-3 block text-xs font-bold text-coral-500">
        {scene.sliderLabel}
      </label>
      <input
        aria-label={scene.sliderLabel}
        type="range"
        min="15"
        max="85"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="mt-2 w-full accent-sky-600"
      />
    </div>
  );
}
