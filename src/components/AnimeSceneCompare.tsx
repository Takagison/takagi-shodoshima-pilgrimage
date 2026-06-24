import type { Spot, SpotStageTwo } from "@/lib/data";
import { SpotImage } from "@/components/SpotImage";

export function AnimeSceneCompare({
  spot,
  stage,
}: {
  spot: Spot;
  stage: SpotStageTwo;
}) {
  return (
    <section className="mt-8">
      <div className="mb-4">
        <p className="text-sm font-bold text-coral-500">Scene Compare</p>
        <h2 className="mt-1 text-2xl font-black text-slate-900">
          动画场景对照
        </h2>
      </div>
      <div className="grid gap-5">
        {stage.sceneComparisons.map((scene) => (
          <article
            key={scene.sceneName}
            className="overflow-hidden rounded-lg border border-sky-100 bg-white shadow-sm shadow-sky-100"
          >
            <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
              <p className="text-xs font-bold text-coral-500">动画场景</p>
              <h3 className="mt-1 text-xl font-black text-slate-900">
                {scene.sceneName}
              </h3>
            </div>
            <div className="grid gap-0 md:grid-cols-2">
              <div className="bg-slate-900 p-5 text-white">
                <p className="text-xs font-bold text-sky-100">动画</p>
                <div className="mt-3 grid aspect-video place-items-center rounded-lg border border-dashed border-white/45 bg-white/10 p-6 text-center">
                  <div>
                    <p className="text-sm font-bold">动画截图预留位</p>
                    <p className="mt-2 text-xs leading-5 text-white/70">
                      {scene.animePlaceholder}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-5">
                <p className="text-xs font-bold text-coral-500">现实</p>
                <SpotImage spot={spot} className="mt-3 aspect-video" />
              </div>
            </div>
            <div className="bg-mint-50 px-5 py-4">
              <p className="text-xs font-bold text-coral-500">场景说明</p>
              <p className="mt-2 leading-7 text-slate-700">{scene.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
