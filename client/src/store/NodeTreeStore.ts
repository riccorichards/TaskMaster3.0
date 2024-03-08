import { create } from "zustand";
import { NodeTreeState, NodeTreeInputType, NodeTreeType } from "../types";
import Utils from "../utils/Utils";

export interface NodeTreeStore extends NodeTreeState {
  fetchEntireNodeTree: (username: string) => Promise<void>;
  createNewNode: (input: NodeTreeInputType) => Promise<void>;
  insertNewNode: (input: NodeTreeInputType) => Promise<void>;
  fetchEntireNodesName: (username: string) => Promise<void>;
  updateNode: (input: {
    username: string;
    node: string;
    updatedNodeName?: string;
    method: string;
  }) => Promise<void>;
}

export const useNodeTree = create<NodeTreeStore>((set) => ({
  nodeTree: null,
  nodeNames: [],
  isLoading: false,
  error: null,
  fetchEntireNodeTree: async (username) => {
    set(() => ({ isLoading: true, error: null }));
    try {
      const response = await Utils.makeRequest<NodeTreeType>(
        `nodes/${username}`,
        "GET"
      );
      if (response) set(() => ({ nodeTree: response, isLoading: false }));
    } catch (error) {
      const message =
        (error as Error).message ?? "An unexpected error occurred";
      set(() => ({ error: message, isLoading: false }));
    }
  },
  createNewNode: async (input) => {
    set(() => ({
      isLoading: true,
    }));
    try {
      const response = await Utils.makeRequest<{
        nodeTree: NodeTreeType;
        nodeNames: string[];
      }>("node-tree", "POST", input);
      const { nodeNames, nodeTree } = response;
      set(() => ({ nodeNames, nodeTree, isLoading: false }));
    } catch (error) {
      const message =
        (error as Error).message ?? "An unexpected error occurred";
      set(() => ({ error: message, isLoading: false }));
    }
  },
  fetchEntireNodesName: async (username) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<string[]>(
        `nodes-name/${username}`,
        "GET"
      );
      set(() => ({ nodeNames: response, isLoading: false }));
    } catch (error) {
      const message =
        (error as Error).message ?? "An unexpected error occurred";
      set(() => ({ error: message, isLoading: false }));
    }
  },
  insertNewNode: async (input) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<{
        nodeTree: NodeTreeType;
        nodeNames: string[];
      }>("insert-node", "POST", input);
      const { nodeNames, nodeTree } = response;
      set(() => ({ nodeTree, nodeNames, isLoading: false }));
    } catch (error) {
      const message =
        (error as Error).message ?? "An unexpected error occurred";
      set(() => ({ error: message, isLoading: false }));
    }
  },
  updateNode: async (input) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await Utils.makeRequest<{
        nodeTree: NodeTreeType;
        nodeNames: string[];
      }>("update-node", "PUT", input);
      const { nodeNames, nodeTree } = response;
      set(() => ({ nodeNames, nodeTree, isLoading: false }));
    } catch (error) {
      const msg = (error as Error).message ?? "An unexpected error occurred";
      set(() => ({ error: msg, isLoading: false }));
    }
  },
}));
