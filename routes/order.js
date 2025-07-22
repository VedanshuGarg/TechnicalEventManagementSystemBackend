const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { verifyToken } = require('../middleware/auth');

router.get('/status', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
