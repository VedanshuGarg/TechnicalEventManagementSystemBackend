const express = require('express');
const router = express.Router();
const Guest = require('../models/Guest');
const { verifyToken } = require('../middleware/auth');

// Get all guests
router.get('/guests', verifyToken, async (req, res) => {
  try {
    const guests = await Guest.find({ userId: req.user.id });
    res.json(guests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch guests' });
  }
});

// Add guest
router.post('/guests/add', verifyToken, async (req, res) => {
  try {
    const { name, contact, email } = req.body;
    const newGuest = new Guest({ name, contact, email, userId: req.user.id });
    await newGuest.save();
    res.status(201).json(newGuest);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add guest' });
  }
});

// Delete guest
router.delete('/guests/delete/:id', verifyToken, async (req, res) => {
  try {
    await Guest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Guest deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete guest' });
  }
});

module.exports = router;
