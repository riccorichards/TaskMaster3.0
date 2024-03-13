import mongoose from "mongoose";

//map tree model type
export interface NodeTreeType {
  username: string;
  node: string;
  path: string;
}

export interface NodeDocument extends NodeTreeType {
  _id: mongoose.Schema.Types.ObjectId;
}

//user model type
export interface UserInput {
  username: string;
  email: string;
  password: string;
  image: string;
  url: string | null;
  journeyDuration: string | null;
  allocatedTime: number;
}

export interface UserDocument extends UserInput {
  _id: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  comparePass(incomingPassword: string): Promise<boolean>;
}

//session model type
export interface SessionDocument extends mongoose.Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createAt: Date;
  updateAt: Date;
}

//task model type
export interface TaskDocument {
  _id: string;
  author: mongoose.Schema.Types.ObjectId;
  workspace: string;
  task: string;
  desc: string;
  storedTime: number;
  priority: string;
  complete: boolean;
  createdAt: Date;
}
