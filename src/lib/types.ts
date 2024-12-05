export type AIMessage = {
  role: "user" | "assistant" | "system" | "function" | "data" | "tool";
  content: string;
  id: string;
  name?: string;
  type?: "answer" | "input";
};

export interface Chat extends Record<string, unknown> {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  path: string;
  messages: AIMessage[];
  sharePath?: string;
}
