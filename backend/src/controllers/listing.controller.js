const Listing = require("../models/listing.model");

// Get all listings with filters
async function getListings(req, res) {
  try {
    const {
      type,
      city,
      minPrice,
      maxPrice,
      minRating,
      search,
      sortBy,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (type) query.type = type;
    if (city) query["location.city"] = new RegExp(city, "i");
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (minRating) query.rating = { $gte: Number(minRating) };
    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { "location.address": new RegExp(search, "i") },
      ];
    }

    query.availability = true;

    let sort = {};
    if (sortBy === "price-asc") sort.price = 1;
    else if (sortBy === "price-desc") sort.price = -1;
    else if (sortBy === "rating") sort.rating = -1;
    else sort.createdAt = -1;

    const skip = (page - 1) * limit;
    const listings = await Listing.find(query)
      .sort(sort)
      .limit(Number(limit))
      .skip(skip);

    const total = await Listing.countDocuments(query);

    return res.status(200).json({
      message: "Listings fetched successfully",
      listings,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Get single listing
async function getListing(req, res) {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    return res.status(200).json({
      message: "Listing fetched successfully",
      listing,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Create listing (admin/owner)
async function createListing(req, res) {
  try {
    const listingData = req.body;
    const listing = await Listing.create(listingData);

    return res.status(201).json({
      message: "Listing created successfully",
      listing,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Update listing
async function updateListing(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const listing = await Listing.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    return res.status(200).json({
      message: "Listing updated successfully",
      listing,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Delete listing
async function deleteListing(req, res) {
  try {
    const { id } = req.params;
    const listing = await Listing.findByIdAndDelete(id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    return res.status(200).json({
      message: "Listing deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
};
