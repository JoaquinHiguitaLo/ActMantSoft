const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, mascotaController.todasMascotas);
router.get('/create', authMiddleware, mascotaController.getCreateForm);
router.post('/create', authMiddleware, mascotaController.createMascota);

router.get('/edit/:id', authMiddleware, mascotaController.getEditForm);
router.post('/edit/:id', authMiddleware, mascotaController.editMascota);
router.post('/delete/:id', authMiddleware, mascotaController.deleteMascota);

module.exports = router;