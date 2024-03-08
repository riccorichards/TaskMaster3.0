export interface OffersType {
  id: string;
  title: string;
  desc: string;
  description: string;
  source: string;
  reverse: boolean;
}

export interface SignUpInput {
  username: string;
  email: string;
  password: string;
  confPassword: string;
}
export interface SignInInput {
  email: string;
  password: string;
}

export interface TaskType {
  id: number;
  workspace: string;
  task: string;
  priority: string;
  storedTime: string;
}

export interface NodeTreeInputType {
  username: string;
  node: string;
  path: string;
}
export interface NodeTreeType {
  name: string;
  children: NodeTreeType[];
}

export interface NodeTreeState {
  nodeTree: NodeTreeType | null;
  nodeNames: string[];
  isLoading: boolean;
  error: string | null;
}
