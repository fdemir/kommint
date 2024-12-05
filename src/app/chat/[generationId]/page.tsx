import { getChat } from "@/lib/actions/chat";
import { AI } from "@/app/ai";
import { notFound } from "next/navigation";
import PreviewContent from "@/app/(home)/preview/[generationId]/content";

interface PreviewPageProps {
  params: {
    generationId: string;
  };
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const generationId = (await params).generationId;

  const chat = await getChat(generationId);

  if (!chat) {
    notFound();
  }

  return (
    <AI initialAIState={{ chatId: generationId, messages: chat?.messages }}>
      <PreviewContent />
    </AI>
  );
}
