import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "华芯百科 - AI智能生涯规划系统",
  description: "为学生提供专业、个性化的生涯规划报告，基于AI智能分析生成升学规划、职业匹配、资源对接的一站式参考",
  keywords: "生涯规划,升学指导,职业规划,AI规划,教育咨询",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
