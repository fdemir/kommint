import { StreamableValue } from "ai/rsc";
import { create } from "zustand";

interface CodeStore {
  code: StreamableValue;
  setCode: (code: StreamableValue) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

export const useCodeStore = create<CodeStore>()((set) => ({
  code: "",
  setCode: (code: StreamableValue) => set({ code }),
  isGenerating: false,
  setIsGenerating: (isGenerating: boolean) => set({ isGenerating }),
}));
