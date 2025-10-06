const mongoose = require('mongoose');
require('dotenv').config();

async function listOrders() {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';
  await mongoose.connect(mongoURI);
  console.log('Connected to', mongoURI);
  try {
    const Order = require('./models/Order');
    const orders = await Order.find({}).lean();
    console.log(`Found ${orders.length} orders`);
    orders.forEach(o => {
      console.log('--- Order', o._id.toString());
      console.log(' userKey:', o.userKey);
      console.log(' total:', o.total);
      console.log(' createdAt:', o.createdAt);
      console.log(' items:');
      o.items.forEach(it => console.log('   -', it.name, 'x', it.quantity, '₹'+it.cost, 'image:', it.image));
    });
  } catch (err) {
    console.error('Error listing orders:', err);
  } finally {
    mongoose.connection.close();
  }
}

listOrders();
