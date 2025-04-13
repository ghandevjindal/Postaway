export default class postModel{
    constructor(id, userId, caption, imageUrl, status){
        this.id = id;
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
        this.status = status;
    }

    static addPost(body, imgUrl, userId){
        const newPost = new postModel(posts.length+1, userId, body.caption, imgUrl);
        newPost.status = 'published';
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
            posts[index]['status'] = 'published';
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

    static filterByCaption(searchTerm) {
        if (!searchTerm) return posts;
        const searchTermLower = searchTerm.toLowerCase();
        return posts.filter(post => 
            post.caption.toLowerCase().includes(searchTermLower)
        );
    }

    static saveAsDraft(id) {
        const post = this.getById(id);
        if(post) {
          post.status = 'draft';
          return post;
        }
        return null;
    }
      
    static archivePost(id) {
        const post = this.getById(id);
        if(post) {
          post.status = 'archived';
          return post;
        }
        return null;
    }
      
    static getDrafts() {
        return posts.filter(post => post.status === 'draft');
    }
      
    static getArchived() {
        return posts.filter(post => post.status === 'archived');
    }

}

var posts = [
    new postModel(1, 1, "Post1", "/uploads/", 'published'),
    new postModel(2, 2, "Post2", "/uploads/", 'published'),
    new postModel(3, 1, "Post3", "/uploads/", 'published'),
]