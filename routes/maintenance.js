const express = require('express');
const router = express.Router();
const {
  createMaintenance,
  getAllMaintenances,
  updateMaintenance,
  deleteMaintenance
} = require('../controllers/maintenanceController');
const { verifyToken, checkRole } = require('../middleware/auth');

router.use(verifyToken);
router.use(checkRole('admin'));

router.post('/', createMaintenance);
router.get('/', getAllMaintenances);
router.put('/:id', updateMaintenance);
router.delete('/:id', deleteMaintenance);

module.exports = router;
