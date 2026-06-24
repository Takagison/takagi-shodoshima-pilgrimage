import { MyPilgrimageClient } from "@/components/MyPilgrimageClient";
import { PageShell } from "@/components/PageShell";
import { getSpots } from "@/lib/data";

export default function MyPilgrimagePage() {
  const spots = getSpots();

  return (
    <PageShell
      eyebrow="My Pilgrimage"
      title="我的巡礼"
      intro="这里记录你收藏和已经打卡的地点。数据暂时保存在当前浏览器 LocalStorage，适合轻量记录自己的小豆岛巡礼进度。"
    >
      <MyPilgrimageClient spots={spots} />
    </PageShell>
  );
}
