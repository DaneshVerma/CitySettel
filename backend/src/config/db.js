const mongoose = require("mongoose");
const { dbUrl } = require("./environments/config");

async function connectDB() {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
}
module.exports = connectDB;
