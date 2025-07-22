const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const { verifyToken, checkRole } = require('../middleware/auth');

// Create transaction (user)
router.post('/', verifyToken, async (req, res) => {
  try {
    const transaction = new Transaction({ ...req.body, userId: req.user.id });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all transactions (admin)
router.get('/', verifyToken, checkRole('admin'), async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('userId eventId');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
