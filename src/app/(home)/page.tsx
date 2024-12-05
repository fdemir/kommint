"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";
import { useActions, useUIState } from "ai/rsc";
import { AI } from "../ai";
import { Message } from "@/components/message";
import { generateId } from "ai";
import { useCodeStore } from "@/code.store";
import { useRouter } from "next/navigation";

export default function Home() {
  const { submit } = useActions();
  const [, setMessages] = useUIState<typeof AI>();
  const { setCode } = useCodeStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: generateId(),
        component: (
          <Message role="user" content={String(formData.get("input"))} />
        ),
      },
    ]);

    const response = await submit(formData);

    if (response.code) {
      setCode(response.code);
    }

    router.push(`/preview/${response.id}`);

    setMessages((currentMessages) => [...currentMessages, response]);
  };

  return (
    <div className=" mx-auto max-w-[500px] h-n-screen items-center flex justify-center">
      <form className=" flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
        <div className="relative">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">kommint creates things</h2>
            <p className="text-zinc-400">
              Zart zort zort zort zort zort zort zort zort zort zort zort
            </p>
          </div>
          <Textarea
            placeholder="Build something..."
            name="input"
            rows={3}
            className="border-none outline-none bg-zinc-100 rounded-xl resize-none"
          />

          <Button
            type="submit"
            variant="ghost"
            className="absolute right-0 bottom-0"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
