import jobModel from "../models/jobs.model.js";
import UserModel from "../models/user.model.js";

export default class Jobs {
    getHomePage(req, res, next) {
        const user = UserModel.getById(req.session.userId);
        let userName = null
        if(user != undefined){
            userName = user.name
        }
        res.render('index', {
            userName: userName // Pass userName to the view
        });
    }

    getJobsPage(req, res, next) {
        const jobs = jobModel.getAll(req.query.query);
        const user = UserModel.getById(req.session.userId);
        let userName = null
        if(user != undefined){
            userName = user.name
        }
        res.render('jobs', {
            jobs,
            userName: userName || null, // Ensure userName is defined
        });
    }

    getJob(req, res, next) {
        const job = jobModel.getById(req.params.id);
        const user = UserModel.getById(req.session.userId);
        let userName = null
        if(user != undefined && job.userId == user.id){
            userName = user.name
        }
        res.render('jobDetails', {
            job,
            userName: userName || null, // Ensure userName is defined
        });
    }

    getPostJob(req, res, next) {
        const user = UserModel.getById(req.session.userId);
        let userName = null
        if(user != undefined){
            userName = user.name
        }
        res.render('postJob', {
            userName: userName
        });
    }

    getUpdateJob(req, res, next) {
        const job = jobModel.getById(req.params.id);
        const user = UserModel.getById(req.session.userId);
        let userName = null
        if(user != undefined){
            userName = user.name
        }
        res.render('jobUpdate', {
            job,
            userName: userName
        });
    }

    deleteJob(req, res, next) {
        const jobs = jobModel.removeById(req.params.id);
        const user = UserModel.getById(req.session.userId);
        let userName = null
        if(user != undefined){
            userName = user.name
        }
        res.render('jobs', {
            jobs,
            userName: userName || null
        });
    }

    postAddJob(req,res){
        const jobs = jobModel.postAddJob(req.body, req.session.userId);
        const user = UserModel.getById(req.session.userId);
        let userName = null
        if(user != undefined){
            userName = user.name
        }
        res.render('jobs', {
            jobs,
            userName: userName,
        });
    }

    postUpdateJob(req, res) {
        const job = jobModel.updateById(req.params.id, req.body);
        const user = UserModel.getById(req.session.userId);
        let userName = null
        if(user != undefined){
            userName = user.name
        }
        res.render('jobDetails', {
            job,
            userName: userName,
        });
    }
}
