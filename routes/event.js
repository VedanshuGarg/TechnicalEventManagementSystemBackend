const express = require('express');
const Event = require('../models/Event');
const { verifyToken, checkRole } = require('../middleware/auth');
const router = express.Router();

router.post('/', verifyToken, checkRole('vendor'), async (req, res) => {
  try {
    const newEvent = new Event({ ...req.body, vendorId: req.user.id });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('vendorId', 'name');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
