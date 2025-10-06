const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/", itemRoutes);
app.use("/", cartRoutes);
app.use("/", orderRoutes);

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/mydb";

mongoose.connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully to:", mongoURI);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
