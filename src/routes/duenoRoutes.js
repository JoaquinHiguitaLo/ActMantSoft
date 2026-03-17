const express = require('express');
const router = express.Router();
const duenoController = require('../controllers/duenoController');

router.get('/', duenoController.todosDuenos);

// formulario
router.get('/create', (req, res) => {
    res.render('duenos/create', {
        title: 'Crear Dueño'
    });
});

// guardar dueño
router.post('/create', duenoController.crearDueno);

module.exports = router;