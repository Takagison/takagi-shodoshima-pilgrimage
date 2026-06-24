import Link from "next/link";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/map", label: "圣地地图" },
  { href: "/my-pilgrimage", label: "我的巡礼" },
  { href: "/routes", label: "路线推荐" },
  { href: "/first-time", label: "第一次去" },
  { href: "/anime-locations", label: "动画地点" },
  { href: "/comparison", label: "截图对照" },
  { href: "/scene-library", label: "场景库" },
  { href: "/asset-guide", label: "素材" },
  { href: "/video-ideas", label: "视频灵感" },
  { href: "/sources", label: "资料来源" },
  { href: "/about", label: "关于" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-sky-100/80 bg-white/82 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-coral-100 text-lg">
            小
          </span>
          <span className="text-sm font-bold text-slate-800 sm:text-base">
            高木同学小豆岛巡礼
          </span>
        </Link>
        <div className="hidden items-center gap-1 rounded-full border border-sky-100 bg-white/80 p-1 shadow-sm shadow-sky-100/50 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-sky-50 hover:text-sky-700 xl:px-4 xl:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
