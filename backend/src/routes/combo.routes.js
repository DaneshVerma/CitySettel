const router = require("express").Router();
const {
  getCombos,
  getCombo,
  createCombo,
  updateCombo,
  deleteCombo,
} = require("../controllers/combo.controller");
const { authUser } = require("../middlewares/auth.Middleware");

router.get("/", getCombos);
router.get("/:id", getCombo);
router.post("/", authUser, createCombo);
router.put("/:id", authUser, updateCombo);
router.delete("/:id", authUser, deleteCombo);

module.exports = router;
