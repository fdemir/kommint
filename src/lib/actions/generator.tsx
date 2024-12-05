// todo: server only

import { generateId, streamText } from "ai";
import {
  createStreamableUI,
  createStreamableValue,
  getMutableAIState,
} from "ai/rsc";
import { getProvider } from "../llm/model";
import { componentSet } from "../llm/components";
import { SYSTEM_RPOMPT } from "../llm/prompt";
import { z } from "zod";
import { Message, TextStreamMessage } from "@/components/message";

export async function generator(
  uiState: {
    codeStream: ReturnType<typeof createStreamableValue>;
    uiStream: ReturnType<typeof createStreamableUI>;
  },
  aiState: ReturnType<typeof getMutableAIState>
) {
  "use server";

  const { codeStream, uiStream } = uiState;

  const provider = getProvider();

  const { textStream } = streamText({
    model: provider,
    messages: aiState.get().messages,
    tools: {
      componentFetcher: {
        description: "Fetches a component from the component set.",
        parameters: z.object({
          name: z.string().describe("The name of the component to fetch."),
        }),
        execute: async ({ name }: { name: string }) => {
          const component = componentSet.find(
            (component) => component.name === name
          );

          if (!component) {
            throw new Error(`Component not found: ${name}`);
          }

          return {
            usage: component.docs.use[0]?.code,
            import: component.docs.import.code,
            examples: component.docs.examples[0]?.code,
          };
        },
      },
      // TODO: may we improve by adding building blocks for the generic ui: landing, e-commerce, blog, etc.
    },
    system: SYSTEM_RPOMPT,
    maxSteps: 5,
    // onStepFinish(event) {
    //   const toolCalls = event.toolCalls;

    //   if (toolCalls.length > 0) {
    //     const toolCall = toolCalls?.[0];
    //     if (toolCall.toolName === "componentFetcher") {
    //       const components = toolCall.args.name;

    //       uiStream.update(
    //         <Message
    //           role="assistant"
    //           content={`Kommint fetched components: ${components}`}
    //         />
    //       );
    //     }
    //   }
    // },
  });

  const contentStreamValue = createStreamableValue();

  uiStream.update(<TextStreamMessage content={contentStreamValue.value} />);

  let inCodeBlock = false;
  for await (const chunk of textStream) {
    if (chunk.includes("<code>")) {
      inCodeBlock = true;
      const [text, code] = chunk.split("<code>");
      contentStreamValue.append(text);
      contentStreamValue.append(`Generating the code...`);
      codeStream.append(code);
    } else if (chunk.includes("</code>")) {
      const [code, text] = chunk.split("</code>");
      codeStream.append(code);
      contentStreamValue.append(text);
      inCodeBlock = false;
    } else if (inCodeBlock) {
      codeStream.append(chunk);
    } else {
      contentStreamValue.append(chunk);
    }
  }

  codeStream.done();
  uiStream.done();

  aiState.done({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: generateId(),
        role: "asistant",
        content: codeStream.value,
        type: "code",
      },
    ],
  });
}
