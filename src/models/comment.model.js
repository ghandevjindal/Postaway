export default class commentModel{
    constructor(id, userId, postId, content){
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    static getByPostId(postId){
        return comments.filter(comment => comment.postId == postId);
    }

    static addcomment(body, postId, userId){
        const newcomment = new commentModel(comments.length+1, userId, postId, body.content);
        comments.push(newcomment);
        return comments;
    }

    static updateById(id, body){
        const index = comments.findIndex(comment => comment.id==id);
        if(index != -1){
            comments[index] = {...comments[index], ...body};
        }
        return comments[index];
    }

    static removeById(id){
        const index = comments.findIndex(comment => comment.id==id);
        if(index != -1){
            comments.splice(index, 1);
        }
        return comments;
    }

}

var comments = [
    new commentModel(1, 1, 3, "comment1"),
    new commentModel(2, 2, 2, "comment2"),
    new commentModel(3, 1, 1, "comment3"),
]