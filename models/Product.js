const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter a product name'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter a product price'],
  },
  description: {
    type: String,
    required: [true, 'Please enter a product description'],
  },
  image: {
    type: String,
    required: [true, 'Please upload a product image'],
  },

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
