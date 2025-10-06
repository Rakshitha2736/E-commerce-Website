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
// Enable CORS only for frontend origin (replace with Vercel URL in production)
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
app.use(cors({ origin: CLIENT_URL }));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydb";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully to:", mongoURI))
.catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
