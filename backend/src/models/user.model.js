const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    city: { type: String },
    savedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }],
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
