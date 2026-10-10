import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { getPrices } from "./lib/content";

// Static export for S3 + CloudFront (ADR-004, ADR-005).
// No server features: no route handlers, middleware, server actions or ISR.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,          // emits about/index.html so CloudFront can serve /about/
  images: { unoptimized: true }, // no image optimizer at runtime; size photos at source
};

export default function config(phase: string): NextConfig {
  // Launch check (ADR-006): validate prices on every build, whether or not a page shows
  // them yet. With SITE_ENV=production this fails unless the client confirmed the prices.
  if (phase === PHASE_PRODUCTION_BUILD) getPrices();
  return nextConfig;
}
