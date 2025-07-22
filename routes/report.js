const express = require('express');
const router = express.Router();
const { createReport, getReports, deleteReport } = require('../controllers/reportController');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

router.post('/', createReport);
router.get('/', getReports);
router.delete('/:id', deleteReport);

module.exports = router;
