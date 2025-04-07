import likeModel from "../models/like.model.js";

export default class LikesController {
    static getlikes(req,res){
        const likes = likeModel.getByPostId(req.params.postId);
        return res.send({"likes":likes});
    }

    static togglelike(req,res){
        const likes = likeModel.getByPostId(req.params.postId);
        const like = likes.find(like => like.userId === req.user.id);
        if(like){
            const updatedLikes = likeModel.removeById(like.id);
            return res.send({"likes":updatedLikes});
        }else{
            const updatedLikes = likeModel.addlike(parseInt(req.params.postId), req.user.id);
            return res.send({"likes":updatedLikes});
        }
    }
}
