import { create } from "zustand";
import { TaskState, TaskType } from "../types";
import Utils from "../utils/Utils";

interface TaskStore extends TaskState {
  createTask: (input: TaskType) => Promise<void>;
  getTasks: () => Promise<void>;
  getTaskById: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  completeTask: (
    taskId: string,
    input: { storedTime: number; complete: boolean }
  ) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  storedTime: 0,
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
            storedTime: tasks[taskIndex].storedTime + response.storedTime,
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
}));
