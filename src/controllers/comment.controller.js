import commentModel from "../models/comment.model.js";

export default class Jobs {
    getcomments(req,res){
        const comments = commentModel.getByPostId(req.params.postId);
        return res.send({"comments":comments});
    }

    addcomment(req,res){
        const comments = commentModel.addcomment(req.body, req.session.userId);
        return res.send({"comments":comments});
    }

    updatecomment(req,res){
        const comment = commentModel.updateById(req.params.commentId,req.body);
        return res.send({"comment":comment});
    }

    deletecomment(req,res){
        const comments = commentModel.removeById(req.params.id);
        return res.send({"comments":comments});
    }
}
