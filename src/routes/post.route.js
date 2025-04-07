import express from "express";
import PostController from "../controllers/post.controller.js";
import { uploadFile } from "../middlewares/file-upload.middleware.js";

const postRouter = express.Router();

postRouter.route("/all").get(PostController.getAllPosts);
postRouter.route("/:id").get(PostController.getPostById);
postRouter.route("/").get(PostController.getPostByUserId);

postRouter.route("/").post(uploadFile.single('file'), PostController.addPost);

postRouter.route("/:id").put(uploadFile.single('file'), PostController.updatePost);

postRouter.route("/:id").delete(PostController.deletePost);

export default postRouter;
