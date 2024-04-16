import {  Hono } from "hono";
import { deleteUser, getAllUsers, getMe, signin, signup, updateUser } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRouter = new Hono();

userRouter.post("/signup", signup)

userRouter.post("/signin", signin)

userRouter.get("/bulk", getAllUsers)

userRouter.put("/update", authMiddleware,updateUser)

userRouter.delete("/delete", authMiddleware, deleteUser)

userRouter.get("/me",authMiddleware,getMe)
// userRouter.get("/otp",verifyOTP)

export default userRouter
