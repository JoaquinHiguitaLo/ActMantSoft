const db = require('../config/db');

exports.todosDuenos = (req, res) => {
    db.all("SELECT * FROM duenos ORDER BY creado_en DESC", [], (err, rows) => {
        if (err) return res.send(err.message);

        res.render('duenos/index', {
            title: 'Lista de Dueños',
            duenos: rows
        });
    });
};

// 🔹 Crear dueño
exports.crearDueno = (req, res) => {
    const { cedula, nombre, celular, direccion, correo } = req.body;

    db.run(
        `INSERT INTO duenos (cedula, nombre, celular, direccion, correo)
         VALUES (?, ?, ?, ?, ?)`,
        [cedula, nombre, celular, direccion, correo],
        function (err) {
            if (err) return res.send(err.message);

            //Redirige al panel principal (citas)
            res.redirect('/');
        }
    );
};