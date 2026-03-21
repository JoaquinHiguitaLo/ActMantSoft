const express = require('express');
const router = express.Router();
const duenoController = require('../controllers/duenoController');

router.get('/', duenoController.todosDuenos);
router.get('/create', duenoController.formCrearDueno);
router.post('/create', duenoController.crearDueno);

router.get('/edit/:id', duenoController.formEditarDueno);
router.post('/edit/:id', duenoController.editarDueno);
router.post('/delete/:id', duenoController.eliminarDueno);

module.exports = router;