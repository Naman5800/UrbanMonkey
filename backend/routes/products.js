const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products with optional filters
router.get('/', async (req, res) => {
  try {
    const { minPrice = 0, maxPrice = 100, query = '', category, minRating } = req.query;
    console.log('Query Params:', req.query);

    const filter = {
      price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
    };
    if (query) filter.name = { $regex: query, $options: 'i' };
    if (category) filter.category = category;
    if (minRating) filter.rating = { $gte: Number(minRating) };

    const products = await Product.find(filter);
    console.log('Products Retrieved:', products);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
});

// GET a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ error: 'Failed to fetch product', details: error.message });
  }
});

// POST a new product
router.post('/', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { name, price, image, description, category, features, compatibility, rating, inStock } = req.body;

    if (!name || !price || !image || !description || !category) {
      return res.status(400).json({ error: 'Name, price, image, description, and category are required' });
    }

    const newProduct = new Product({
      name,
      price,
      image,
      description,
      category,
      features: features || [],
      compatibility: compatibility || [],
      rating: rating || 0,
      inStock: inStock !== undefined ? inStock : true,
    });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).json({ error: 'Failed to add product', details: error.message });
  }
});

// PUT (update) a product by ID
router.put('/:id', async (req, res) => {
  try {
    console.log('Update Request Body:', req.body);
    const { name, price, image, description, category, features, compatibility, rating, inStock } = req.body;

    if (!name || !price || !image || !description || !category) {
      return res.status(400).json({ error: 'Name, price, image, description, and category are required' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        image,
        description,
        category,
        features: features || [],
        compatibility: compatibility || [],
        rating: rating || 0,
        inStock: inStock !== undefined ? inStock : true,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ error: 'Failed to update product', details: error.message });
  }
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ error: 'Failed to delete product', details: error.message });
  }
});

module.exports = router;