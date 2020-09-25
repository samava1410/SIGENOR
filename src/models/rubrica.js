const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaRubrica= new Schema({
    idRubrica: {
        type: String,
        required: "El identificador de rubrica es obligatorio",
        match: [/^[0-9]*$/, "El identificador de rubrica debe ser un valor numerico"]
    },

    nombre: {
        type: String,
        required: "El nombre de la rubrica es obligatorio",
        match: [/^\b(?!.*?\s{2})[A-Za-z ]{1,50}\b$/, "La descripcion solo puede tener caracteres alfabeticos"]
    },

    descripcion: {
        type: String,
        required: "La descripcion es obligatoria",
        match: [/^\b(?!.*?\s{2})[A-Za-z ]{1,50}\b$/, "La descripcion solo puede tener caracteres alfabeticos"]
    },

    porcentaje: {
        type: Number,
        required: "El valor del porcentaje es obligatorio",
        match: [/^[1-100]*$/, "Es valor del porcentaje es un numero entre 0 y 100"]
    }

});

module.exports = mongoose.model('rubrica', schemaRubrica);