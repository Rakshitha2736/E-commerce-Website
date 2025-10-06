const mongoose = require("mongoose");
require("dotenv").config();

async function checkDatabase() {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/zentro-app";
    console.log("Connecting to:", mongoURI);
    
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
    
    // Check current database
    const dbName = mongoose.connection.db.databaseName;
    console.log("Current database:", dbName);
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections in database:", collections.map(c => c.name));
    
    // Check if cart collection exists
    const cartExists = collections.some(c => c.name === 'carts');
    console.log("Cart collection exists:", cartExists);
    
  } catch (error) {
    console.error("Error checking database:", error);
  } finally {
    mongoose.connection.close();
  }
}

checkDatabase();
