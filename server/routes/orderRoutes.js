const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create an order (expected body: { userKey, items: [{itemId,name,image,cost,quantity}], total })
router.post('/', async (req, res) => {
  try {
    const { userKey, items, total } = req.body;
    if (!userKey || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Invalid order payload' });
    }

    const order = new Order({ userKey, items, total });
    await order.save();
    res.json({ success: true, order });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Get orders by userKey
router.get('/:userKey', async (req, res) => {
  try {
    const { userKey } = req.params;
    const orders = await Order.find({ userKey }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

module.exports = router;