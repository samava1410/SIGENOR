const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const estudiante = mongoose.model('./estudiante');

const SchemaInscripcion = new Schema({
    autor: { type: Schema.ObjectId, ref: "estudiante" } 
});

module.exports = mongoose.model("inscripcion", SchemaInscripcion);