const mongoose = require('mongoose');

// Define the schema for a product
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  features: [{ type: String }],
  compatibility: [{ type: String }],
  rating: { type: Number, default: 0 },
  reviews: [
    {
      user: { type: String },
      comment: { type: String },
      rating: { type: Number },
      date: { type: Date, default: Date.now }
    }
  ],
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Export the Product model
module.exports = mongoose.model('Product', productSchema);