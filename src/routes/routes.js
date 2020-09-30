const express = require('express');
const router = express.Router();

const schemaEstudiante = require('../models/estudiante');
const schemaDocente = require('../models/docente');
const schemaAsignatura = require('../models/asignatura');
const schemaGrupo = require('../models/grupo');
const schemaUsuario = require('../models/usuario');
const mongoose = require('mongoose');

/*RUTAS DOCENTE*/
router.get('/', async (req, res) => {

    if (req.session.typeUser) {
        if (req.session.typeUser == "1") {
            res.redirect('docenteAdd');
        }
        else if (req.session.typeUser == "2") {
            res.redirect('docentePerfil');
        }
    }

    else {
        res.render('login', { "mensaje": "" });
    }

});

router.post('/login', async (req, res) => {

    const usuarios = await schemaUsuario.find();
    var flag = false;
    usuarioTemp = {};

    for (var i = 0; i < usuarios.length; i++) {

        if (usuarios[i].correo == req.body.correo && usuarios[i].contrasena == req.body.contrasena && usuarios[i].tipoUsuario == parseInt(req.body.tipoUsuario)) {
            flag = true;
            usuarioTemp = usuarios[i];
        }
    }

    if (flag) {
        req.session.typeUser = req.body.tipoUsuario;
        req.session.correo = req.body.correo;
        //1 admon
        //2 docente
        //3 est

        console.log("vvvvvvvvvvvvv   ");
        console.log(req.body.tipoUsuario);

        if (usuarioTemp.tipoUsuario == "1") {
            res.redirect('docenteAdd');
        }

        else if (usuarioTemp.tipoUsuario == "2") {
            const docente = await schemaDocente.findOne({ correo: usuarioTemp.correo });
            console.log("ENTRO AL LOG PERFIL DOC");

            res.redirect('docentePerfil');
        }

        else if (usuarioTemp.tipoUsuario == "3") {

        }
    }
    else {
        res.render('login', { "mensaje": "Contrasena o usuario invalido" });
    }

});

router.get('/cerrarSes', async (req, res) => {

    
    console.log("vvvvvvvvvvvvv   ");
    console.log(req.session);

    req.session.destroy();

    res.redirect('/');
});

router.get('/addUs', async (req, res) => {

    res.render('usuarioTemp');
});

router.post('/addUs', async (req, res) => {

    const usuario = new schemaUsuario(req.body);
    usuario.save();

    res.redirect('/');
});

router.get('/docenteAdd', async (req, res) => {
    const docente = await schemaDocente.find();

    res.render('Admin-Docentes', { docente, "mensaje": "" });
});

router.post('/docenteAdd', (req, res) => {
    const docente = new schemaDocente(req.body);
    docente.save();
    res.redirect('/docenteAdd#registro');
});

router.get('/docentePerfil', async (req, res) => {

    const docente = await schemaDocente.findOne({ correo: req.session.correo });
    console.log("ENTRO AL GETTTT");

    res.render('profesoresPerfil', { docente });

});

router.post('/docenteBuscar', async (req, res) => {
    const docente = await schemaDocente.findOne({ codigoDocente: req.body.codigoDocente });

    res.render('Admin-Mdocentes1', { docente });

});

router.get('/docenteEdit', (req, res) => {
    const docente = {}
    res.render('Admin-Mdocentes', { docente });
});

router.post('/docenteEdit', async (req, res) => {

    //const docente = await schemaDocente.findOne({ codigoDocente: req.body.codigoDocente });

    await schemaDocente.update({ codigoDocente: req.body.codigoDocente }, req.body);
    res.redirect('/docenteEdit#modificar');
});

router.get('/docenteDelete/:id', async (req, res) => {
    await schemaDocente.deleteOne({ codigoDocente: req.params.id });
    res.redirect('/docenteEdit#modificar');
});



/*ROUTAS ESTUDIANTE*/
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/estudianteAdd', async (req, res) => {

    const estudiante = await schemaEstudiante.find();

    res.render('Admin-estudiantes', { estudiante, "mensaje": "" });
});

router.post('/estudianteAdd', (req, res) => {
    const estudiante = new schemaEstudiante(req.body);
    estudiante.save();
    res.redirect('/estudianteAdd#registroE');
});

router.get('/estudiantePerfil', async (req, res) => {

    const estudiante = await schemaEstudiante.findOne({ codigoEstudiante: "1" });

    res.render('estudiantesPerfil', { estudiante });
});

router.post('/estudianteBuscar', async (req, res) => {

    const estudiante = await schemaEstudiante.findOne({ codigoEstudiante: req.body.codigoEstudiante });

    res.render('Admin-Mestudiantes1', { estudiante });


});

router.get('/estudianteEdit', (req, res) => {
    const estudiante = {}
    res.render('Admin-Mestudiantes', { estudiante });
});

router.post('/estudianteEdit', async (req, res) => {

    /*    const estudiante = await schemaEstudiante.findOne({ codigoEstudiante: req.body.codigoEstudiante });*/

    await schemaEstudiante.update({ codigoEstudiante: req.body.codigoEstudiante }, req.body);
    res.redirect('/estudianteEdit#modificarE');
});



router.get('/estudianteDelete/:id', async (req, res) => {
    await schemaEstudiante.deleteOne({ codigoEstudiante: req.params.id });
    res.redirect('/estudianteEdit#modificarE');
});

/*----------------RUTAS ASIGNAGTURA-----------------------*/

router.get('/asignaturaAdd', async (req, res) => {
    const asignatura = await schemaAsignatura.find();

    res.render('Admin-asignatura', { asignatura, "mensaje": "" });
});

