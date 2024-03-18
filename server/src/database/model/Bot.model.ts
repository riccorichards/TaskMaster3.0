import mongoose from "mongoose";
import { BotDocument } from "../type";

const Bot = new mongoose.Schema({
  user: { type: String },
  question: { type: String, required: true },
});

const BotModel = mongoose.model<BotDocument>("Bot", Bot);

export default BotModel;
