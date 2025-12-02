const router = require("express").Router();
const {
  getPendingListings,
  getAllListings,
  approveListing,
  rejectListing,
  getAllVendors,
  verifyVendor,
  rejectVendor,
  getDashboardStats,
} = require("../controllers/admin.controller");
const { authUser } = require("../middlewares/auth.Middleware");
const { isAdmin } = require("../middlewares/admin.middleware");

// All routes require admin authentication
router.use(authUser, isAdmin);

// Dashboard stats
router.get("/stats", getDashboardStats);

// Listing management
router.get("/listings", getAllListings);
router.get("/listings/pending", getPendingListings);
router.put("/listings/:id/approve", approveListing);
router.put("/listings/:id/reject", rejectListing);

// Vendor management
router.get("/vendors", getAllVendors);
router.put("/vendors/:id/verify", verifyVendor);
router.put("/vendors/:id/reject", rejectVendor);

module.exports = router;
