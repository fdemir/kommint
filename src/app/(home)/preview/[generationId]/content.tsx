"use client";
import { useCodeStore } from "@/code.store";
import { Chat } from "@/components/chat";
import { EditorComponent } from "@/components/editor";
import { ComponentPreview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { useUIState } from "ai/rsc";
import { Copy, Share } from "lucide-react";
import { useState } from "react";

export default function PreviewContent() {
  const { code, isGenerating } = useCodeStore();
  const [messages] = useUIState();

  const [tab, setTab] = useState("code");

  return (
    <div>
      <ResizablePanelGroup
        direction="horizontal"
        className="w-screen h-n-screen"
      >
        <ResizablePanel
          defaultSize={25}
          className="p-4 h-n-screen"
          minSize={10}
        >
          <Chat messages={messages} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} className="h-n-screen ">
          <div className="h-12 bg-zinc-50 flex justify-between items-center px-4">
            <Tabs
              defaultValue="code"
              className="w-[200px]"
              onValueChange={(tab) => setTab(tab)}
            >
              <TabsList className="grid w-full grid-cols-2 bg-zinc-200">
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="preview" disabled={isGenerating}>
                  Preview
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div>
              <Button variant="ghost" className="h-6 w-6 text-zinc-500">
                <Copy />
              </Button>
              <Button variant="ghost" className="h-6 w-6 text-zinc-500">
                <Share />
              </Button>
            </div>
          </div>
          <div className="h-full overflow-y-scroll">
            {tab === "code" && code && <EditorComponent value={code} />}
            {tab === "preview" && code && <ComponentPreview value={code} />}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
