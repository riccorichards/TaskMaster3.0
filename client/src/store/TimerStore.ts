import { create } from "zustand";

interface TimerStoreType {
  timerValue: number;
  takeTime: (timeInSec: number) => void;
}

export const useTimerStore = create<TimerStoreType>((set) => ({
  timerValue: 0,
  isLoading: false,
  error: null,
  takeTime: (timeInSec) => {
    set(() => ({ timerValue: timeInSec }));
  },
}));
