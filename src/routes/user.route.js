import express from "express";
import UserController from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.route("/register").post(UserController.userRegister);
userRouter.route("/login").post(UserController.userLogin);
userRouter.route("/logout").post(UserController.userLogout);

export default userRouter;
