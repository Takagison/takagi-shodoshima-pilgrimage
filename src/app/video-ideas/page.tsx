import { PageShell } from "@/components/PageShell";
import { getVideoIdeas } from "@/lib/data";

export default function VideoIdeasPage() {
  const ideas = getVideoIdeas();

  return (
    <PageShell
      eyebrow="Video Ideas"
      title="视频创作灵感"
      intro="把圣地巡礼变成可以发布的短视频选题。每个选题都给标题、开头 3 秒钩子、拍摄画面、剪辑节奏和封面文案。"
    >
      <div className="grid gap-5">
        {ideas.map((idea, index) => (
          <article
            key={idea.title}
            className="rounded-lg border border-sky-100 bg-white p-6 shadow-sm shadow-sky-100"
          >
            <p className="text-sm font-black text-coral-500">
              Idea {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">
              {idea.title}
            </h2>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <InfoBlock label="开头 3 秒钩子" value={idea.hook} />
              <InfoBlock label="剪辑节奏" value={idea.rhythm} />
              <InfoBlock label="封面文案" value={idea.coverText} />
              <div className="rounded-lg bg-mint-50 p-4">
                <p className="text-sm font-bold text-coral-500">拍摄画面</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {idea.shots.map((shot) => (
                    <span
                      key={shot}
                      className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-600"
                    >
                      {shot}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-sky-50 p-4">
      <p className="text-sm font-bold text-coral-500">{label}</p>
      <p className="mt-2 leading-7 text-slate-700">{value}</p>
    </div>
  );
}
