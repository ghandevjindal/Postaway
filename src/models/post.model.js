export default class postModel{
    constructor(id, userId, caption, imageUrl){
        this.id = id;
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
    }

    static addPost(body, imgUrl, userId){
        const newPost = new postModel(posts.length+1, userId, body.caption, imgUrl);
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

    static async updateById(id, body, imageUrl, userId){
        const index = posts.findIndex(post => post.id==id);
        if (index == -1){
            return null;
        }else{
            posts[index]['userId'] = userId;
            posts[index]['caption'] = body.caption;
            posts[index]['imageUrl'] = imageUrl;
        }
        return posts[index];
    }

    static async removeById(id){
        const index = posts.findIndex(post => post.id==id);
        if (index == -1){
            return null;
        }else{
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