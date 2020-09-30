const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaGrupo= new Schema({
    numGrupo: {
        type: String,
        required: "El numero de grupo es obligatorio",
        match: [/^[0-9]*$/, "El numero de grupo debe ser un valor numerico"]
    },

    codigoDocente: {type: Schema.ObjectId, ref: 'docente' },

    codigoASignatura: {type: Schema.ObjectId, ref: 'asignatura' },

    codigoEstudiantes: [{type: Schema.ObjectId, ref: 'estudiante' }],

    cantCupos: {
        type: Number,
        required: "La cantidad de cupos es obligatoria",
        match: [/^[1-9]*$/, "La cantidad de cupos debe ser un valor mayor a 1"]
    }

});

module.exports = mongoose.model('grupo', schemaGrupo);