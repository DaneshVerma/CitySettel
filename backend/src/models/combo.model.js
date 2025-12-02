const mongoose = require("mongoose");

const comboSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    discount: { type: Number }, // Percentage
    badge: { type: String }, // "Popular", "Best Value", etc.
    image: { type: String },
    items: [
      {
        listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
        name: { type: String },
        type: { type: String },
      },
    ],
    location: {
      city: { type: String, required: true },
      area: { type: String },
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    availability: { type: Boolean, default: true },
    validTill: { type: Date },
  },
  { timestamps: true }
);

comboSchema.index({ "location.city": 1 });
comboSchema.index({ price: 1 });
comboSchema.index({ rating: -1 });

module.exports = mongoose.model("Combo", comboSchema);
