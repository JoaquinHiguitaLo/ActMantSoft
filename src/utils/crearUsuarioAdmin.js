const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarioModel');

async function crearUsuarioInicial() {
    try {
        const passwordPlano = '123456'; // puedes cambiarla

        const passwordHash = await bcrypt.hash(passwordPlano, 10);

        await Usuario.crear({
            nombre: 'Admin Principal',
            correo: 'admin@vetcare.com',
            password: passwordHash,
            rol: 'Veterinario'
        });

        console.log('Usuario administrador creado correctamente');
        process.exit();

    } catch (error) {
        console.error('Error creando usuario:', error.message);
        process.exit();
    }
}

crearUsuarioInicial();