const db = require('../config/db');

const Cita = {
    obtenerTodas: () => {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT c.id, c.servicio, c.fecha, c.estado,
                        c.peso, c.temperatura, c.diagnostico,
                        m.nombreMasc AS mascota_nombre,
                        d.nombre AS dueno_nombre
                 FROM citas c
                 JOIN mascotas m ON c.mascota_id = m.id
                 JOIN duenos d ON m.dueno_id = d.id
                 ORDER BY c.fecha DESC`,
                [],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    },

    obtenerMascotas: () => {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT m.*, d.nombre AS dueno_nombre
                 FROM mascotas m
                 JOIN duenos d ON m.dueno_id = d.id
                 ORDER BY m.nombreMasc ASC`,
                [],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    },

    crear: ({ mascota_id, servicio, fecha, peso, temperatura, diagnostico }) => {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO citas (mascota_id, servicio, fecha, peso, temperatura, diagnostico)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [mascota_id, servicio, fecha, peso || null, temperatura || null, diagnostico || null],
                function (err) {
                    if (err) reject(err);
                    else resolve({ id: this.lastID });
                }
            );
        });
    },

    eliminar: (id) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM citas WHERE id = ?", [id], function (err) {
                if (err) reject(err);
                else resolve({ changes: this.changes });
            });
        });
    }
};

module.exports = Cita;