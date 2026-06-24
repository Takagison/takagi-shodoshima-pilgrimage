import type { AnimeScene } from "@/lib/data";
import { AnimeSceneCard } from "@/components/AnimeSceneCard";

export function AnimeSceneCompare({
  scenes,
}: {
  scenes: AnimeScene[];
}) {
  if (scenes.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <div className="mb-4">
        <p className="text-sm font-bold text-coral-500">Scene Compare</p>
        <h2 className="mt-1 text-2xl font-black text-slate-900">
          动画场景对照
        </h2>
      </div>
      <div className="grid gap-5">
        {scenes.map((scene) => (
          <AnimeSceneCard key={scene.id} scene={scene} showSpotLink={false} />
        ))}
      </div>
    </section>
  );
}
