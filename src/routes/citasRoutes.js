const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');

router.get('/', citasController.getAllcitas);
router.get('/create', citasController.getCreateForm);
router.post('/create', citasController.createcitas);
router.post('/delete/:id', citasController.deletecitas);

module.exports = router;