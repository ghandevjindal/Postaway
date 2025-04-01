import express from "express";
import PostController from "../controllers/post.controller.js";

const postRouter = express.Router();

postRouter.route("/get").get(PostController.getPosts);
postRouter.route("/add").post(PostController.addPost);
postRouter.route("/update/:postId").put(PostController.updatePost);
postRouter.route("/delete/:postId").delete(PostController.deletePost);

export default postRouter;
