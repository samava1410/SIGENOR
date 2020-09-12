const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaAsignatura = new Schema({
    codigoAsignatura: {
        type: String,
        required: "El codigo de la asignatura es obligatorio",
        match: [/^[0-9]*$/, "El codigo de la asignatura debe ser un valor numerico"]
    },

    nombreASignatura: {
        type: String,
        required: "El nombre de la asignatura es obligatorio",
        match: [/^\b(?!.*?\s{2})[A-Za-z ]{1,50}\b$/, "El nombre de la asignatura solo puede tener caracteres alfabeticos"]
    },

    /*cantCupos: {
        type: int,
        required: "Los apellidos del docente son obligatorios",
        match: [/^[1-9]*$/, "La cantidad de cupos debe ser un valor mayor a 1"]
    },

    codigoDocente: {type: Schema.ObjectId, ref: 'docente' },*/


});

module.exports = mongoose.model('asignatura', schemaAsignatura);