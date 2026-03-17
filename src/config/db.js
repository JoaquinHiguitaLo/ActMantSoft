const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {

    // 1. Tabla original
    db.run(`CREATE TABLE appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pet_name TEXT NOT NULL,
        CedId TEXT NOT NULL,
        service TEXT NOT NULL,
        appointment_date TEXT NOT NULL,
        status TEXT DEFAULT 'Scheduled',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // 2. Nueva tabla Owners
    db.run(`CREATE TABLE owners (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        CedId TEXT,
        name TEXT,
        phone TEXT,
        email TEXT
    )`);

    // 3. Nueva tabla Pets
    db.run(`CREATE TABLE pets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        species TEXT,
        owner_id INTEGER NOT NULL,
        FOREIGN KEY (owner_id) REFERENCES owners(id)
    )`);

    // 4. Datos de prueba (simulando tu sistema viejo)
    db.run(`INSERT INTO appointments (pet_name, owner_name, service, appointment_date)
            VALUES 
            ('Rex', 'Juan', 'Baño', '2025-03-20'),
            ('Luna', 'Ana', 'Consulta', '2025-03-21')`);

    // 5. MIGRACIÓN

    // Insertar dueños únicos
    db.run(`
        INSERT INTO owners (name)
        SELECT DISTINCT owner_name FROM appointments
    `);

    // Insertar mascotas asociadas al dueño
    db.run(`
        INSERT INTO pets (name, owner_id)
        SELECT DISTINCT a.pet_name, o.id
        FROM appointments a
        JOIN owners o ON a.owner_name = o.name
    `);

});

module.exports = db;