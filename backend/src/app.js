const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Auth Routes
app.use("/api/auth", authRoutes);
module.exports = app;
