const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products with optional filters
router.get('/', async (req, res) => {
  try {
    const { minPrice = 0, maxPrice = 100, query = '' } = req.query;
    console.log('Query Params:', req.query); // Log query parameters

    const products = await Product.find({
      price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
      name: { $regex: query, $options: 'i' }, // Case-insensitive search
    });

    console.log('Products Retrieved:', products); // Log fetched products
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message); // Log error details
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
});


// Add a new product (for testing)
router.post('/', async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Debugging: Log the incoming request body

    const { name, price, image } = req.body;

    // Ensure all required fields are provided
    if (!name || !price || !image) {
      return res.status(400).json({ error: 'Name, price, and image are required' });
    }

    const newProduct = new Product({ name, price, image });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error.message); // Log the error message
    res.status(500).json({ error: 'Failed to add product', details: error.message });
  }
});


module.exports = router;
