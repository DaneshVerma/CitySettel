const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
    combo: { type: mongoose.Schema.Types.ObjectId, ref: "Combo" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    helpful: { type: Number, default: 0 },
  },
  { timestamps: true }
);

reviewSchema.index({ listing: 1 });
reviewSchema.index({ combo: 1 });
reviewSchema.index({ user: 1 });

module.exports = mongoose.model("Review", reviewSchema);
