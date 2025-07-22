const Item = require("../models/Item");
const VendorRequest = require("../models/VendorRequest");

const express = require("express");
const router = express.Router();

// Add item
router.post("/add-item", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to add item" });
  }
});

// Get all vendor items
router.get("/items/:vendorId", async (req, res) => {
  try {
    const items = await Item.find({ vendorId: req.params.vendorId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Delete item
router.delete("/delete-item/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

// Submit vendor request
router.post("/request", async (req, res) => {
  try {
    const request = new VendorRequest(req.body);
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit request" });
  }
});

// Get user requests
router.get("/user-requests/:vendorId", async (req, res) => {
  try {
    // Example: Fetch requests from users to vendor
    const requests = await VendorRequest.find({ vendorId: req.params.vendorId });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

module.exports = router;
