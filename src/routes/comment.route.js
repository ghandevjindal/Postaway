import express from "express";
import CommentsController from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.route("/:id").get(CommentsController.getcomments);

commentRouter.route("/:id").post(CommentsController.addcomment);

commentRouter.route("/:id").put(CommentsController.updatecomment);

commentRouter.route("/:id").delete(CommentsController.deletecomment);

export default commentRouter;
