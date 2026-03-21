const db = require('../config/db');

const Mascota = {
    obtenerDuenos: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM duenos ORDER BY nombre ASC", [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    obtenerTodas: () => {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT m.*, d.nombre AS nombreDueno, d.cedula
                 FROM mascotas m
                 JOIN duenos d ON m.dueno_id = d.id
                 ORDER BY m.creado_en DESC`,
                [],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    },

    obtenerPorId: (id) => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM mascotas WHERE id = ?", [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },

    crear: ({ nombreMasc, raza, color, sexo, edad, dueno_id }) => {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO mascotas (nombreMasc, raza, color, sexo, edad, dueno_id)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [nombreMasc, raza, color, sexo, edad, dueno_id],
                function (err) {
                    if (err) reject(err);
                    else resolve({ id: this.lastID });
                }
            );
        });
    },

    actualizar: (id, { nombreMasc, raza, color, sexo, edad, dueno_id }) => {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE mascotas
                 SET nombreMasc = ?, raza = ?, color = ?, sexo = ?, edad = ?, dueno_id = ?
                 WHERE id = ?`,
                [nombreMasc, raza, color, sexo, edad, dueno_id, id],
                function (err) {
                    if (err) reject(err);
                    else resolve({ changes: this.changes });
                }
            );
        });
    },

    eliminar: (id) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM mascotas WHERE id = ?", [id], function (err) {
                if (err) reject(err);
                else resolve({ changes: this.changes });
            });
        });
    }
};

module.exports = Mascota;