import { create } from "zustand";
import { BotState, MessageType } from "../types";
import Utils from "../utils/Utils";

interface BotStoreType extends BotState {
  botAction: (v: string) => void;
  interactWithBot: (cmd: string) => Promise<void>;
  msgTaker: (v: MessageType) => void;
}

export const useBotStore = create<BotStoreType>((set) => ({
  messages: [],
  bot: "close",
  isLoading: false,
  error: null,
  botAction: (v) => {
    set(() => ({ bot: v }));
  },
  interactWithBot: async (cmd) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<MessageType>(
        `bot-message?cmd=${cmd}`,
        "GET"
      );
      set((state) => ({
        messages: [...state.messages, response],
        isLoading: false,
      }));
    } catch (error) {
      const msg = (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ error: msg, isLoading: false }));
    }
  },
  msgTaker: (msg) => {
    set((state) => ({ messages: [...state.messages, msg] }));
  },
}));
