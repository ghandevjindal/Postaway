import postModel from "../models/post.model.js";

export default class PostController {
    static getPosts(req,res){
        const posts = postModel.getAll();
        return res.send({"Posts":posts});
    }

    static addPost(req,res){
        const posts = postModel.addPost(req.body, req.session.userId);
        return res.send({"Posts":posts});
    }

    static async updatePost(req,res){
        try {
            const post = await postModel.updateById(req.params.postId, req.body);
            if (!post) {
                return res.status(404).send({ message: "Post not found" });
            }
            return res.status(200).send({ success: true, data: post });
        } catch (error) {
            return res.status(500).send({ message: "Error updating post", error });
        }
    }

    static async deletePost(req,res){
        try {
            const posts = await postModel.removeById(req.params.postId);
            if (!posts) {
                return res.status(404).send({ message: "Post not found" });
            }
            return res.status(200).send({ success: true, data: posts });
        } catch (error) {
            return res.status(500).send({ message: "Error deleting post", error });
        }
    }
}
