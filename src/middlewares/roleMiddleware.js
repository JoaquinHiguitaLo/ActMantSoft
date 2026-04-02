function roleVeterinario(req, res, next) {

    if (!req.session.user) {
        return res.redirect('/auth/login');
    }

    if (req.session.user.rol !== 'Veterinario') {
        return res.status(403).send('Acceso restringido solo para veterinarios.');
    }

    next();
}

module.exports = roleVeterinario;