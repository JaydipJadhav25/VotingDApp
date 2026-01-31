
import jwt from "jsonwebtoken";



export const userAuth = async(req, res, next) => {
  // Get token from Authorization header or cookie
  const authHeader = req.headers.authorization;

  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : req.cookies?.auth;

  if (!token) {
     return res.status(401).json({
        message : 'Unauthorized Acesss ,No token provided'
     })
  }

  

  // Verify token
  const decoded =  jwt.verify(token, "superMan@123");


  if (!decoded?.account) {
     return res.status(401).json({
        message : 'Unauthorized Acesss ,Invalid Token'
     })
  }


  // Attach user to request
  req.account =  decoded?.account;

  next();
};



