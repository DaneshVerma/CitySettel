const { signUp, logIn, getMe } = require("../controllers/auth.controller");
const { authUser } = require("../middlewares/auth.Middleware");

const router = require("express").Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/me", authUser, getMe);

module.exports = router;
