const db = require('../config/db');

const Cita = {
    obtenerTodas: () => {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT c.id, c.mascota_id, c.servicio, c.fecha, c.estado,
                 c.peso, c.temperatura, c.diagnostico, c.medicina_recetada,
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

    obtenerPorId: (id) => {
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT c.*, 
                        m.nombreMasc AS mascota_nombre,
                        d.nombre AS dueno_nombre
                 FROM citas c
                 JOIN mascotas m ON c.mascota_id = m.id
                 JOIN duenos d ON m.dueno_id = d.id
                 WHERE c.id = ?`,
                [id],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });
    },

    crear: ({ mascota_id, servicio, fecha, peso, temperatura, diagnostico, medicina_recetada }) => {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO citas (
                    mascota_id, servicio, fecha, peso, temperatura, diagnostico, medicina_recetada
                 ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    mascota_id,
                    servicio,
                    fecha,
                    peso || null,
                    temperatura || null,
                    diagnostico || null,
                    medicina_recetada || null
                ],
                function (err) {
                    if (err) reject(err);
                    else resolve({ id: this.lastID });
                }
            );
        });
    },

    actualizarCamposMedicos: (id, { peso, temperatura, diagnostico, medicina_recetada }) => {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE citas
                 SET peso = ?, temperatura = ?, diagnostico = ?, medicina_recetada = ?
                 WHERE id = ?`,
                [
                    peso || null,
                    temperatura || null,
                    diagnostico || null,
                    medicina_recetada || null,
                    id
                ],
                function (err) {
                    if (err) reject(err);
                    else resolve({ changes: this.changes });
                }
            );
        });
    },

    obtenerHistorialPorMascota: (mascotaId) => {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT c.id, c.fecha, c.servicio, c.estado,
                        c.peso, c.temperatura, c.diagnostico, c.medicina_recetada,
                        m.nombreMasc AS mascota_nombre,
                        m.raza, m.color, m.sexo, m.edad,
                        d.nombre AS dueno_nombre
                 FROM citas c
                 JOIN mascotas m ON c.mascota_id = m.id
                 JOIN duenos d ON m.dueno_id = d.id
                 WHERE c.mascota_id = ?
                 ORDER BY c.fecha ASC`,
                [mascotaId],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
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