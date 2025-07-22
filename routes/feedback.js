const express = require('express');
const Feedback = require('../models/Feedback');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  try {
    const newFeedback = new Feedback({ ...req.body, userId: req.user.id });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
