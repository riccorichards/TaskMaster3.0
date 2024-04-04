import { create } from "zustand";
import { GptState } from "../types";
import Utils from "../utils/Utils";

interface GptStoreType extends GptState {
  sentToGpt: ({ message }: { message: string }) => Promise<void>;
  msgTaker: ({ message, role }: { message: string; role: string }) => void;
  closeGpt: () => void;
}

export const useGptStore = create<GptStoreType>((set) => ({
  gpt_messages: [],
  isLoading: false,
  error: null,
  sentToGpt: async (cmd) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<{
        message: string;
        role?: string;
      }>("chat-gpt", "POST", cmd);

      set((state) => ({
        gpt_messages: [...state.gpt_messages, response],
      }));
    } catch (error) {
      const msg = (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ error: msg, isLoading: false }));
    }
  },
  msgTaker: (msg) => {
    set((state) => ({
      gpt_messages: [...state.gpt_messages, msg],
    }));
  },
  closeGpt: () => {
    set(() => ({ gpt_messages: [] }));
  },
}));
