const Mascota = require('../models/mascotaModel');

exports.todasMascotas = async (req, res) => {
    try {
        const mascotas = await Mascota.obtenerTodas();

        res.render('mascotas/index', {
            title: 'Lista de Mascotas',
            mascotas
        });
    } catch (error) {
        res.send(error.message);
    }
};

exports.getCreateForm = async (req, res) => {
    try {
        const duenos = await Mascota.obtenerDuenos();

        res.render('mascotas/create', {
            title: 'Crear mascota',
            duenos
        });
    } catch (error) {
        res.send(error.message);
    }
};

exports.createMascota = async (req, res) => {
    try {
        const { nombreMasc, raza, color, sexo, edad, dueno_id } = req.body;

        await Mascota.crear({
            nombreMasc,
            raza,
            color,
            sexo,
            edad,
            dueno_id
        });

        res.redirect('/mascotas');
    } catch (error) {
        res.send(error.message);
    }
};

exports.getEditForm = async (req, res) => {
    try {
        const mascota = await Mascota.obtenerPorId(req.params.id);
        const duenos = await Mascota.obtenerDuenos();

        res.render('mascotas/edit', {
            title: 'Editar mascota',
            mascota,
            duenos
        });
    } catch (error) {
        res.send(error.message);
    }
};

exports.editMascota = async (req, res) => {
    try {
        const { nombreMasc, raza, color, sexo, edad, dueno_id } = req.body;

        await Mascota.actualizar(req.params.id, {
            nombreMasc,
            raza,
            color,
            sexo,
            edad,
            dueno_id
        });

        res.redirect('/mascotas');
    } catch (error) {
        res.send(error.message);
    }
};

exports.deleteMascota = async (req, res) => {
    try {
        await Mascota.eliminar(req.params.id);
        res.redirect('/mascotas');
    } catch (error) {
        res.send(error.message);
    }
};