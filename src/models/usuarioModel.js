const db = require('../config/db');

const Usuario = {
    obtenerPorCorreo: (correo) => {
        return new Promise((resolve, reject) => {
            db.get(
                "SELECT * FROM usuarios WHERE correo = ?",
                [correo],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });
    },

    obtenerPorId: (id) => {
        return new Promise((resolve, reject) => {
            db.get(
                "SELECT * FROM usuarios WHERE id = ?",
                [id],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });
    },

    crear: ({ nombre, correo, password, rol }) => {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO usuarios (nombre, correo, password, rol)
                 VALUES (?, ?, ?, ?)`,
                [nombre, correo, password, rol],
                function (err) {
                    if (err) reject(err);
                    else resolve({ id: this.lastID });
                }
            );
        });
    }
};

module.exports = Usuario;