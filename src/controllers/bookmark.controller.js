import BookmarkModel from "../models/bookmark.model.js";

export default class BookmarkController {
    static addBookmark(req, res) {
        const bookmarks = BookmarkModel.addBookmark(
            req.params.postId, 
            req.user.id
        );
        res.status(201).send(bookmarks);
    }

    static removeBookmark(req, res) {
        const bookmarks = BookmarkModel.removeBookmark(req.params.id);
        res.status(200).send(bookmarks);
    }

    static getUserBookmarks(req, res) {
        const bookmarks = BookmarkModel.getByUserId(req.user.id);
        res.status(200).send(bookmarks);
    }
}