import { create } from "zustand";
import {
  MyStatsType,
  NewJourneyType,
  SessionType,
  SignInInput,
  SignUpInput,
  UserState,
  UserType,
} from "../types";
import Utils from "../utils/Utils";

interface UserStore extends UserState {
  signup: (input: SignUpInput) => Promise<void>;
  login: (input: SignInInput) => Promise<void>;
  getMe: () => Promise<void>;
  newJourney: (input: NewJourneyType) => Promise<void>;
  getMyStats: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  session: null,
  myStats: null,
  isLoading: false,
  error: null,
  signup: async (input) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<UserType>(
        "register",
        "POST",
        input
      );
      set(() => ({ user: response, isLoading: false }));
    } catch (error) {
      const message =
        (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ error: message, isLoading: false }));
    }
  },
  login: async (input) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<SessionType>(
        "login",
        "POST",
        input
      );
      set(() => ({ session: response, isLoading: false }));
    } catch (error) {
      const message =
        (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ error: message, isLoading: false }));
    }
  },
  getMe: async () => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<UserType>("find-me", "GET");
      set(() => ({ user: response, isLoading: false }));
    } catch (error) {
      const message =
        (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ error: message, isLoading: false }));
    }
  },
  newJourney: async (input) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<UserType>(
        "new-journey",
        "PUT",
        input
      );
      set(() => ({ user: response, isLoading: false }));
    } catch (error) {
      const msg = (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ error: msg, isLoading: false }));
    }
  },
  getMyStats: async () => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<MyStatsType>("my-stats", "GET");
      set(() => ({ myStats: response, isLoading: false }));
    } catch (error) {
      const msg = (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ error: msg, isLoading: false }));
    }
  },
}));
