const express = require('express');
const router = express.Router();
const Membership = require('../models/Membership');
const { verifyToken, checkRole } = require('../middleware/auth');

// Utility to add months to a date
const addMonths = (date, months) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
};

// Add Membership
router.post('/add', verifyToken, checkRole('vendor'), async (req, res) => {
  const { membershipNumber, duration } = req.body;
  if (!membershipNumber || !duration) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const months = duration === '1 year' ? 12 : duration === '2 years' ? 24 : 6;
  const startDate = new Date();
  const endDate = addMonths(startDate, months);

  try {
    const newMembership = new Membership({
      membershipNumber,
      vendorId: req.user.id,
      startDate,
      endDate
    });
    await newMembership.save();
    res.status(201).json({ message: 'Membership added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding membership', error: err.message });
  }
});

// Update Membership
router.put('/update', verifyToken, checkRole('vendor'), async (req, res) => {
  const { membershipNumber, action } = req.body;
  if (!membershipNumber) {
    return res.status(400).json({ message: 'Membership Number is required' });
  }

  try {
    const membership = await Membership.findOne({ membershipNumber });
    if (!membership) return res.status(404).json({ message: 'Membership not found' });

    if (action === 'extend') {
      membership.endDate = addMonths(membership.endDate, 6); // Default 6 months
    } else if (action === 'cancel') {
      membership.status = 'cancelled';
    }

    await membership.save();
    res.json({ message: 'Membership updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating membership', error: err.message });
  }
});

module.exports = router;
