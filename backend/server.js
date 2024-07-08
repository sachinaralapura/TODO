import express from "express";
import userRouter from "./routes/usersRoute.js";
import taskRouter from "./routes/taskRoute.js";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/todo", userRouter);
app.use("/todo/tasks", taskRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then((res) => {
    console.log(`connected to database`);
    app.listen(process.env.PORT || 5001, () => {
      console.log("server running");
    });
  })
  .catch((err) => console.log(err));
