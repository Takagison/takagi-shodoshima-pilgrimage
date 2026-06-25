import { PageShell } from "@/components/PageShell";
import { getAnimeLocations } from "@/lib/data";

export default function AnimeLocationsPage() {
  const groups = getAnimeLocations();

  return (
    <PageShell
      eyebrow="Anime Locations"
      title="高木同学出现地点整理"
      intro="按第一季、第二季、第三季和剧场版整理巡礼线索。当前版本优先标注官方资料和需核实范围，避免把未确认机位写成确定事实。"
    >
      <div className="grid gap-6">
        {groups.map((group) => (
          <section
            key={group.season}
            className="rounded-[16px] border border-sky-100 bg-white p-6 shadow-sm shadow-sky-100"
          >
            <h2 className="text-2xl font-black text-slate-900">{group.season}</h2>
            <p className="mt-3 leading-7 text-slate-600">{group.note}</p>
            <div className="mt-5 grid gap-4">
              {group.items.map((item) => (
                <article key={`${group.season}-${item.episode}-${item.place}`} className="rounded-[16px] bg-sky-50 p-4">
                  <p className="text-sm font-bold text-coral-500">{item.episode}</p>
                  <h3 className="mt-1 text-xl font-black text-slate-900">
                    {item.place}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-700">{item.connection}</p>
                  <p className="mt-3 rounded-[16px] bg-white px-4 py-3 text-sm leading-6 text-slate-600">
                    核实建议：{item.verify}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
