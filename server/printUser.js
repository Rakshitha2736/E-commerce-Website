const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

async function printUser() {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydb';
  await mongoose.connect(mongoURI);
  try {
    const user = await User.findOne({ username: 'Rakshitha_006' }).lean();
    if (!user) {
      console.log('User not found by username: Rakshitha_006');
      // try by name
      const userByName = await User.findOne({ name: 'Rakshitha_006' }).lean();
      if (userByName) {
        console.log('Found by name:', userByName);
      } else {
        console.log('No user found with expected identifiers.');
      }
    } else {
      console.log('Found user:', user);
    }
  } catch (err) {
    console.error('Error fetching user:', err);
  } finally {
    mongoose.connection.close();
  }
}

printUser();
