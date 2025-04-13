import commentModel from "../models/comment.model.js";

export default class CommentsController {
    static getcomments(req,res){
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
        const startIndex = (page - 1) * limit; // Calculate start index
        const endIndex = page * limit; // Calculate end index

        const comments = commentModel.getByPostId(req.params.id).slice(startIndex, endIndex); // Slice comments for pagination
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
