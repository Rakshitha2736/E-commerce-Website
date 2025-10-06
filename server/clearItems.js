const mongoose = require("mongoose");
const Item = require("./models/Item");
require("dotenv").config();

async function clearItems() {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/zentro-app";
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");

    // Clear all items
    await Item.deleteMany({});
    console.log("All items cleared successfully!");

  } catch (error) {
    console.error("Error clearing items:", error);
  } finally {
    mongoose.connection.close();
  }
}

clearItems();


