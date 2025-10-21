const { signUp, logIn } = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/signup", signUp);
router.post("/login", logIn);

module.exports = router;