// This file is used to start the server application
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes (using absolute paths)
const authRoutes = require('./server/routes/authRoutes');
const itemRoutes = require('./server/routes/itemRoutes');
const cartRoutes = require('./server/routes/cartRoutes');
const orderRoutes = require('./server/routes/orderRoutes');

const app = express();

// Middleware
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Serve static files from the React app build directory in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

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