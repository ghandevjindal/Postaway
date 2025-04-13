import express from "express";
import BookmarkController from "../controllers/bookmark.controller.js";

const router = express.Router();

router.post("/:postId", BookmarkController.addBookmark);
router.delete("/:id", BookmarkController.removeBookmark); 
router.get("/", BookmarkController.getUserBookmarks);

export default router;