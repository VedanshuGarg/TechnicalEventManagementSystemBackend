const Vendor = require('../models/VendorRequest');
const Cart = require('../models/Cart');
const Guest = require('../models/Guest');
const Order = require('../models/Order');

exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  const { eventId, title, price } = req.body;
  try {
    const cartItem = new Cart({ userId: req.user.id, eventId, title, price });
    await cartItem.save();
    res.status(201).json({ message: 'Item added to cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.user.id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelCart = async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.user.id });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.processPayment = async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.user.id });
    const total = items.reduce((sum, item) => sum + item.price, 0);
    const order = new Order({ userId: req.user.id, items, total, status: "Confirmed" });
    await order.save();
    await Cart.deleteMany({ userId: req.user.id });
    res.json({ message: "Payment successful", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGuests = async (req, res) => {
  try {
    const guests = await Guest.find({ userId: req.user.id });
    res.json(guests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addGuest = async (req, res) => {
  try {
    const guest = new Guest({ ...req.body, userId: req.user.id });
    await guest.save();
    res.status(201).json({ message: "Guest added", guest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateGuest = async (req, res) => {
  try {
    const guest = await Guest.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    res.json(guest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteGuest = async (req, res) => {
  try {
    await Guest.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: "Guest deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrderStatus = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
