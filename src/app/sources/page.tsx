import { PageShell } from "@/components/PageShell";
import { getSources } from "@/lib/data";

export default function SourcesPage() {
  const sources = getSources();

  return (
    <PageShell
      eyebrow="References"
      title="资料来源"
      intro="本页列出第一版整理时参考的官方与辅助资料。本站内容用自己的话重写整理，交通、票价、潮汐、开放状态和高木同学具体取景点仍需要出发前或实地核实。"
    >
      <div className="mb-6 rounded-lg border border-coral-100 bg-sand-100 p-5 leading-8 text-slate-700">
        说明：官方旅游资料适合核对地址、交通和设施；高木同学相关海边路属于巡礼语境和区域型整理，
        后续最需要用你自己的实地照片、动画截图对比和具体坐标继续校准。
      </div>
      <div className="grid gap-4">
        {sources.map((source) => (
          <article
            key={source.url}
            className="rounded-lg border border-sky-100 bg-white p-5 shadow-sm shadow-sky-100"
          >
            <h2 className="text-xl font-black text-slate-900">{source.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{source.note}</p>
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex font-bold text-sky-700 hover:text-coral-500"
            >
              打开参考链接 →
            </a>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
