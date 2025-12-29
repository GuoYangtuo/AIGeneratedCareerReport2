import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 配置服务端组件的外部包
  serverExternalPackages: ['puppeteer'],
  
  // 增加 API 响应超时时间
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  
  // 添加空的 turbopack 配置以消除警告
  turbopack: {},
};

export default nextConfig;
