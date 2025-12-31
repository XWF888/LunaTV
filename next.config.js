/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-var-requires */

const nextConfig = {
  // 根据环境自动选择输出模式：Vercel自动处理，Docker使用standalone
  // 本地开发时不使用 standalone 避免 Windows 符号链接权限问题
  ...(process.env.VERCEL || process.env.DOCKER_BUILD ? { output: 'standalone' } : {}),

  reactStrictMode: false,

  // 启用实验性的缓存组件功能（use cache directive）
  experimental: {
    cacheComponents: true,
    cacheLife: {
      // 自定义缓存生命周期配置
      short: {
        stale: 1800, // 30分钟
        revalidate: 1800, // 30分钟后重新验证
        expire: 3600, // 1小时后过期
      },
    },
  },

  // Next.js 16 使用 Turbopack，配置 SVG 加载
  turbopack: {
    root: __dirname,
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Uncoment to add domain whitelist
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
