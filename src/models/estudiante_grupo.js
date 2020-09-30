const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaEstudianteGrupo= new Schema({
    numGrupo: {
        type: String,
        required: "El numero de grupo es obligatorio",
        match: [/^[0-9]*$/, "El numero de grupo debe ser un valor numerico"]
    },

    codigoEstudiante: {type: Schema.ObjectId, ref: 'estudiante' },

});

module.exports = mongoose.model('estudiante_grupo', schemaEstudianteGrupo);