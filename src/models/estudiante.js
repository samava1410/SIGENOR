const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaEstudiante = new Schema({
    codigoEstudiante: {
        type: String,
        required: "El codigo del estudiante es obligatorio",
        match: [/^[0-9]*$/, "El codigo del estudiante no puede tener caracteres alfabeticos"]
    },

    nombres: {
        type: String,
        required: "Los nombres del Estudiante son obligatorios",
        match: [/^\b(?!.*?\s{2})[A-Za-z ]{1,50}\b$/, "Los nombres solo pueden tener caracteres alfabeticos"]
    },

    apellidos: {
        type: String,
        required: "Los apellidos del Estudiante son obligatorios",
        match: [/^\b(?!.*?\s{2})[A-Za-z ]{1,50}\b$/, "Los apellidos solo pueden tener caracteres alfabeticos"]
    },

    correo: {
        type: String,
        required: "El correo es obligatorio",
        match: [/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/, "El correo debe tener el formato usuario@dominio.abc"]
    },

});

module.exports = mongoose.model('estudiante', schemaEstudiante);