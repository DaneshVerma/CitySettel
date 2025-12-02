const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const listingRoutes = require("./routes/listing.routes");
const comboRoutes = require("./routes/combo.routes");
const userRoutes = require("./routes/user.routes");
const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Vite default port
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/combos", comboRoutes);
app.use("/api/user", userRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

module.exports = app;
