const mongoose = require('mongoose');
const schemaDocente = require('./models/docente');
const schemaEstudiante = require('./models/estudiante');

//Conexion con la BD Mongo
mongoose.connect('mongodb://localhost/SIGENOR', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('Conectado a la BD SIGENOR'))
    .catch(err => console.log('Problemas de conexion de bases de datos' + err));

mongoose.set('useCreateIndex', true);

function agregarDoc() {
    console.log("Vamos agregar dos docentes");

    docenteObj = {
        codigoDocente: "2014",
        nombres: "Juan M",
        apellidos: "Medina A",
        correo: "juan@hotmail.com"
    };

    docente = new schemaDocente(docenteObj);
    docente.save();

    docenteObj = {
        codigoDocente: "2015",
        nombres: "Maria M",
        apellidos: "Acevedo A",
        correo: "maria@hotmail.com"
    };

    docente = new schemaDocente(docenteObj);
    docente.save();
}

function eliminarYMostrarDoc() {

    schemaDocente.find({}, function (err, docs) {
        console.log("Se agregaron " + docs.length + " docentes");
        console.log(docs[0].nombres);
        console.log(docs[1].nombres);
    });

    console.log("Ahora Vamos a eliminar a Juan M");

    schemaDocente.deleteOne({ codigoDocente: "2014" }, function (err) {
        console.log("Se elimino Juan M");
    });

    schemaDocente.find({}, function (err, docs) {
        console.log("Ahora solo quedan " + docs.length + " docentes");
        console.log(docs[0].nombres);
    });

    schemaDocente.update(
        {codigoDocente: "2015"},
        {apellidos: "Morales J"}
      ).then((rawResponse) => {
          console.log("Se ha actualizado el docente con codigo 2015")      
      })
      .catch((err) => {
      });

}

//agregarDoc();
//setTimeout(eliminarYMostrarDoc, 3000);

estObj = {
    codigoEstudiante: "2011",
    nombres: "Santiago",
    apellidos: "Medina A",
    correo: "santiago@hotmail.com"
};

estudiante = new schemaEstudiante(estObj);
estudiante.save();