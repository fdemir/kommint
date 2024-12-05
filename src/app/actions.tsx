import {
  StreamableValue,
  createStreamableUI,
  createStreamableValue,
  getMutableAIState,
} from "ai/rsc";
import { generateId } from "ai";
import { AIMessage } from "@/lib/types";
import { generator } from "@/lib/actions/generator";
import { AI } from "./ai";

export type AIState = {
  messages: AIMessage[];
  chatId: string;
};

export type UIState = {
  id: string;
  component: React.ReactNode;
  isGenerating?: StreamableValue<boolean>;
}[];

// const MAX_MESSAGES = 6;

export async function submit(formData: FormData) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();
  const uiStream = createStreamableUI();
  const codeStream = createStreamableValue("");
  const userInput = String(formData.get("input"));

  if (!userInput) return;

  // todo: may need to add a tool message
  const content = userInput;

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: generateId(),
        role: "user",
        content,
        type: "input",
      },
    ],
  });

  generator({ codeStream, uiStream }, aiState);

  return {
    id: generateId(),
    component: uiStream.value,
    code: codeStream.value,
  };
}
