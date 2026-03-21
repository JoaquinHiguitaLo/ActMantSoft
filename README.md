Sprint 1: Reingeniería de la Base de Datos
El sistema actual guarda todo en una tabla "Citas". Esto es insostenible para una clínica.

Misión: Crear tablas independientes para Owners, Pets y Appointments.
Reto: Migrar los registros de "Rex" y "Luna" sin que la aplicación deje de funcionar.
Entregable: Script SQL de migración y archivo db.js actualizado.

HU-01: Gestión de Pacientes e Integridad
Como Recepcionista, quiero registrar mascotas vinculadas a sus dueños, para evitar la duplicidad de información en cada cita.
Criterio 1: La base de datos debe estar normalizada (Owners y Pets separados).
Criterio 2: No se puede registrar una mascota sin un dueño válido asociado.

_______________________________________________________________________________________________________________________________________

Sprint 2: Desacoplamiento MVC
La lógica de SQL está mezclada con las rutas. Debemos limpiar el código.

Misión: Implementar la capa de Models y centralizar el SQL.
Reto: Refactorizar el controlador para que no conozca la base de datos directamente.
Entregable: Estructura de carpetas /models y controladores limpios.

HU-02: Registro de Evolución Médica
Como Veterinario, quiero registrar constantes vitales en cada cita, para mantener un seguimiento clínico riguroso.
Criterio 1: El formulario debe incluir campos de: Peso (kg), Temperatura (°C) y Diagnóstico.
Criterio 2: Estos campos deben ser obligatorios solo en consultas médicas.
