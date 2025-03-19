import UserModel from '../models/user.model.js';

export default class UserController {
  userRegister(req, res) {
      const { name, email, password } = req.body;
      UserModel.add(name, email, password);
      res.send({"message":"User Added"});      
  }

  userLogin(req,res){
    const { email, password } = req.body;
    const user = UserModel.isValidUser(email, password);
    if (user == undefined) {
      res.send({"errorMessage": "Invalid credentials, please try again."});
    }else{
      req.session.userId = user.id;
      res.send({"Message": "Login Successfull"});
    }
  }

  userLogout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.send({"Message": "Logout Successfull"});
      }
    });
  }
}

