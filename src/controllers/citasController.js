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
        const { mascota_id, servicio, fecha, peso, temperatura, diagnostico, medicina_recetada } = req.body;

        const data = { mascota_id, servicio, fecha, peso, temperatura, diagnostico, medicina_recetada };
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
        res.redirect('/citas');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 🔹 Formulario editar datos médicos
exports.getEditMedicalForm = async (req, res) => {
    try {
        const cita = await Cita.obtenerPorId(req.params.id);

        if (!cita) {
            return res.status(404).send('Cita no encontrada.');
        }

        res.render('citas/editMedical', {
            title: 'Editar Evolución Médica',
            cita: cita,
            errores: []
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 🔹 Guardar edición de datos médicos
exports.updateMedicalData = async (req, res) => {
    try {
        const { peso, temperatura, diagnostico, medicina_recetada } = req.body;
        const id = req.params.id;

        const errores = [];

        if (peso === undefined || peso === '') {
            errores.push('El peso es obligatorio.');
        } else if (Number(peso) <= 0) {
            errores.push('El peso debe ser mayor que cero.');
        }

        if (temperatura === undefined || temperatura === '') {
            errores.push('La temperatura es obligatoria.');
        } else if (Number(temperatura) < 30 || Number(temperatura) > 45) {
            errores.push('La temperatura debe estar entre 30°C y 45°C.');
        }

        if (!diagnostico || diagnostico.trim() === '') {
            errores.push('El diagnóstico es obligatorio.');
        }

        if (!medicina_recetada || medicina_recetada.trim() === '') {
            errores.push('La medicina recetada es obligatoria.');
        }

        if (errores.length > 0) {
            const cita = await Cita.obtenerPorId(id);

            return res.render('citas/editMedical', {
                title: 'Editar Evolución Médica',
                cita: {
                    ...cita,
                    peso,
                    temperatura,
                    diagnostico,
                    medicina_recetada
                },
                errores: errores
            });
        }

        await Cita.actualizarCamposMedicos(id, {
            peso,
            temperatura,
            diagnostico,
            medicina_recetada
        });
        res.redirect('/citas');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 🔹 Eliminar cita
exports.deletecitas = async (req, res) => {
    try {
        const id = req.params.id;
        await Cita.eliminar(id);
        res.redirect('/citas');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 🔹 Historial clínico por mascota (Timeline)
exports.verHistorialClinico = async (req, res) => {
    try {
        const mascotaId = req.params.mascotaId;

        const historial = await Cita.obtenerHistorialPorMascota(mascotaId);

        if (!historial || historial.length === 0) {
            return res.render('citas/historial', {
                title: 'Historial Clínico',
                historial: [],
                mascota: null
            });
        }

        res.render('citas/historial', {
            title: 'Historial Clínico',
            historial: historial,
            mascota: historial[0]
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
};