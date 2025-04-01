import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import UserModel from '../models/user.model.js';

dotenv.config();

export default class UserController {
  static userRegister(req, res) {
      const { name, email, password } = req.body;
      UserModel.add(name, email, password);
      res.send({"message":"User Added"});      
  }

  static userLogin(req,res){
    const { email, password } = req.body;
    const user = UserModel.isValidUser(email, password);
    if (user == undefined) {
      res.send({"errorMessage": "Invalid credentials, please try again."});
    }else{
      req.session.userId = user.id;
      const token = jwt.sign(
        { userId: user.id, userEmail: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res
        .status(201)
        .cookie(process.env.COOKIE_NAME, token, { maxAge: 900000, httpOnly: false })
        .json({ status: "success", msg: "login successfull", token });
    }
  }

  static userLogout(req, res) {
    res.clearCookie(process.env.COOKIE_NAME);
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.send({"Message": "Logout Successfull"});
      }
    });
  }
}

