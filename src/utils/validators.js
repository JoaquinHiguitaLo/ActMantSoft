function esConsultaMedica(servicio) {
    if (!servicio) return false;

    const valor = servicio.toLowerCase().trim();
    return valor.includes('consulta');
}

function validarDatosCita(data) {
    const errores = [];

    if (!data.mascota_id) {
        errores.push('La mascota es obligatoria.');
    }

    if (!data.servicio) {
        errores.push('El servicio es obligatorio.');
    }

    if (!data.fecha) {
        errores.push('La fecha es obligatoria.');
    }

    if (esConsultaMedica(data.servicio)) {

        if (data.peso === undefined || data.peso === '') {
            errores.push('El peso es obligatorio en consultas médicas.');
        } 
        else if (Number(data.peso) <= 0) {
            errores.push('El peso debe ser mayor que cero.');
        }

        if (data.temperatura === undefined || data.temperatura === '') {
            errores.push('La temperatura es obligatoria en consultas médicas.');
        } 
        else if (Number(data.temperatura) < 30 || Number(data.temperatura) > 45) {
            errores.push('La temperatura debe estar entre 30°C y 45°C.');
        }

        if (!data.diagnostico || data.diagnostico.trim() === '') {
            errores.push('El diagnóstico es obligatorio en consultas médicas.');
        }
    }

    return errores;
}

module.exports = {
    esConsultaMedica,
    validarDatosCita
};