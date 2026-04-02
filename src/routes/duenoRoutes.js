const express = require('express');
const router = express.Router();
const duenoController = require('../controllers/duenoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, duenoController.todosDuenos);
router.get('/create', authMiddleware, duenoController.formCrearDueno);
router.post('/create', authMiddleware, duenoController.crearDueno);

router.get('/edit/:id', authMiddleware, duenoController.formEditarDueno);
router.post('/edit/:id', authMiddleware, duenoController.editarDueno);
router.post('/delete/:id', authMiddleware, duenoController.eliminarDueno);


module.exports = router;