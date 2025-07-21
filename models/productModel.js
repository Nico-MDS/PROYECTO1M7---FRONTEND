// models/productModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  programType: {
    type: String,
    required: true,
    enum: ['basic', 'standard', 'premium'],
    lowercase: true
  },
  price: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
