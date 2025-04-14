require('dotenv').config();
const mongoose = require('mongoose');
const { users, foodItems } = require('./data/sampleData');
const User = require('./models/User');
const FoodItem = require('./models/FoodItem');
const Order = require('./models/Order');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch((err) => console.error('MongoDB connection error:', err));

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await Order.deleteMany();
    await User.deleteMany();
    await FoodItem.deleteMany();

    // Create users
    const createdUsers = await User.insertMany(users);
    console.log('Users data imported!');

    // Create food items
    const sampleFoodItems = foodItems;
    await FoodItem.insertMany(sampleFoodItems);
    console.log('Food items data imported!');

    console.log('Data Import Success!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Destroy data
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await FoodItem.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run appropriate function based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 