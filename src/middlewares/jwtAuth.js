import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const jwtAuth = (req, res, next) => {
  const jwtToken = req.cookies[process.env.COOKIE_NAME];
  try {
    const authStatus = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = {
      id: authStatus.userId,
      email: authStatus.userEmail
    };
    next();
  } catch (error) {
    res.status(401).json({ success: false, msg: error });
  }
};

export default jwtAuth;
