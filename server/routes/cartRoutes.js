const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Item = require("../models/Item");

// Get user's cart
router.get("/cart/:userEmail", async (req, res) => {
  try {
    const { userEmail } = req.params;
    let cart = await Cart.findOne({ userEmail });
    
    if (!cart) {
      cart = new Cart({ userEmail, items: [] });
      await cart.save();
    }
    
    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Error fetching cart" });
  }
});

// Add item to cart
router.post("/cart/add", async (req, res) => {
  try {
    const { userEmail, item } = req.body;
    
    // Check if item exists and has stock
    const dbItem = await Item.findById(item._id);
    if (!dbItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    if (dbItem.quantity === 0) {
      return res.status(400).json({ message: "Item is out of stock" });
    }
    
    let cart = await Cart.findOne({ userEmail });
    if (!cart) {
      cart = new Cart({ userEmail, items: [] });
    }
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      cartItem => cartItem.itemId.toString() === item._id
    );
    
    if (existingItemIndex !== -1) {
      // Update quantity of existing item
      cart.items[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      cart.items.push({
        itemId: item._id,
        name: item.name,
        image: item.image,
        cost: item.cost,
        category: item.category,
        subcategory: item.subcategory,
        contactNumber: item.contactNumber,
        quantity: 1
      });
    }
    
    await cart.save();
    const updatedCart = await Cart.findById(cart._id);
    
    res.json({
      success: true,
      message: "Item added to cart successfully",
      cart: updatedCart
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Error adding item to cart" });
  }
});

// Update cart item quantity
router.put("/cart/update", async (req, res) => {
  try {
    const { userEmail, itemId, quantity } = req.body;
    
    if (quantity <= 0) {
      // Remove item from cart
      await Cart.updateOne(
        { userEmail },
        { $pull: { items: { itemId } } }
      );
    } else {
      // Update quantity
      await Cart.updateOne(
        { userEmail, "items.itemId": itemId },
        { $set: { "items.$.quantity": quantity } }
      );
    }
    
    const updatedCart = await Cart.findOne({ userEmail });
    res.json({
      success: true,
      message: "Cart updated successfully",
      cart: updatedCart
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Error updating cart" });
  }
});

// Remove item from cart
router.delete("/cart/remove", async (req, res) => {
  try {
    const { userEmail, itemId } = req.body;
    
    await Cart.updateOne(
      { userEmail },
      { $pull: { items: { itemId } } }
    );
    
    const updatedCart = await Cart.findOne({ userEmail });
    res.json({
      success: true,
      message: "Item removed from cart successfully",
      cart: updatedCart
    });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Error removing item from cart" });
  }
});

// Clear user's cart
router.delete("/cart/clear/:userEmail", async (req, res) => {
  try {
    const { userEmail } = req.params;
    
    await Cart.updateOne(
      { userEmail },
      { $set: { items: [] } }
    );
    
    res.json({
      success: true,
      message: "Cart cleared successfully"
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Error clearing cart" });
  }
});

module.exports = router;
