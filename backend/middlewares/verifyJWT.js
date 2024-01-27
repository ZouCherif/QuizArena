const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyJWT = async (req, res, next) => {
  if (!req.cookies?.access_token)
    return res.status(401).json({ message: "access_token is required" });
  const token = req.cookies.access_token;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error(err.message);
      return res.sendStatus(403);
    }
    req.userId = decoded.UserInfo.id;
    req.email = decoded.UserInfo.email;
    req.username = decoded.UserInfo.username;
    req.name = decoded.UserInfo.name;
    next();
  });
};

module.exports = verifyJWT;
