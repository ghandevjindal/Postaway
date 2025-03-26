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
      const token = jwt.sign(
        { userId: user.id, userEmail: user.email },
        "CodingNinjas2016",
        { expiresIn: "1h" }
      );
      res
        .status(201)
        .cookie("jwtToken", token, { maxAge: 900000, httpOnly: false })
        .json({ status: "success", msg: "login successfull", token });
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

