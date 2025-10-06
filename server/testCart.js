const mongoose = require("mongoose");
const Cart = require("./models/Cart");
require("dotenv").config();

async function testCart() {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/mydb";
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected to:", mongoURI);

    // Test creating a cart
    const testCart = new Cart({
      userEmail: "test@example.com",
      items: []
    });

    await testCart.save();
    console.log("Test cart created successfully!");

    // Check if cart exists
    const foundCart = await Cart.findOne({ userEmail: "test@example.com" });
    console.log("Found cart:", foundCart);

    // Clean up test cart
    await Cart.deleteOne({ userEmail: "test@example.com" });
    console.log("Test cart cleaned up");

    console.log("Cart functionality is working!");
    
  } catch (error) {
    console.error("Error testing cart:", error);
  } finally {
    mongoose.connection.close();
  }
}

testCart();
