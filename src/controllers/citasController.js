const db = require('../config/db');

// 🔹 Listar citas
exports.getAllcitas = (req, res) => {
    db.all(`
        SELECT c.id, c.servicio, c.fecha, c.estado,
               m.nombreMasc AS mascota_nombre,
               d.nombre AS dueno_nombre
        FROM citas c
        JOIN mascotas m ON c.mascota_id = m.id
        JOIN duenos d ON m.dueno_id = d.id
        ORDER BY c.fecha DESC
    `, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);

        res.render('citas/index', {
            title: 'Panel de citas',
            citas: rows
        });
    }); // ✅ ESTE PARÉNTESIS FALTABA
};

// 🔹 Formulario crear cita
exports.getCreateForm = (req, res) => {
    db.all("SELECT * FROM mascotas", [], (err, mascotas) => {
        if (err) return res.send(err.message);

        res.render('citas/create', { 
            title: 'Crear cita',
            mascotas : mascotas
        });
    });
};

// 🔹 Crear cita
exports.createcitas = (req, res) => {
    const { mascota_id, servicio, fecha } = req.body;

    db.run(
        `INSERT INTO citas (mascota_id, servicio, fecha)
         VALUES (?, ?, ?)`,
        [mascota_id, servicio, fecha],
        function (err) {
            if (err) return res.status(500).send(err.message);

            res.redirect('/');
        }
    );
};

// 🔹 Eliminar cita
exports.deletecitas = (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM citas WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).send(err.message);

        res.redirect('/');
    });
};