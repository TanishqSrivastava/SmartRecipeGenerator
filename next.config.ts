import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    // Prevent client bundle from trying to polyfill Node core modules
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      fs: false,
      path: false,
      url: false,
      crypto: false,
      stream: false,
      child_process: false,
      buffer: false,
      util: false,
      http: false,
      https: false,
      zlib: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

export default nextConfig;
