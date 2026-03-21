const Cita = require('../models/citasModel');
const { validarDatosCita } = require('../utils/validators');

// 🔹 Listar citas
exports.getAllcitas = async (req, res) => {
    try {
        const citas = await Cita.obtenerTodas();

        res.render('citas/index', {
            title: 'Panel de citas',
            citas: citas
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 🔹 Formulario crear cita
exports.getCreateForm = async (req, res) => {
    try {
        const mascotas = await Cita.obtenerMascotas();

        res.render('citas/create', {
            title: 'Crear cita',
            mascotas: mascotas,
            errores: [],
            oldData: {}
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 🔹 Crear cita
exports.createcitas = async (req, res) => {
    try {
        const { mascota_id, servicio, fecha, peso, temperatura, diagnostico } = req.body;

        const data = { mascota_id, servicio, fecha, peso, temperatura, diagnostico };
        const errores = validarDatosCita(data);

        if (errores.length > 0) {
            const mascotas = await Cita.obtenerMascotas();

            return res.render('citas/create', {
                title: 'Crear cita',
                mascotas: mascotas,
                errores: errores,
                oldData: data
            });
        }

        await Cita.crear(data);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 🔹 Eliminar cita
exports.deletecitas = async (req, res) => {
    try {
        const id = req.params.id;
        await Cita.eliminar(id);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
};