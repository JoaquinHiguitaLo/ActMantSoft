const Dueno = require('../models/duenoModel');

exports.todosDuenos = async (req, res) => {
    try {
        const duenos = await Dueno.obtenerTodos();

        res.render('duenos/index', {
            title: 'Lista de Dueños',
            duenos: duenos
        });
    } catch (error) {
        res.send(error.message);
    }
};

exports.formCrearDueno = (req, res) => {
    res.render('duenos/create', {
        title: 'Crear Dueño'
    });
};

// 🔹 Crear dueño
exports.crearDueno = async (req, res) => {
    try {
        const { cedula, nombre, celular, direccion, correo } = req.body;

        await Dueno.crear({ cedula, nombre, celular, direccion, correo });

        res.redirect('/duenos');
    } catch (error) {

        if (error.message.includes('UNIQUE constraint failed: duenos.cedula')) {
            return res.render('duenos/create', {
                title: 'Crear Dueño',
                error: 'Ya existe un dueño registrado con esa cédula.'
            });
        }

        res.send(error.message);
    }
};

exports.formEditarDueno = async (req, res) => {
    try {
        const dueno = await Dueno.obtenerPorId(req.params.id);

        res.render('duenos/edit', {
            title: 'Editar Dueño',
            dueno,
            error: null
        });
    } catch (error) {
        res.send(error.message);
    }
};

exports.editarDueno = async (req, res) => {
    try {
        const { cedula, nombre, celular, direccion, correo } = req.body;

        await Dueno.actualizar(req.params.id, {
            cedula,
            nombre,
            celular,
            direccion,
            correo
        });

        res.redirect('/duenos');
    } catch (error) {
        const dueno = await Dueno.obtenerPorId(req.params.id);

        if (error.message.includes('UNIQUE constraint failed: duenos.cedula')) {
            return res.render('duenos/edit', {
                title: 'Editar Dueño',
                dueno,
                error: 'Ya existe un dueño registrado con esa cédula.'
            });
        }

        res.send(error.message);
    }
};

exports.eliminarDueno = async (req, res) => {
    try {
        await Dueno.eliminar(req.params.id);
        res.redirect('/duenos');
    } catch (error) {
        res.send(error.message);
    }
};