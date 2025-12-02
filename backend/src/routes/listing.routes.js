const router = require("express").Router();
const {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  getVendorListings,
} = require("../controllers/listing.controller");
const { authUser } = require("../middlewares/auth.Middleware");
const { isVendor } = require("../middlewares/vendor.Middleware");

router.get("/", getListings);
router.get("/vendor/my-listings", authUser, isVendor, getVendorListings);
router.get("/:id", getListing);
router.post("/", authUser, isVendor, createListing);
router.put("/:id", authUser, isVendor, updateListing);
router.delete("/:id", authUser, isVendor, deleteListing);

module.exports = router;
