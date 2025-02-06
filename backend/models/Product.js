const mongoose = require('mongoose');

// Define the schema for a product
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

// Export the Product model
module.exports = mongoose.model('Product', productSchema);
