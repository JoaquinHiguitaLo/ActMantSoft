const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');

const citasRoutes = require('./routes/citasRoutes');
const duenoRoutes = require('./routes/duenoRoutes');
const mascotaRoutes = require('./routes/mascotaRoutes');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Ruta principal
app.get('/', (req, res) => {
    res.redirect('/citas');
});

// Routes
app.use('/citas', citasRoutes);
app.use('/duenos', duenoRoutes);
app.use('/mascotas', mascotaRoutes);

module.exports = app;