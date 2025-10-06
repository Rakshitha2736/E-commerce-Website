const mongoose = require("mongoose");
const Item = require("./models/Item");
require("dotenv").config();

async function addTopItem() {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/zentro-app";
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");

    const topItem = {
      name: "Elegant Summer Top",
      quantity: 4,
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
      cost: 899,
      contactNumber: "+91-9876543211",
      category: "women",
      subcategory: "Top"
    };

    const newItem = new Item(topItem);
    await newItem.save();
    console.log("Added top item:", newItem.name);

  } catch (error) {
    console.error("Error adding top item:", error);
  } finally {
    mongoose.connection.close();
  }
}

addTopItem();


