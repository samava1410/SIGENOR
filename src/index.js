const mongoose = require('mongoose');
const schemaDocente = require('./models/docente');

//Conexion con la BD Mongo
mongoose.connect('mongodb://localhost/SIGENOR', { useNewUrlParser: true })
    .then(db => console.log('Conectado a la BD SIGENOR'))
    .catch(err => console.log('Problemas de conexion de bases de datos' + err));

mongoose.set('useCreateIndex', true);

const docenteObj = {
    codigoDocente: "2014",
    nombres: "Juan M",
    apellidos: "Medina A",
    correo: "juan@hotmail.com"
};

const docente = new schemaDocente(docenteObj);
docente.save();
