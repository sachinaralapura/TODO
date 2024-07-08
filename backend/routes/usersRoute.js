import express from "express"
import { authenticateToken, getAlluser, login, register } from "../controller/auth.js";

const userRouter = express.Router()

userRouter.get("/users", authenticateToken, getAlluser)

userRouter.post("/register", register)

userRouter.post("/login", login)


export default userRouter