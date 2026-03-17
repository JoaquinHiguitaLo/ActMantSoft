const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {

    // 1. Tabla dueños
    db.run(`CREATE TABLE duenos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cedula INTEGER NOT NULL UNIQUE,
        nombre TEXT NOT NULL,
        celular TEXT NOT NULL,
        direccion TEXT NOT NULL,
        correo TEXT,
        creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // 2. Tabla mascotas
    db.run(`CREATE TABLE mascotas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombreMasc TEXT NOT NULL,
        raza TEXT,
        dueno_id INTEGER NOT NULL,
        creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (dueno_id) REFERENCES duenos(id)
    )`);

    // 3. Tabla citas 
    db.run(`CREATE TABLE citas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mascota_id INTEGER NOT NULL,
        servicio TEXT NOT NULL,
        fecha TEXT NOT NULL,
        estado TEXT DEFAULT 'Programada',
        creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (mascota_id) REFERENCES mascotas(id)
    )`);

});

module.exports = db;