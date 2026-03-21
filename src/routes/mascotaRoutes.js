const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController');

router.get('/', mascotaController.todasMascotas);
router.get('/create', mascotaController.getCreateForm);
router.post('/create', mascotaController.createMascota);

router.get('/edit/:id', mascotaController.getEditForm);
router.post('/edit/:id', mascotaController.editMascota);
router.post('/delete/:id', mascotaController.deleteMascota);

module.exports = router;