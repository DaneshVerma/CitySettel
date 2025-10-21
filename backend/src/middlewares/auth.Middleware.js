const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { jwtSecret } = require("../config/environments/config");

async function authUser(req, res, next) {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, jwtSecret);
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
}

module.exports = { authUser };