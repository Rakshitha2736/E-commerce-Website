// routes/itemRoutes.js
const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// Test route to verify server is working
router.get("/test", (req, res) => {
  res.json({ message: "Item routes are working!" });
});

// Get all items
router.get("/items", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items" });
  }
});

// Create new item
router.post("/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: "Error creating item" });
  }
});

// Update item quantity
router.put("/items/:id", async (req, res) => {
  console.log(`PUT request received for item ${req.params.id}`);
  console.log("Request body:", req.body);
  
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    console.log(`Updating item ${id} to quantity ${quantity}`);
    
    if (quantity < 0) {
      return res.status(400).json({ 
        success: false,
        message: "Quantity cannot be negative" 
      });
    }
    
    const updatedItem = await Item.findByIdAndUpdate(
      id, 
      { quantity }, 
      { new: true, runValidators: true }
    );
    
    if (!updatedItem) {
      console.log(`Item ${id} not found`);
      return res.status(404).json({ 
        success: false,
        message: "Item not found" 
      });
    }
    
    console.log(`Item ${id} updated successfully to quantity ${quantity}`);
    res.json({
      success: true,
      message: "Quantity updated successfully",
      item: updatedItem
    });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ 
      success: false,
      message: "Error updating item" 
    });
  }
});

module.exports = router;
