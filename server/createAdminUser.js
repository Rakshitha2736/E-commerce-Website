const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

async function createAdminUser() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/zentro-app";
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");

    // Check if admin user already exists (by username)
    const existingAdmin = await User.findOne({ username: "Rakshitha_006" });
    
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // Create admin user
    const adminUser = new User({
      username: "Rakshitha_006",
      name: "Rakshitha",
      email: "rakshitha160306@gmail.com",
      phone: "1234567890",
      password: "Raks@06"
    });

    await adminUser.save();
    console.log("Admin user created successfully");
    
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    mongoose.connection.close();
  }
}

createAdminUser();