router.post('/asignaturaAdd', (req, res) => {
    const asignatura = new schemaAsignatura(req.body);
    asignatura.save();
    res.redirect('/asignaturaAdd#registroA');
});

router.get('/asignatura', async (req, res) => {

    const asignatura = await schemaAsignatura.findOne({ codigoAsignatura: "8020" });

    res.render('Admin-Asignatura', { asignatura });
});

router.post('/asignaturaSearch', async (req, res) => {

    const asignatura = await schemaAsignatura.findOne({ codigoAsignatura: req.body.codigoAsignatura });

    res.render('Admin-Masignatura1', { asignatura });
});



router.get('/asignaturaEdit', (req, res) => {
    const asignatura = {}
    res.render('Admin-Masignatura', { asignatura });
});

router.post('/asignaturaEdit', async (req, res) => {

    /* const asignatura = await schemaAsignatura.findOne({ codigoAsignatura: req.body.codigoAsignatura });*/

    await schemaAsignatura.update({ codigoAsignatura: req.body.codigoAsignatura }, req.body);
    res.redirect('/asignaturaEdit#modificarA');
});

router.get('/AsignaturaDelete/:id', async (req, res) => {
    await schemaAsignatura.deleteOne({ codigoAsignatura: req.params.id });
    res.redirect('/asignaturaEdit#modificarA');
});

/*----------------RUTAS GRUPOS-----------------------*/
router.get('/grupoAdd', async (req, res) => {
    const docente = await schemaDocente.find();
    const estudiante = await schemaEstudiante.find();
    const asignatura = await schemaAsignatura.find();

    res.render('Admin-grupos', { docente, estudiante, asignatura });
});

router.post('/grupoAdd', async (req, res) => {

    //req.body.estudiante = estudiantes
    ests = JSON.parse(req.body.tempEsta)

    ids = [];

    for (var i = 0; i < ests.length; i++) {
        const estudiante = await schemaEstudiante.findOne({ codigoEstudiante: ests[i].estudiante });
        ids.push(estudiante._id);
    }


    req.body.codigoEstudiantes = ids;

    const grupo = new schemaGrupo(req.body);
    grupo.save();

    /*const grupo = new schemaGrupo(req.body);
    grupo.save();*/
    res.redirect('/');
});

router.get('/grupo', async (req, res) => {

    const grupo = await schemaGrupo.findOne({ numGrupo: "12" }).populate('codigoEstudiantes').populate('codigoDocente').populate('codigoASignatura');

    console.log("PROBLEMA NULL   ");
    console.log(grupo);

    res.render('ver-Grupo', { grupo, mensaje: "" });
});

router.post('/grupoSearch', async (req, res) => {
    const grupo = await schemaGrupo.findOne({ numGrupo: req.body.numGrupo }).populate('codigoEstudiantes').populate('codigoDocente').populate('codigoAsignatura');
    const docente = await schemaDocente.find();
    const estudiante = await schemaEstudiante.find();
    const asignatura = await schemaAsignatura.find();
    const tempEsta = JSON.stringify(grupo.codigoEstudiantes);
    const findEst = JSON.stringify(estudiante);

    res.render('Admin-Mgrupos', { grupo, docente, estudiante, asignatura, mensaje: "", tempEsta, findEst });
});

router.get('/grupoEdit', async (req, res) => {
    const grupo = {
        codigoEstudiantes: [{}]
    }

    const docente = {};
    const estudiante = {};
    const asignatura = {};

    res.render('Admin-Mgrupos', { grupo, docente, estudiante, asignatura, mensaje: "", findEst: {}, tempEsta: {} });
});

router.post('/grupoEdit', async (req, res) => {

    codigoEstudiantesTemp = JSON.parse(req.body.tempEsta);

    ids = [];

    for (var i = 0; i < codigoEstudiantesTemp.length; i++) {
        const estudiante = await schemaEstudiante.findOne({ codigoEstudiante: codigoEstudiantesTemp[i].codigoEstudiante });
        ids.push(mongoose.Types.ObjectId(estudiante._id));
    }



    req.body.codigoEstudiantes = ids;
    /*
        //await schemaEstudiante.update({ codigoEstudiante: req.body.codigoEstudiante }, req.body);
    */

    cantIntero = parseInt(req.body.cantCupos)
    req.body.cantCupos = cantIntero;

    req.body.codigoDocente = mongoose.Types.ObjectId(req.body.codigoDocente);
    req.body.codigoASignatura = mongoose.Types.ObjectId(req.body.codigoASignatura);

    console.log(req.body);

    await schemaGrupo.update({ numGrupo: "12" }, req.body);


    //await schemaGrupo.update({ numGrupo: req.body.numGrupo }, {$push: { codigoEstudiantes: { $each: req.body.codigoEstudiantes}, codigoDocente: { $each: req.body.codigoDocente}, codigoASignatura: { $each: req.body.codigoAsignatura} } });
    res.redirect('/grupo');
});

router.get('/grupoDelete', async (req, res) => {
    await schemaGrupo.deleteOne({ numGrupo: req.body.numGrupo });
    res.redirect('/');
});


router.get('/docenteEst', async (req, res) => {

    const estudiante = await schemaEstudiante.find();

    res.render('profesores', { estudiante, mensaje: "" });
});

router.get('/docenteGru', async (req, res) => {

    const grupo = await schemaGrupo.findOne({ numGrupo: "12" }).populate('codigoEstudiantes').populate('codigoDocente').populate('codigoASignatura');

    res.render('profesores', { grupo, mensaje: "" });
});

module.exports = router;