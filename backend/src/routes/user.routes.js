const router = require("express").Router();
const {
  getProfile,
  updateProfile,
  saveListing,
  unsaveListing,
  getSavedListings,
} = require("../controllers/user.controller");
const { authUser } = require("../middlewares/auth.Middleware");

router.get("/profile", authUser, getProfile);
router.put("/profile", authUser, updateProfile);
router.get("/saved", authUser, getSavedListings);
router.post("/saved", authUser, saveListing);
router.delete("/saved/:listingId", authUser, unsaveListing);

module.exports = router;
