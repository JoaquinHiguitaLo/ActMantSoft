const db = require('../config/db');

const Dueno = {
    obtenerTodos: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM duenos ORDER BY creado_en DESC", [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    obtenerPorId: (id) => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM duenos WHERE id = ?", [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },

    crear: ({ cedula, nombre, celular, direccion, correo }) => {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO duenos (cedula, nombre, celular, direccion, correo)
                 VALUES (?, ?, ?, ?, ?)`,
                [cedula, nombre, celular, direccion, correo],
                function (err) {
                    if (err) reject(err);
                    else resolve({ id: this.lastID });
                }
            );
        });
    },

    actualizar: (id, { cedula, nombre, celular, direccion, correo }) => {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE duenos
                 SET cedula = ?, nombre = ?, celular = ?, direccion = ?, correo = ?
                 WHERE id = ?`,
                [cedula, nombre, celular, direccion, correo, id],
                function (err) {
                    if (err) reject(err);
                    else resolve({ changes: this.changes });
                }
            );
        });
    },

    eliminar: (id) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM duenos WHERE id = ?", [id], function (err) {
                if (err) reject(err);
                else resolve({ changes: this.changes });
            });
        });
    }
};

module.exports = Dueno;