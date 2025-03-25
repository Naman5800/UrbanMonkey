const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');

// Fetch all gallery images
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find().limit(5); // Limit to 5 images
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new gallery image
router.post('/', async (req, res) => {
  try {
    const { imageUrl, description } = req.body; // Destructure the request body

    // Validate required fields
    if (!imageUrl) {
      return res.status(400).json({ message: 'imageUrl is required' });
    }

    // Create a new gallery image document
    const newImage = new Gallery({
      imageUrl,
      description: description || '', // Optional field
    });

    // Save the document to the database
    await newImage.save();

    // Return the saved document
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;