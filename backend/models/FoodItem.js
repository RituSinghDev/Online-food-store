const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  options: [
    {
      half: { type: String, required: false },
      full: { type: String, required: false },
      regular: { type: String, required: false },
      medium: { type: String, required: false },
      large: { type: String, required: false }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('FoodItem', FoodItemSchema); 