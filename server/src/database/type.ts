import mongoose from "mongoose";

export interface NodeTreeType {
  username: string;
  node: string;
  path: string;
}

export interface NodeDocument extends NodeTreeType {
  _id: mongoose.Schema.Types.ObjectId;
}
