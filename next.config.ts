// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // tell Next that all of your pages/app/components live in ./src
  srcDir: "src",

  // (optional) turn on strict mode
  reactStrictMode: true,
};

export default nextConfig;
