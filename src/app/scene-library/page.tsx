import type { Metadata } from "next";
import { AnimeSceneCard } from "@/components/AnimeSceneCard";
import { PageShell } from "@/components/PageShell";
import { getAnimeScenes } from "@/lib/data";

export const metadata: Metadata = {
  title: "动画场景资料库",
  description:
    "高木同学小豆岛圣地巡礼动画场景资料库，预留动画截图、现实照片、出现集数、场景说明和对照滑块。",
};

export default function SceneLibraryPage() {
  const scenes = getAnimeScenes();

  return (
    <PageShell
      eyebrow="Scene Library"
      title="动画场景资料库"
      intro="这里集中管理高木同学圣地巡礼的动画截图、现实照片、出现集数和场景说明。当前动画截图全部为占位图，后续可以手动上传真实截图后逐条替换。"
    >
      <section className="mb-8 grid gap-4 md:grid-cols-3">
        <StatusCard label="已建场景" value={`${scenes.length} 个`} />
        <StatusCard label="动画截图状态" value="全部占位" />
        <StatusCard label="优先整理" value="鹿岛明神社 / 海边路" />
      </section>

      <section className="mb-8 rounded-lg border border-sky-100 bg-mint-50 p-5">
        <p className="text-sm font-bold text-coral-500">使用说明</p>
        <p className="mt-3 leading-8 text-slate-700">
          后续上传动画截图时，只需要把图片放入 public 目录，并在
          src/data/anime-scenes.json 中替换 animeImage.src、episode 和说明文字。
          现实照片也可以同样替换为你自己的实拍图。
        </p>
      </section>

      <section className="grid gap-6">
        {scenes.map((scene) => (
          <AnimeSceneCard key={scene.id} scene={scene} />
        ))}
      </section>
    </PageShell>
  );
}

function StatusCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-sky-100 bg-white p-5 shadow-sm shadow-sky-100">
      <p className="text-sm font-bold text-coral-500">{label}</p>
      <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
    </div>
  );
}
