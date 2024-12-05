import { UIState } from "@/app/actions";
import { Textarea } from "./ui/textarea";

interface ChatProps {
  messages: UIState;
}

export function Chat({ messages }: ChatProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="overflow-y-scroll flex-1 flex flex-col gap-4 pb-4 overflow-x-hidden whitespace-normal">
        {messages.map((message) => (
          <span key={message.id}>{message.component}</span>
        ))}
      </div>

      <div className="min-h-[60px]">
        <Textarea
          placeholder="Add a...(didnt implement it yet)"
          disabled
          className="resize-none"
        />
      </div>
    </div>
  );
}
