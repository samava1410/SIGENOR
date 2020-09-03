const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaDocente = new Schema({
    codigoDocente: {
        type: String,
        required: "El codigo del docente es obligatorio",
        match: [/^[0-9]*$/, "El codigo del docente no puede tener caracteres alfabeticos"]
    },

    nombres: {
        type: String,
        required: "Los nombres del docente son obligatorios",
        match: [/^\b(?!.*?\s{2})[A-Za-z ]{1,50}\b$/, "Los nombres solo pueden tener caracteres alfabeticos"]
    },

    apellidos: {
        type: String,
        required: "Los apellidos del docente son obligatorios",
        match: [/^\b(?!.*?\s{2})[A-Za-z ]{1,50}\b$/, "Los apellidos solo pueden tener caracteres alfabeticos"]
    },

    correo: {
        type: String,
        required: "La cantidad de ejemplares es obligatoria",
        match: [/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/, "El correo debe tener el formato usuario@dominio.com"]
    },

});

module.exports = mongoose.model('docente', schemaDocente);