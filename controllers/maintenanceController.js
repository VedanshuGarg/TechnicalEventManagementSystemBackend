const Maintenance = require('../models/Maintenance');

exports.createMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.create(req.body);
    res.status(201).json(maintenance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllMaintenances = async (req, res) => {
  try {
    const records = await Maintenance.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMaintenance = async (req, res) => {
  try {
    const updated = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMaintenance = async (req, res) => {
  try {
    await Maintenance.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
