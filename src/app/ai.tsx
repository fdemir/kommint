import { createAI, getAIState } from "ai/rsc";
import { AIState, submit, UIState } from "./actions";
import { generateId } from "ai";
import { Message } from "@/components/message";
import { saveChat } from "@/lib/actions/chat";

export const AI = createAI({
  actions: { submit },
  initialUIState: [] as UIState,
  initialAIState: { chatId: generateId(), messages: [] } as AIState,
  onGetUIState: async () => {
    "use server";

    const aiState = getAIState();

    if (aiState) {
      const uiState = getUIStateFromAIState(aiState as AIState);
      return uiState;
    } else {
      return;
    }
  },
  onSetAIState: async ({ state }) => {
    "use server";

    if (!state.messages.some((e) => e.type === "answer" || "code")) {
      return;
    }

    const { chatId, messages } = state;
    const createdAt = new Date();
    const userId = "anonymous";
    const path = `/preview/${chatId}`;

    const title = "Untitled";

    const updatedMessages = [...messages];

    const chat = {
      id: chatId,
      createdAt,
      userId,
      path,
      title,
      messages: updatedMessages,
    };

    await saveChat(chat);
  },
});

export const getUIStateFromAIState = (aiState: AIState) => {
  const messages = Array.isArray(aiState.messages)
    ? aiState.messages.map((msg) => ({ ...msg }))
    : [];

  return messages
    .map((message) => {
      const { role, content, id, type } = message;

      if (!type) return null;

      switch (role) {
        case "user":
          switch (type) {
            case "input":
              return {
                id,
                component: <Message role="user" content={content} />,
              };
          }
        case "assistant":
          switch (type) {
            case "answer":
              return {
                id,
                component: <Message role="assistant" content={content} />,
              };
            default:
              return {
                id,
                component: null,
              };
          }
        default:
          return {
            id,
            component: null,
          };
      }
    })
    .filter((message) => message !== null) as UIState;
};
