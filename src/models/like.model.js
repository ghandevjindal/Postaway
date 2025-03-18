export default class likeModel{
    constructor(id, userId, postId){
        this.id = id;
        this.userId = userId;
        this.postId = postId;
    }

    static addlike(body, userId){
        const newlike = new likeModel(likes.length+1, userId, body.postId);
        likes.push(newlike);
        return likes;
    }

    static getByPostId(postId){
        return likes.find(like => like.postId == postId);
    }

    static removeById(id){
        const index = likes.findIndex(like => like.id==id);
        if(index != -1){
            likes.splice(index, 1);
        }
        return likes;
    }

}

var likes = [
    new likeModel(1, 1, 4),
    new likeModel(2, 2, 5),
    new likeModel(3, 1, 4),
]