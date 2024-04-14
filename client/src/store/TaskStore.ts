import { create } from "zustand";
import {
  DailyResultType,
  HistoryType,
  TaskState,
  TaskType,
  TopWorkspaceType,
} from "../types";
import Utils from "../utils/Utils";

interface TaskStore extends TaskState {
  createTask: (input: TaskType) => Promise<void>;
  getTasks: () => Promise<void>;
  getTaskById: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  completeTask: (
    taskId: string | undefined,
    input: { storedTime: number; complete: boolean }
  ) => Promise<void>;
  dayFinish: () => Promise<void>;
  getHistory: (amount: string) => Promise<void>;
  filterHistory: (field: string, value: string) => Promise<void>;
  fetchDailyResult: () => Promise<void>;
  getTopWorkspaces: () => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  storedTime: 0,
  dailyResult: [],
  topWorkspaces: [],
  history: [],
  isLoading: false,
  error: null,
  createTask: async (input) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<TaskType>("task", "POST", input);
      set(({ tasks }) => ({
        tasks: [response, ...tasks],
        isLoading: false,
      }));
    } catch (error) {
      const msg = (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ error: msg, isLoading: false }));
    }
  },
  getTasks: async () => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<TaskType[]>("task", "GET");
      set(() => ({ tasks: response, isLoading: false }));
    } catch (error) {
      const msg = (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ error: msg, isLoading: false }));
    }
  },
  getTaskById: async (id) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<TaskType>(`task/${id}`, "GET");
      set(() => ({ task: response, isLoading: false }));
    } catch (error) {
      const msg = (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ error: msg, isLoading: false }));
    }
  },
  deleteTask: async (id) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<TaskType>(
        `task/${id}`,
        "DELETE"
      );
      set(({ tasks }) => ({
        tasks: tasks.filter((task) => task._id !== response._id),
        isLoading: false,
      }));
    } catch (error) {
      const msg = (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ error: msg, isLoading: false }));
    }
  },
  completeTask: async (taskId, input) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<TaskType>(
        `task/${taskId}`,
        "PUT",
        input
      );

      set(({ tasks }) => {
        const taskIndex = tasks.findIndex((task) => task._id === response._id);
        if (taskIndex !== -1) {
          const updatedTasks = [...tasks];

          const updatedTask = {
            ...tasks[taskIndex],
            complete: response.complete,
            storedTime: response.storedTime,
          };
          updatedTasks[taskIndex] = updatedTask;

          return { tasks: updatedTasks, isLoading: false };
        }

        return {};
      });
    } catch (error) {
      const msg = (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ error: msg, isLoading: false }));
    }
  },
  dayFinish: async () => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<HistoryType[]>(
        "day-finish",
        "POST"
      );
      set(() => ({
        tasks: response && [],
        history: response,
        isLoading: false,
      }));
    } catch (error) {
      const msg = (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ error: msg, isLoading: false }));
    }
  },
  getHistory: async (amount) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<HistoryType[]>(
        `day-finish?amount=${amount}`,
        "GET"
      );
      set(() => ({ history: response, isLoading: false }));
    } catch (error) {
      const msg = (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ error: msg, isLoading: false }));
    }
  },
  filterHistory: async (field, value) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<HistoryType[]>(
        `filter-history?${field}=${value}`,
        "GET"
      );
      set(() => ({ history: response, isLoading: false }));
    } catch (error) {
      const msg = (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ error: msg, isLoading: false }));
    }
  },
  fetchDailyResult: async () => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<DailyResultType[]>(
        "daily-result",
        "GET"
      );
      set(() => ({ dailyResult: response, isLoading: false }));
    } catch (error) {
      const msg = (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ error: msg, isLoading: false }));
    }
  },
  getTopWorkspaces: async () => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<TopWorkspaceType[]>(
        "top-workspaces",
        "GET"
      );
      set(() => ({ topWorkspaces: response, isLoading: false }));
    } catch (error) {
      const msg = (error as Error).message ?? "An unexpected error occurred!";
      set(() => ({ error: msg, isLoading: false }));
    }
  },
}));
