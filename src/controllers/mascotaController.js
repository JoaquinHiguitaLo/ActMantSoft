const db = require('../config/db');

// 🔹 Mostrar formulario
exports.getCreateForm = (req, res) => {
    db.all("SELECT * FROM duenos", [], (err, duenos) => {
        if (err) return res.send(err.message);

        res.render('mascotas/create', { 
            title: 'Crear mascota',
            duenos: duenos });
    });
};

// 🔹 Crear mascota
exports.createMascota = (req, res) => {
    const { nombre, raza, dueno_id } = req.body;

    db.run(
        `INSERT INTO mascotas (nombreMasc, raza, dueno_id)
         VALUES (?, ?, ?)`,
        [nombre, raza, dueno_id],
        function (err) {
            if (err) return res.send(err.message);

            res.redirect('/mascotas/create');
        }
    );
};