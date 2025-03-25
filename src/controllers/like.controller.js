import likeModel from "../models/like.model.js";

export default class Jobs {
    getlikes(req,res){
        const likes = likeModel.getByPostId(req.params.postId);
        return res.send({"likes":likes});
    }

    addlike(req,res){
        const likes = likeModel.addlike(req.body, req.session.userId);
        return res.send({"likes":likes});
    }

    togglelike(req,res){
        const like = likeModel.updateById(req.params.likeId,req.body);
        return res.send({"like":like});
    }

    deletelike(req,res){
        const likes = likeModel.removeById(req.params.id);
        return res.send({"likes":likes});
    }
}
