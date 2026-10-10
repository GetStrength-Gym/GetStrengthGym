import type { NextConfig } from "next";

// Static export for S3 + CloudFront (ADR-004, ADR-005).
// No server features: no route handlers, middleware, server actions or ISR.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,          // emits about/index.html so CloudFront can serve /about/
  images: { unoptimized: true }, // no image optimizer at runtime; size photos at source
};

export default nextConfig;
