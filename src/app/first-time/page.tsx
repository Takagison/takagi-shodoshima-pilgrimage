import { PageShell } from "@/components/PageShell";
import { getFirstVisitGuide } from "@/lib/data";

export default function FirstTimePage() {
  const guide = getFirstVisitGuide();

  return (
    <PageShell
      eyebrow="First Time"
      title={guide.title}
      intro={guide.description}
    >
      <div className="grid gap-6">
        {guide.routes.map((route) => (
          <article
            key={route.from}
            className="rounded-[16px] border border-sky-100 bg-white p-6 shadow-sm shadow-sky-100"
          >
            <p className="text-sm font-bold text-coral-500">出发地</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">
              {route.from}
            </h2>
            <p className="mt-3 leading-7 text-slate-600">{route.summary}</p>
            <div className="mt-5 grid gap-3">
              {route.steps.map((step, index) => (
                <p
                  key={step}
                  className="rounded-[16px] bg-sky-50 px-4 py-3 leading-7 text-slate-700"
                >
                  <span className="mr-3 font-black text-sky-700">
                    {index + 1}
                  </span>
                  {step}
                </p>
              ))}
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <p className="rounded-[16px] bg-sand-100 px-4 py-3 text-sm leading-6 text-slate-700">
                预算说明：{route.budget}
              </p>
              <p className="rounded-[16px] bg-mint-50 px-4 py-3 text-sm leading-6 text-slate-700">
                适合人群：{route.bestFor}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <InfoSection title="船班说明" items={guide.ferryNotes} />
        <InfoSection title="预算说明" items={guide.budgetNotes} />
      </div>
    </PageShell>
  );
}

function InfoSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-[16px] border border-sky-100 bg-white p-6 shadow-sm shadow-sky-100">
      <h2 className="text-2xl font-black text-slate-900">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <p key={item} className="rounded-[16px] bg-sky-50 px-4 py-3 leading-7 text-slate-700">
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}
