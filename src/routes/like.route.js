import express from "express";
import LikesController from "../controllers/like.controller.js";

const likeRouter = express.Router();

likeRouter.route("/:postId").get(LikesController.getlikes);

likeRouter.route("/toggle/:postId").get(LikesController.togglelike);

export default likeRouter;
