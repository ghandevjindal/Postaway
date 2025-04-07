import commentModel from "../models/comment.model.js";

export default class CommentsController {
    static getcomments(req,res){
        const comments = commentModel.getByPostId(req.params.id);
        return res.send({"comments":comments});
    }

    static addcomment(req,res){
        const comments = commentModel.addcomment(req.body, req.params.id, req.user.id);
        return res.send({"comments":comments});
    }

    static updatecomment(req,res){
        const comment = commentModel.updateById(req.params.id, req.body);
        return res.send({"comment":comment});
    }

    static deletecomment(req,res){
        const comments = commentModel.removeById(req.params.id);
        return res.send({"comments":comments});
    }
}
