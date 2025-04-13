export default class BookmarkModel {
    constructor(id, userId, postId) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
    }

    static addBookmark(postId, userId) {
        const newBookmark = new BookmarkModel(bookmarks.length+1, userId, postId);
        bookmarks.push(newBookmark);
        return bookmarks;
    }

    static removeBookmark(id) {
        const index = bookmarks.findIndex(b => b.id == id);
        if(index != -1) bookmarks.splice(index, 1);
        return bookmarks;
    }

    static getByUserId(userId) {
        return bookmarks.filter(b => b.userId == userId);
    }
}

let bookmarks = [];