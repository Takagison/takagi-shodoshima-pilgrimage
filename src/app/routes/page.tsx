import { PageShell } from "@/components/PageShell";
import { getRoutes } from "@/lib/data";

export default function RoutesPage() {
  const routes = getRoutes();

  return (
    <PageShell
      eyebrow="Travel Plans"
      title="路线推荐"
      intro="按停留时间选择路线，先把半日、一日、两日三个高频决策做清楚。预算为粗估，实际费用会受船票、住宿季节、租车和餐饮选择影响。"
    >
      <div className="grid gap-6">
        {routes.map((route, index) => (
          <article
            key={route.title}
            className="rounded-[16px] border border-sky-100 bg-white p-6 shadow-sm shadow-sky-100"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-bold text-coral-500">
                  Route 0{index + 1} · {route.pace}
                </p>
                <h2 className="mt-2 text-2xl font-black text-slate-900">
                  {route.title}
                </h2>
                <p className="mt-3 leading-7 text-slate-600">{route.subtitle}</p>
              </div>
              <span className="w-fit rounded-full bg-sky-50 px-4 py-2 text-sm font-bold text-sky-700">
                {route.duration}
              </span>
            </div>

            <div className="mt-6 rounded-[16px] bg-mint-50 p-4 leading-7 text-slate-700">
              <span className="font-bold text-coral-500">交通方式：</span>
              {route.transport}
            </div>

            <div className="mt-6 grid gap-3">
              {route.schedule.map((item) => (
                <div
                  key={`${route.title}-${item.time}`}
                  className="grid gap-2 rounded-[16px] border border-sky-100 bg-white px-4 py-3 sm:grid-cols-[110px_1fr]"
                >
                  <p className="font-black text-sky-700">{item.time}</p>
                  <p className="leading-7 text-slate-600">{item.plan}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {route.stops.map((stop, stopIndex) => (
                <div
                  key={stop}
                  className="rounded-[16px] bg-sky-50 px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  {stopIndex + 1}. {stop}
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <p className="rounded-[16px] bg-sand-100 px-4 py-3 text-sm leading-6 text-slate-700">
                适合人群：{route.bestFor}
              </p>
              <p className="rounded-[16px] bg-sky-50 px-4 py-3 text-sm leading-6 text-slate-700">
                预算预估：{route.budget}
              </p>
              <p className="rounded-[16px] bg-mint-50 px-4 py-3 text-sm leading-6 text-slate-700 md:col-span-2">
                拍摄建议：{route.shootingAdvice}
              </p>
              <p className="rounded-[16px] bg-white px-4 py-3 text-sm leading-6 text-slate-700 md:col-span-2">
                提醒：{route.note}
              </p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
