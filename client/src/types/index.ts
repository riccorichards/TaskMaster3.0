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
  _id?: string;
  workspace: string;
  task: string;
  desc: string;
  priority: string;
  storedTime: number;
  complete: boolean;
  createdAt?: string;
}

export interface NewJourneyType {
  journeyDuration: string;
  allocatedTime: number;
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

export interface UserType {
  username: string;
  email: string;
  picture: string;
  journeyDuration: string;
  allocatedTime: number;
}

export interface MyStatsType {
  remainingDays: number;
  usedTime: number;
  perDay: number;
}

export interface SessionType {
  user: string;
}

export interface UserState {
  user: UserType | null;
  session: SessionType | null;
  myStats: MyStatsType | null;
  isLoading: boolean;
  error: string | null;
}

export interface HistoryType {
  workspace: string;
  task: string;
  priority: string;
  storedTime: number;
  complete: boolean;
  createdAt: string;
}

export interface DailyResultType {
  date: string;
  value: number;
}

export interface TopWorkspaceType {
  workspace: string;
  value: number;
}

export interface TaskState {
  tasks: TaskType[];
  storedTime: number;
  history: HistoryType[];
  dailyResult: DailyResultType[];
  topWorkspaces: TopWorkspaceType[];
  isLoading: boolean;
  error: string | null;
}

export interface FilteredType {
  done?: string;
  failed?: string;
  priority?: string;
  workspace?: string;
}

export interface MessageType {
  author: string;
  msg: string;
}

export interface BotState {
  messages: MessageType[];
  bot: string;
  isLoading: boolean;
  error: string | null;
}
