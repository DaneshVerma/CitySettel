const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["accommodation", "food", "gym", "essentials"],
      required: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      coordinates: {
        latitude: { type: Number },
        longitude: { type: Number },
      },
      distance: { type: Number }, // Distance in km
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    amenities: [{ type: String }],
    availability: { type: Boolean, default: true },
    owner: {
      name: { type: String },
      phone: { type: String },
      email: { type: String },
    },
    // Type-specific fields
    accommodationDetails: {
      roomType: { type: String }, // single, shared, 1BHK, 2BHK, etc.
      capacity: { type: Number },
      gender: { type: String, enum: ["male", "female", "any"] },
      meals: { type: Boolean, default: false },
    },
    foodDetails: {
      cuisine: [{ type: String }],
      mealType: [{ type: String }], // breakfast, lunch, dinner
      deliveryAvailable: { type: Boolean, default: false },
    },
    gymDetails: {
      equipment: [{ type: String }],
      trainers: { type: Boolean, default: false },
      timings: { type: String },
    },
    essentialsDetails: {
      category: { type: String },
      serviceType: { type: String },
    },
  },
  { timestamps: true }
);

listingSchema.index({ type: 1, "location.city": 1 });
listingSchema.index({ price: 1 });
listingSchema.index({ rating: -1 });

module.exports = mongoose.model("Listing", listingSchema);
