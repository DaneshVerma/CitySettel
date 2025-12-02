const Combo = require("../models/combo.model");

// Get all combos with filters
async function getCombos(req, res) {
  try {
    const {
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

    if (city) query["location.city"] = new RegExp(city, "i");
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (minRating) query.rating = { $gte: Number(minRating) };
    if (search) {
      query.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ];
    }

    query.availability = true;

    let sort = {};
    if (sortBy === "price-asc") sort.price = 1;
    else if (sortBy === "price-desc") sort.price = -1;
    else if (sortBy === "rating") sort.rating = -1;
    else sort.createdAt = -1;

    const skip = (page - 1) * limit;
    const combos = await Combo.find(query)
      .populate("items.listing")
      .sort(sort)
      .limit(Number(limit))
      .skip(skip);

    const total = await Combo.countDocuments(query);

    return res.status(200).json({
      message: "Combos fetched successfully",
      combos,
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

// Get single combo
async function getCombo(req, res) {
  try {
    const { id } = req.params;
    const combo = await Combo.findById(id).populate("items.listing");

    if (!combo) {
      return res.status(404).json({ message: "Combo not found" });
    }

    return res.status(200).json({
      message: "Combo fetched successfully",
      combo,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Create combo
async function createCombo(req, res) {
  try {
    const comboData = req.body;
    const combo = await Combo.create(comboData);

    return res.status(201).json({
      message: "Combo created successfully",
      combo,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Update combo
async function updateCombo(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const combo = await Combo.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!combo) {
      return res.status(404).json({ message: "Combo not found" });
    }

    return res.status(200).json({
      message: "Combo updated successfully",
      combo,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

// Delete combo
async function deleteCombo(req, res) {
  try {
    const { id } = req.params;
    const combo = await Combo.findByIdAndDelete(id);

    if (!combo) {
      return res.status(404).json({ message: "Combo not found" });
    }

    return res.status(200).json({
      message: "Combo deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  getCombos,
  getCombo,
  createCombo,
  updateCombo,
  deleteCombo,
};
