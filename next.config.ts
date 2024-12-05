import { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.d\.ts$/,
      loader: "ignore-loader",
    });
    return config;
  },
};

export default nextConfig;
