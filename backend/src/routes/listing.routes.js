const router = require("express").Router();
const {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/listing.controller");
const { authUser } = require("../middlewares/auth.Middleware");

router.get("/", getListings);
router.get("/:id", getListing);
router.post("/", authUser, createListing);
router.put("/:id", authUser, updateListing);
router.delete("/:id", authUser, deleteListing);

module.exports = router;
