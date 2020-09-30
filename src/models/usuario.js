const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaUsuario = new Schema({
    correo: {
        type: String,
        required: "El correo del usuario es obligatorio",
        match: [/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/, "El correo debe tener el formato usuario@dominio.abc"]
    },

    contrasena: {
        type: String,
        required: "La contraseña es obligatoria",
    },

    tipoUsuario: {
        type: Number,
        required: "El tipo de usuario es obligatorio",
    },

});

module.exports = mongoose.model('usuario', schemaUsuario);