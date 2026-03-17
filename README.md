Sprint 1: Reingeniería de la Base de Datos
El sistema actual guarda todo en una tabla "Citas". Esto es insostenible para una clínica.

Misión: Crear tablas independientes para Owners, Pets y Appointments.
Reto: Migrar los registros de "Rex" y "Luna" sin que la aplicación deje de funcionar.
Entregable: Script SQL de migración y archivo db.js actualizado.

HU-01: Gestión de Pacientes e Integridad
Como Recepcionista, quiero registrar mascotas vinculadas a sus dueños, para evitar la duplicidad de información en cada cita.
Criterio 1: La base de datos debe estar normalizada (Owners y Pets separados).
Criterio 2: No se puede registrar una mascota sin un dueño válido asociado.
