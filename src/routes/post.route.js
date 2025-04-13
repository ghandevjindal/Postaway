import express from "express";
import PostController from "../controllers/post.controller.js";
import { uploadFile } from "../middlewares/file-upload.middleware.js";

const postRouter = express.Router();

// Additional Tasks
postRouter.route("/filter").get(PostController.filterByCaption);
postRouter.route('/:id/draft').put(PostController.saveAsDraft);
postRouter.route('/:id/archive').put(PostController.archivePost);
postRouter.route('/drafts').get(PostController.getDrafts);
postRouter.route('/archived').get(PostController.getArchived);
postRouter.get('/sorted', PostController.getSortedPosts);


postRouter.route("/all").get(PostController.getAllPosts); // /posts?page=1&limit=10
postRouter.route("/:id").get(PostController.getPostById);
postRouter.route("/").get(PostController.getPostByUserId);

postRouter.route("/").post(uploadFile.single('file'), PostController.addPost);

postRouter.route("/:id").put(uploadFile.single('file'), PostController.updatePost);

postRouter.route("/:id").delete(PostController.deletePost);



export default postRouter;
