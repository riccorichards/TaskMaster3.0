import { create } from "zustand";
import { BotRolesType, BotState, MessageType } from "../types";
import Utils from "../utils/Utils";

interface BotStoreType extends BotState {
  interactWithBot: (cmd: string, role: string) => Promise<void>;
  msgTaker: (v: MessageType) => void;
  getBotRoles: () => Promise<void>;
  createBotRole: (input: { role: string }) => Promise<void>;
  removeBot: (botId: string) => Promise<void>;
  searchBot: (role: string) => Promise<void>;
  getPickedRole: (v: string) => void;
}

export const useBotStore = create<BotStoreType>((set) => ({
  messages: [],
  roles: [],
  pickedRole: "",
  isLoading: false,
  error: null,
  interactWithBot: async (cmd, role) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<MessageType>(
        `bot-message?cmd=${cmd}&role=${role}`,
        "GET"
      );
      const specificSymbols = "#$%";
      if (response.msg.includes(specificSymbols)) {
        const splitMessages = response.msg
          .split(specificSymbols)
          .filter((m) => m.trim() !== "");
        splitMessages.forEach((msgPart, i) => {
          const splitResponse = {
            author: "bot",
            msg: msgPart.trim(),
            role: response.role,
          };
          const delay = 500 * i;
          setTimeout(() => {
            set((state) => ({
              messages: [...state.messages, splitResponse],
              isLoading: false,
            }));
          }, delay);
        });
      } else {
        set((state) => ({
          messages: [...state.messages, response],
          isLoading: false,
        }));
      }
    } catch (error) {
      const msg = (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ error: msg, isLoading: false }));
    }
  },
  msgTaker: (msg) => {
    set((state) => ({ messages: [...state.messages, msg] }));
  },
  getBotRoles: async () => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<BotRolesType[]>("bot", "GET");
      set(() => ({ roles: response, isLoading: false }));
    } catch (error) {
      const message =
        (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ isLoading: false, error: message }));
    }
  },
  createBotRole: async (input) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<BotRolesType>(
        "create-bot",
        "POST",
        input
      );
      set((state) => ({ roles: [response, ...state.roles], isLoading: false }));
    } catch (error) {
      const message =
        (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ isLoading: false, error: message }));
    }
  },
  removeBot: async (botId) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<BotRolesType>(
        `bot/${botId}`,
        "DELETE"
      );
      set(({ roles }) => ({
        roles: roles.filter(
          (role) => role._id.toString() !== response._id.toString()
        ),
        isLoading: false,
      }));
    } catch (error) {
      const message =
        (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ isLoading: false, error: message }));
    }
  },
  searchBot: async (role) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<BotRolesType[]>(
        `search-bot?role=${role}`,
        "GET"
      );
      set(() => ({ isLoading: false, roles: response }));
    } catch (error) {
      const message =
        (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ isLoading: false, error: message }));
    }
  },
  getPickedRole: (v) => {
    set(() => ({ pickedRole: v }));
  },
}));
