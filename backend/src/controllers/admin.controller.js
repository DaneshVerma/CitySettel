const Listing = require("../models/listing.model");
const User = require("../models/user.model");

// Get all pending listings for approval
async function getPendingListings(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const listings = await Listing.find({ approvalStatus: "pending" })
      .populate("vendor", "fullName businessName businessType phone email")
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(skip);

    const total = await Listing.countDocuments({ approvalStatus: "pending" });

    return res.status(200).json({
      message: "Pending listings fetched successfully",
      data: listings,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get pending listings error:", error);
    return res.status(500).json({
      message: "Failed to fetch pending listings",
      error: error.message,
    });
  }
}

// Get all listings (for admin view)
async function getAllListings(req, res) {
  try {
    const {
      status,
      type,
      city,
      search,
      sortBy,
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    if (status) query.approvalStatus = status;
    if (type) query.type = type;
    if (city) query.city = new RegExp(city, "i");
    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ];
    }

    let sort = {};
    if (sortBy === "newest") sort.createdAt = -1;
    else if (sortBy === "oldest") sort.createdAt = 1;
    else sort.createdAt = -1;

    const skip = (page - 1) * limit;
    const listings = await Listing.find(query)
      .populate("vendor", "fullName businessName businessType phone email")
      .sort(sort)
      .limit(Number(limit))
      .skip(skip);

    const total = await Listing.countDocuments(query);

    // Get stats
    const stats = {
      total: await Listing.countDocuments(),
      pending: await Listing.countDocuments({ approvalStatus: "pending" }),
      approved: await Listing.countDocuments({ approvalStatus: "approved" }),
      rejected: await Listing.countDocuments({ approvalStatus: "rejected" }),
    };

    return res.status(200).json({
      message: "Listings fetched successfully",
      data: listings,
      stats,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get all listings error:", error);
    return res.status(500).json({
      message: "Failed to fetch listings",
      error: error.message,
    });
  }
}

// Approve listing
async function approveListing(req, res) {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    listing.approvalStatus = "approved";
    listing.rejectionReason = undefined;
    await listing.save();

    return res.status(200).json({
      message: "Listing approved successfully",
      data: listing,
    });
  } catch (error) {
    console.error("Approve listing error:", error);
    return res.status(500).json({
      message: "Failed to approve listing",
      error: error.message,
    });
  }
}

// Reject listing
async function rejectListing(req, res) {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason || reason.trim() === "") {
      return res.status(400).json({
        message: "Rejection reason is required",
      });
    }

    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    listing.approvalStatus = "rejected";
    listing.rejectionReason = reason;
    await listing.save();

    return res.status(200).json({
      message: "Listing rejected successfully",
      data: listing,
    });
  } catch (error) {
    console.error("Reject listing error:", error);
    return res.status(500).json({
      message: "Failed to reject listing",
      error: error.message,
    });
  }
}

// Get all vendors
async function getAllVendors(req, res) {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = { role: "vendor" };

    if (status) query.verificationStatus = status;

    const skip = (page - 1) * limit;
    const vendors = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(skip);

    const total = await User.countDocuments(query);

    const stats = {
      total: await User.countDocuments({ role: "vendor" }),
      pending: await User.countDocuments({
        role: "vendor",
        verificationStatus: "pending",
      }),
      verified: await User.countDocuments({
        role: "vendor",
        verificationStatus: "verified",
      }),
      rejected: await User.countDocuments({
        role: "vendor",
        verificationStatus: "rejected",
      }),
    };

    return res.status(200).json({
      message: "Vendors fetched successfully",
      data: vendors,
      stats,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get vendors error:", error);
    return res.status(500).json({
      message: "Failed to fetch vendors",
      error: error.message,
    });
  }
}

// Verify vendor
async function verifyVendor(req, res) {
  try {
    const { id } = req.params;

    const vendor = await User.findOne({ _id: id, role: "vendor" });
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    vendor.verificationStatus = "verified";
    await vendor.save();

    return res.status(200).json({
      message: "Vendor verified successfully",
      data: vendor,
    });
  } catch (error) {
    console.error("Verify vendor error:", error);
    return res.status(500).json({
      message: "Failed to verify vendor",
      error: error.message,
    });
  }
}

// Reject vendor
async function rejectVendor(req, res) {
  try {
    const { id } = req.params;

    const vendor = await User.findOne({ _id: id, role: "vendor" });
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    vendor.verificationStatus = "rejected";
    await vendor.save();

    return res.status(200).json({
      message: "Vendor rejected successfully",
      data: vendor,
    });
  } catch (error) {
    console.error("Reject vendor error:", error);
    return res.status(500).json({
      message: "Failed to reject vendor",
      error: error.message,
    });
  }
}

// Get dashboard stats
async function getDashboardStats(req, res) {
  try {
    const stats = {
      listings: {
        total: await Listing.countDocuments(),
        pending: await Listing.countDocuments({ approvalStatus: "pending" }),
        approved: await Listing.countDocuments({ approvalStatus: "approved" }),
        rejected: await Listing.countDocuments({ approvalStatus: "rejected" }),
      },
      vendors: {
        total: await User.countDocuments({ role: "vendor" }),
        pending: await User.countDocuments({
          role: "vendor",
          verificationStatus: "pending",
        }),
        verified: await User.countDocuments({
          role: "vendor",
          verificationStatus: "verified",
        }),
        rejected: await User.countDocuments({
          role: "vendor",
          verificationStatus: "rejected",
        }),
      },
      consumers: {
        total: await User.countDocuments({ role: "consumer" }),
      },
      recentActivity: {
        newListings: await Listing.countDocuments({
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        }),
        newVendors: await User.countDocuments({
          role: "vendor",
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        }),
      },
    };

    return res.status(200).json({
      message: "Dashboard stats fetched successfully",
      data: stats,
    });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    return res.status(500).json({
      message: "Failed to fetch dashboard stats",
      error: error.message,
    });
  }
}

module.exports = {
  getPendingListings,
  getAllListings,
  approveListing,
  rejectListing,
  getAllVendors,
  verifyVendor,
  rejectVendor,
  getDashboardStats,
};
