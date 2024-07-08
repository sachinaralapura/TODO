import express from "express";
import {
  getAllTasks,
  addTask,
  deleteTask,
} from "../controller/taskController.js";
import { authenticateToken } from "../controller/auth.js";
const taskRouter = express.Router();

taskRouter.get("/all", authenticateToken, getAllTasks);

taskRouter.post("/newTask", authenticateToken, addTask);

taskRouter.delete("/deleteTask/:id", authenticateToken, deleteTask);

export default taskRouter;
