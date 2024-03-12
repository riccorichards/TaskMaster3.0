import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.ObjectId, ref: "User" },
    history: [
      {
        workspace: { type: String },
        task: { type: String },
        duration: { type: String },
        status: { type: String },
        priority: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const HistoryModel = mongoose.model("history", HistorySchema);

export default HistoryModel;
