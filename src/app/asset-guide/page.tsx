import type { Metadata } from "next";
import { AssetCompletionGrid } from "@/components/AssetCompletionGrid";
import { PageShell } from "@/components/PageShell";
import { getAssetsIndex } from "@/lib/data";

export const metadata: Metadata = {
  title: "素材上传规范中心",
  description:
    "高木同学小豆岛圣地巡礼素材上传规范，包含动画截图命名、现实照片记录、自动素材登记表和完成度统计。",
};

export default function AssetGuidePage() {
  const assets = getAssetsIndex();
  const totalCompletion = Math.round(
    assets.reduce((sum, item) => sum + item.completionPercent, 0) / assets.length,
  );

  return (
    <PageShell
      eyebrow="Asset Guide"
      title="素材上传规范中心"
      intro="这里统一管理动画截图、现实照片和视频素材的命名规则、记录字段与完成度。先把素材收整齐，后面做场景对照、短视频和攻略更新都会快很多。"
    >
      <section className="mb-8 grid gap-4 md:grid-cols-3">
        <SummaryCard label="登记地点" value={`${assets.length} 个`} />
        <SummaryCard label="整体完成度" value={`${totalCompletion}%`} />
        <SummaryCard label="优先补齐" value="海边路 / 鹿岛明神社" />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <GuideBlock
          title="动画截图规范"
          description="动画截图先不要随手命名。文件名要能直接看出季数、集数、地点和序号。"
          example="S01E01-海边路-001.jpg"
          items={["第几季", "第几集", "时间码", "场景说明"]}
        />
        <GuideBlock
          title="现实照片规范"
          description="现实照片重点记录机位信息，方便以后和动画截图做一一对照。"
          example="海边路-傍晚-面向土庄港-001.jpg"
          items={["拍摄地点", "拍摄方向", "推荐机位", "拍摄时间"]}
        />
      </section>

      <section className="mt-8 rounded-[16px] border border-sky-100 bg-white p-5 shadow-sm shadow-sky-100">
        <p className="text-sm font-bold text-coral-500">自动素材登记表</p>
        <h2 className="mt-2 text-2xl font-black text-slate-900">
          assets-index.json
        </h2>
        <p className="mt-3 leading-8 text-slate-600">
          这个 JSON 用来记录每个地点的动画截图数量、现实照片数量、视频数量和完成度。后续你每补一批素材，只要更新这里的数字，首页和本页统计会同步变化。
        </p>
      </section>

      <section className="mt-8">
        <div className="mb-5">
          <p className="text-sm font-bold text-coral-500">Completion</p>
          <h2 className="mt-2 text-3xl font-black text-slate-900">
            完成度统计
          </h2>
        </div>
        <AssetCompletionGrid assets={assets} />
      </section>
    </PageShell>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] border border-sky-100 bg-white p-5 shadow-sm shadow-sky-100">
      <p className="text-sm font-bold text-coral-500">{label}</p>
      <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
    </div>
  );
}

function GuideBlock({
  title,
  description,
  example,
  items,
}: {
  title: string;
  description: string;
  example: string;
  items: string[];
}) {
  return (
    <article className="rounded-[16px] border border-sky-100 bg-white p-5 shadow-sm shadow-sky-100">
      <p className="text-sm font-bold text-coral-500">{title}</p>
      <p className="mt-3 leading-8 text-slate-600">{description}</p>
      <div className="mt-4 rounded-[16px] bg-slate-900 px-4 py-3 font-mono text-sm text-white">
        {example}
      </div>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <p
            key={item}
            className="rounded-[16px] bg-mint-50 px-4 py-3 text-sm font-bold text-slate-700"
          >
            {item}
          </p>
        ))}
      </div>
    </article>
  );
}
