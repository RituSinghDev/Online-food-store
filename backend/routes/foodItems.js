const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');
const { protect } = require('../middleware/auth');

// @route   GET /api/food-items
// @desc    Get all food items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const foodItems = await FoodItem.find({});
    res.json(foodItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/food-items/:id
// @desc    Get food item by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id);
    
    if (foodItem) {
      res.json(foodItem);
    } else {
      res.status(404).json({ message: 'Food item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/food-items/category/:category
// @desc    Get food items by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const foodItems = await FoodItem.find({ category: req.params.category });
    res.json(foodItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/food-items
// @desc    Create a new food item (Admin only)
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
  try {
    const { name, description, category, price, image, options } = req.body;
    
    // Check if user is admin - This would need admin middleware in a production app
    
    const foodItem = new FoodItem({
      name,
      description,
      category,
      price,
      image,
      options
    });
    
    const createdFoodItem = await foodItem.save();
    res.status(201).json(createdFoodItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router; 