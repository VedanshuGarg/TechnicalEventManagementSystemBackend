const express = require('express');
const Registration = require('../models/Registration');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  try {
    const newReg = new Registration({ ...req.body, userId: req.user.id });
    await newReg.save();
    res.status(201).json(newReg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
