const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database.sqlite'); // Guarda la base en un archivo real
const db = new sqlite3.Database(dbPath);

db.serialize(() => { // instrucción SQL - Esto hace que se ejecuten en orden
    db.run("PRAGMA foreign_keys = ON"); // Esto activa foreign keys.

    // 1. Tabla dueños
    db.run(`CREATE TABLE IF NOT EXISTS duenos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cedula TEXT NOT NULL UNIQUE,
        nombre TEXT NOT NULL,
        celular TEXT NOT NULL,
        direccion TEXT NOT NULL,
        correo TEXT,
        creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // 2. Tabla mascotas
    db.run(`CREATE TABLE IF NOT EXISTS mascotas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombreMasc TEXT NOT NULL,
        raza TEXT NOT NULL,
        color TEXT NOT NULL,
        sexo TEXT NOT NULL,
        edad TEXT NOT NULL,
        dueno_id INTEGER NOT NULL,
        creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (dueno_id) REFERENCES duenos(id) ON DELETE CASCADE
    )`);

    // 3. Tabla citas
    db.run(`CREATE TABLE IF NOT EXISTS citas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mascota_id INTEGER NOT NULL,
        servicio TEXT NOT NULL,
        fecha TEXT NOT NULL,
        estado TEXT DEFAULT 'Programada',
        peso REAL,
        temperatura REAL,
        diagnostico TEXT,
        creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE CASCADE
    )`);

    // 4. Tabla usuarios
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        correo TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        rol TEXT NOT NULL CHECK (rol IN ('Administrador', 'Veterinario')),
        creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

module.exports = db;