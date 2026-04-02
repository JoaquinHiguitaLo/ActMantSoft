const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarioModel');

exports.getLoginForm = (req, res) => {

    if (req.session.user) {
        return res.redirect('/citas');
    }

    res.render('auth/login', {
        title: 'Iniciar Sesión',
        error: null,
        mostrarBotonLogin: false
    });
};

exports.login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const usuario = await Usuario.obtenerPorCorreo(correo);

        if (!usuario) {
            return res.render('auth/login', {
                title: 'Iniciar Sesión',
                error: 'Correo o contraseña incorrectos.',
                mostrarBotonLogin: false
            });
        }

        const passwordValido = await bcrypt.compare(password, usuario.password);

        if (!passwordValido) {
            return res.render('auth/login', {
                title: 'Iniciar Sesión',
                error: 'Correo o contraseña incorrectos.',
                mostrarBotonLogin: false
            });
        }

        req.session.user = {
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol
        };

        res.redirect('/citas');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('No se pudo cerrar la sesión.');
        }

        res.redirect('/auth/login');
    });
};