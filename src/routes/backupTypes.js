const express = require('express');
const router = express.Router();
const backupTypesController = require('../controllers/backupTypesController');

// Определение маршрутов
router.get('/', backupTypesController.getAllBackupType);
router.get('/:id', backupTypesController.getBackupTypeById);
router.post('/', backupTypesController.createBackupType);
router.patch('/:id', backupTypesController.updateBackupType);
router.delete('/:id', backupTypesController.deleteBackupType);

module.exports = router;