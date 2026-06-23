import { PageShell } from "@/components/PageShell";

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="关于这个巡礼站"
      intro="这是一个从零开始的小豆岛圣地巡礼网站 MVP，目标是先做出能发布、能积累内容、能逐步变现的作品。"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-lg border border-sky-100 bg-white p-6 shadow-sm shadow-sky-100 lg:col-span-2">
          <h2 className="text-2xl font-black text-slate-900">项目定位</h2>
          <p className="mt-4 leading-8 text-slate-600">
            网站面向喜欢《擅长捉弄的高木同学》、准备去小豆岛旅行、想拍动画感照片的人。
            第一版先聚焦地点、路线和氛围，避免一开始陷入复杂地图 API、后台系统或过度考据。
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            后续可以逐步加入截图对比、真实地图、交通信息、住宿推荐、视频游记和付费 PDF 攻略。
          </p>
        </section>
        <aside className="rounded-lg border border-sky-100 bg-mint-50 p-6">
          <h2 className="text-xl font-black text-slate-900">MVP 重点</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            <li>中文内容清晰，适合搜索和分享。</li>
            <li>地点数据本地 JSON 化，后续容易维护。</li>
            <li>先展示路线价值，再扩展商业化入口。</li>
          </ul>
        </aside>
      </div>
    </PageShell>
  );
}
