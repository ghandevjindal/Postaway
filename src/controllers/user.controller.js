import UserModel from '../models/user.model.js';
import jobModel from '../models/jobs.model.js';

export default class UserController {
  postRegister(req, res) {
    if ('name' in req.body){
      const { name, email, password } = req.body;
      UserModel.add(name, email, password);
      res.render('login', { errorMessage: null, userName: null });
    }else{
      const { email, password } = req.body;
      const user = UserModel.isValidUser(
        email,
        password
      );
      if (user == undefined) {
        return res.render('login', {
          errorMessage: 'Invalid credentials, please try again.',
          userName: null,
        });
      }else{
        req.session.userId = user.id;
        res.redirect('/jobs');
      }
    }
    
  }

  postLogin(req, res) {
    const jobs = jobModel.getAll();
    const user = UserModel.getById(req.session.userId);
    let userName = null
    if(user != undefined){
        userName = user.name
    }
    return res.render('jobs', {
      jobs,
      userName: userName,
    });
  }

  logout(req, res) {
    // on logout, destroy the session
    res.clearCookie('lastVisit');
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/login');
      }
    });
  }
}
