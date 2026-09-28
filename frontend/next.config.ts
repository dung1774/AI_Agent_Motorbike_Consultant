import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig = (phase: string): NextConfig => ({
  reactStrictMode: true,
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  ...(phase === PHASE_DEVELOPMENT_SERVER ? {
    experimental: { staleTimes: { dynamic: 600, static: 600 } },
  } : {}),
  onDemandEntries: {
    maxInactiveAge: 10 * 60 * 1000,
    pagesBufferLength: 12,
  },
});

export default nextConfig;
