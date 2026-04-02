const express = require('express');
const router = express.Router();

const citasController = require('../controllers/citasController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleVeterinario = require('../middlewares/roleMiddleware');

router.get('/', authMiddleware, citasController.getAllcitas);

router.get('/create', authMiddleware, citasController.getCreateForm);
router.post('/create', authMiddleware, citasController.createcitas);

router.get('/edit-medical/:id', authMiddleware, roleVeterinario, citasController.getEditMedicalForm);
router.post('/edit-medical/:id', authMiddleware, roleVeterinario, citasController.updateMedicalData);

router.post('/delete/:id', authMiddleware, citasController.deletecitas);

module.exports = router;