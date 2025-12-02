const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { jwtSecret, nodeEnv } = require("../config/environments/config");

async function generateToken(user) {
  const token = jwt.sign({ id: user._id }, jwtSecret, {
    expiresIn: "1d",
  });
  return token;
}

async function signUp(req, res) {
  try {
    const {
      fullName: { firstName, lastName },
      email,
      password,
      phone,
    } = req.body;
    if (!firstName || !lastName || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await userModel.create({
      fullName: { firstName, lastName },
      email,
      password,
      phone,
    });
    const token = await generateToken(newUser);
    res.cookie("token", token, {
      httpOnly: true,
      secure: nodeEnv === "production",
      sameSite: "Strict",
    });
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        fullName: {
          firstName: newUser.fullName.firstName,
          lastName: newUser.fullName.lastName,
        },
        phone: newUser.phone,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
}

async function googleCallback(req, res) {
  const {
    id,
    emails: [{ value: email }],
    name: { givenName: firstName, familyName: lastName },
  } = req.user;
  const isUserExist = await userModel.findOne({
    $or: [{ email }, { googleId: id }],
  });
  if (isUserExist) {
    const token = jwt.sign(
      {
        id: isUserExist._id,
        fullname: isUserExist.fullname,
      },
      jwtSecret,
      {
        expiresIn: "2d",
      }
    );
    res.cookie("token", token);
    return res
      .status(200)
      .json({ message: "User logged in successfully", isUserExist, token });
  }

  const user = await userModel.create({
    email,
    fullName: {
      firstName,
      lastName,
    },
    googleId: id,
  });
  const token = jwt.sign({ id: user._id, fullName: user.fullName }, jwtSecret, {
    expiresIn: "2d",
  });
  res.cookie("token", token);
  return res
    .status(200)
    .json({ message: "User registered successfully", user, token });
}

async function logIn(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = await generateToken(user);
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: nodeEnv === "production",
      sameSite: "Strict",
    });
    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        fullName: {
          firstName: user.fullName.firstName,
          lastName: user.fullName.lastName,
        },
        phone: user.phone,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
}
async function getMe(req, res) {
  try {
    const user = req.user;
    return res.status(200).json({
      message: "User fetched successfully",
      user: {
        id: user._id,
        fullName: {
          firstName: user.fullName.firstName,
          lastName: user.fullName.lastName,
        },
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
}

async function logout(req, res) {
  res.clearCookie("token");
  return res.status(200).json({ message: "User logged out successfully" });
}
module.exports = { signUp, logIn, getMe, googleCallback, logout };
