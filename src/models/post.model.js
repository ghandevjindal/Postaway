export default class postModel{
    constructor(id, userId, caption, imageUrl){
        this.id = id;
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
    }

    static addPost(body, userId){
        const newPost = new postModel(posts.length+1, userId, body.caption, body.imageUrl);
        posts.push(newPost);
        return posts;
    }

    static getAll(){
        return posts;
    }

    static getByUserId(userId){
        return posts.find(post => post.userId == userId);
    }

    static getById(id){
        return posts.find(post => post.id == id);
    }

    static updateById(id,body){
        const index = posts.findIndex(post => post.id==id);
        if(index != -1){
            posts[index] = {...posts[index], ...body};
        }
        return posts[index];
    }

    static removeById(id){
        const index = posts.findIndex(post => post.id==id);
        if(index != -1){
            posts.splice(index, 1);
        }
        return posts;
    }

}

var posts = [
    new postModel(1, 1, "Post1", "/uploads/"),
    new postModel(2, 2, "Post2", "/uploads/"),
    new postModel(3, 1, "Post3", "/uploads/"),
]