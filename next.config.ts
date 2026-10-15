import type { NextConfig } from "next";

// Static export: no server runtime, no API routes, no image optimisation.
// cacheComponents / partialPrefetching (create-next-app defaults) are intentionally
// left off: they target mixed static/dynamic server rendering and conflict with
// `dynamic = "force-static"` route handlers that a static export needs.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    // Pin the root: a lockfile in a parent folder must not change module resolution.
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
