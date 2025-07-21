// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const Favorite = require('./models/Favorite');

// Fetch books from Google API
app.get('/api/books', async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching books:', error.message);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Save a favorite book
app.post('/api/favorites', async (req, res) => {
  const { id, title, authors, image } = req.body;

  try {
    const existing = await Favorite.findOne({ bookId: id });
    if (existing) {
      return res.status(400).json({ error: 'Book already favorited' });
    }

    const favorite = new Favorite({ bookId: id, title, authors, image });
    await favorite.save();
    res.json(favorite);
  } catch (error) {
    console.error('Error saving favorite:', error.message);
    res.status(500).json({ error: 'Failed to save favorite' });
  }
});

// Get all favorite books
app.get('/api/favorites', async (req, res) => {
  try {
    const favorites = await Favorite.find().sort({ createdAt: -1 });
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error.message);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// Delete a favorite book
app.delete('/api/favorites/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Favorite.findOneAndDelete({ bookId: id });
    res.json({ message: 'Book removed from favorites' });
  } catch (error) {
    console.error('Error deleting favorite:', error.message);
    res.status(500).json({ error: 'Failed to delete favorite' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on https://week-7-devops-deployment-assignment-kf00.onrender.com/`);
});