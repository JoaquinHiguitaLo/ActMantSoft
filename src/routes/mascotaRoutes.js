const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController');

router.get('/create', mascotaController.getCreateForm);
router.post('/create', mascotaController.createMascota);

module.exports = router;