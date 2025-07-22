const Report = require('../models/Report');

exports.createReport = async (req, res) => {
  try {
    const report = new Report({ ...req.body, createdBy: req.user.id });
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('createdBy', 'name email');
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: 'Report deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
