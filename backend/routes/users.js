const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const { verifyClerkToken } = require('../middleware/auth');

// Sync Clerk user with MongoDB
router.post('/sync', async (req, res) => {
  try {
    const { clerkId, email, firstName, lastName } = req.body;
    
    // Find user by clerkId or create if doesn't exist
    let user = await User.findOne({ clerkId });
    
    if (!user) {
      user = new User({
        clerkId,
        email,
        firstName,
        lastName,
        cart: []
      });
      await user.save();
      return res.status(201).json({ message: 'User created successfully', userId: user._id });
    }
    
    // Update user information if it exists
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();
    
    res.status(200).json({ message: 'User synced successfully', userId: user._id });
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({ error: 'Failed to sync user', details: error.message });
  }
});

// Get user cart - Protected route
router.get('/cart', verifyClerkToken, async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.user.id });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json(user.cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart', details: error.message });
  }
});

// Add item to cart - Protected route
router.post('/cart', verifyClerkToken, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    // Find the product to get its details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const user = await User.findOne({ clerkId: req.user.id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if this product is already in the cart
    const existingItemIndex = user.cart.findIndex(
      item => item.productId.toString() === productId
    );
    
    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      user.cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      user.cart.push({
        productId,
        quantity,
        price: product.price,
        name: product.name,
        image: product.image
      });
    }
    
    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart', details: error.message });
  }
});

// Update cart item quantity - Protected route
router.put('/cart/:productId', verifyClerkToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }
    
    const user = await User.findOne({ clerkId: req.user.id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const itemIndex = user.cart.findIndex(
      item => item.productId.toString() === productId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    user.cart[itemIndex].quantity = quantity;
    await user.save();
    
    res.status(200).json(user.cart);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Failed to update cart', details: error.message });
  }
});

// Remove item from cart - Protected route
router.delete('/cart/:productId', verifyClerkToken, async (req, res) => {
  try {
    const { productId } = req.params;
    
    const user = await User.findOne({ clerkId: req.user.id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();
    
    res.status(200).json(user.cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart', details: error.message });
  }
});

// Clear cart - Protected route
router.delete('/cart', verifyClerkToken, async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.user.id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    user.cart = [];
    await user.save();
    
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Failed to clear cart', details: error.message });
  }
});

module.exports = router;