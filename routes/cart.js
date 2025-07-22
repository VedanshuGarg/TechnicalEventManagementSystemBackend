const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { verifyToken } = require('../middleware/auth');

router.post('/add', verifyToken, async (req, res) => {
  const { eventId, title, price } = req.body;
  try {
    const cartItem = new Cart({ userId: req.user.id, eventId, title, price });
    await cartItem.save();
    res.status(201).json({ message: 'Item added to cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.user.id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/cancel', verifyToken, async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.user.id });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
