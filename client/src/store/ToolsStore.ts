import { create } from "zustand";

interface ToolsStoreType {
  screenSize: number;
  screenSizeReader: (width: number) => void;
}

export const useToolsStore = create<ToolsStoreType>((set) => ({
  screenSize: 0,
  screenSizeReader: (width) => {
    set(() => ({ screenSize: width }));
  },
}));
