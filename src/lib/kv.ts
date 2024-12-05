import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://flexible-drum-48735.upstash.io",
  token: process.env.REDIS_TOKEN,
});
