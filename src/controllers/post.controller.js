import postModel from "../models/post.model.js";

export default class PostController {
    static getAllPosts(req,res){
        const posts = postModel.getAll();
        return res.send({"Posts":posts});
    }

    static getPostById(req,res){
        const id = req.params.id;
        const post = postModel.getById(id);
        return res.send({"Post":post});
    }

    static getPostByUserId(req,res){
        const id = req.user.id;
        const posts = postModel.getByUserId(id);
        return res.send({"Posts":posts});
    }

    static addPost(req,res){
        const posts = postModel.addPost(req.body, req.filePath, req.user.id);
        return res.send({"Posts":posts});
    }

    static async updatePost(req,res){
        try {
            const post = await postModel.updateById(req.params.id, req.body, req.filePath, req.user.id);
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
            const posts = await postModel.removeById(req.params.id);
            if (!posts) {
                return res.status(404).send({ message: "Post not found" });
            }
            return res.status(200).send({ success: true, data: posts });
        } catch (error) {
            return res.status(500).send({ message: "Error deleting post", error });
        }
    }

    static filterByCaption(req, res) {
        const searchTerm = req.query.q;
        const filteredPosts = postModel.filterByCaption(searchTerm);
        return res.send({"Posts": filteredPosts});
    }

    static saveAsDraft(req, res) {
        const post = postModel.saveAsDraft(req.params.id);
        if(!post) {
          return res.status(404).send({message: "Post not found"});
        }
        return res.status(200).send(post);
      }
      
    static archivePost(req, res) {
        const post = postModel.archivePost(req.params.id);
        if(!post) {
          return res.status(404).send({message: "Post not found"});
        }
        return res.status(200).send(post);
    }
      
    static getDrafts(req, res) {
        const drafts = postModel.getDrafts();
        return res.status(200).send(drafts);
    }
      
    static getArchived(req, res) {
        const archived = postModel.getArchived();
        return res.status(200).send(archived);
    }
}
