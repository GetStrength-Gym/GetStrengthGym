import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function config(phase: string): NextConfig {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      async rewrites() {
        return [
          { source: "/api/:path*", destination: "http://backend:8080/api/:path*" },
        ];
      },
    };
  }

  return {
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
  };
}
