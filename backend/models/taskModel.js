import mongoose from "mongoose";
import { string } from "three/examples/jsm/nodes/Nodes.js";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
  },
  schedule: {
    type: string, // Field for storing scheduled time and date
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
});

export const taskModel = mongoose.model("Tasks", taskSchema);
