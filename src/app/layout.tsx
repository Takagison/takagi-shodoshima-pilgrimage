import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "高木同学小豆岛圣地巡礼地图｜小豆岛旅游攻略",
    template: "%s｜高木同学小豆岛巡礼",
  },
  description:
    "高木同学圣地巡礼中文攻略，整理小豆岛巡礼地点、土庄町街景、天使之路、路线规划、交通预算、视频拍摄建议和资料来源。",
  keywords: [
    "高木同学圣地巡礼",
    "小豆岛巡礼",
    "擅长捉弄人的高木同学",
    "小豆岛旅游攻略",
    "土庄町",
    "天使之路",
    "小豆岛橄榄公园",
  ],
  openGraph: {
    title: "高木同学小豆岛圣地巡礼地图",
    description:
      "从土庄港出发，走进动画里的海边小镇。包含地点、路线、交通、预算和视频创作灵感。",
    type: "website",
    locale: "zh_CN",
    siteName: "高木同学小豆岛巡礼",
    images: [
      {
        url: "https://commons.wikimedia.org/wiki/Special:FilePath/Angel%20Road%20Shodo%20Island%20Japan06bs3.jpg?width=1600",
        width: 1600,
        height: 1067,
        alt: "小豆岛天使之路",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "高木同学小豆岛圣地巡礼地图",
    description: "小豆岛巡礼地点、路线、交通和视频创作灵感中文攻略。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
