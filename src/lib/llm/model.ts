import { anthropic } from "@ai-sdk/anthropic";

export const getProvider = () => {
  return anthropic("claude-3-5-sonnet-latest");
  // return anthropic("claude-3-haiku-20240307");
};
