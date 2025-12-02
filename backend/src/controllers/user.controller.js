const User = require("../models/user.model");
const Listing = require("../models/listing.model");

// Get user profile
async function getProfile(req, res) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("savedItems");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        city: user.city,
        savedItems: user.savedItems,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Update user profile
async function updateProfile(req, res) {
  try {
    const userId = req.user._id;
    const { fullName, phone, city } = req.body;

    const updates = {};
    if (fullName) updates.fullName = fullName;
    if (phone) updates.phone = phone;
    if (city) updates.city = city;

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        city: user.city,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Save listing
async function saveListing(req, res) {
  try {
    const userId = req.user._id;
    const { listingId } = req.body;

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const user = await User.findById(userId);
    if (user.savedItems.includes(listingId)) {
      return res.status(400).json({ message: "Listing already saved" });
    }

    user.savedItems.push(listingId);
    await user.save();

    return res.status(200).json({
      message: "Listing saved successfully",
      savedItems: user.savedItems,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Unsave listing
async function unsaveListing(req, res) {
  try {
    const userId = req.user._id;
    const { listingId } = req.params;

    const user = await User.findById(userId);
    user.savedItems = user.savedItems.filter(
      (id) => id.toString() !== listingId
    );
    await user.save();

    return res.status(200).json({
      message: "Listing removed from saved",
      savedItems: user.savedItems,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Get saved listings
async function getSavedListings(req, res) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("savedItems");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Saved listings fetched successfully",
      savedItems: user.savedItems,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  getProfile,
  updateProfile,
  saveListing,
  unsaveListing,
  getSavedListings,
};
