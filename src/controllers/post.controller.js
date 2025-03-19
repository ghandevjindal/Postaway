import postModel from "../models/post.model.js";

export default class Jobs {
    getPosts(req,res){
        const posts = postModel.getAll();
        return res.send({"Posts":posts});
    }

    addPost(req,res){
        const posts = postModel.addPost(req.body, req.session.userId);
        return res.send({"Posts":posts});
    }

    updatePost(req,res){
        const post = postModel.updateById(req.params.postId,req.body);
        return res.send({"Post":post});
    }

    deletePost(req,res){
        const posts = postModel.removeById(req.params.postId);
        return res.send({"Posts":posts});
    }
}
