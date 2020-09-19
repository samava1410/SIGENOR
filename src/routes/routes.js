const express = require('express');
const router = express.Router();

const schemaEstudiante = require('../models/estudiante');
const schemaDocente = require('../models/estudiante');
const schemaAsignatura = require('../models/asignatura');
const schemaGrupo = require('../models/grupo');

/*RUTAS DOCENTE*/
router.get('/', (req, res) => {
    res.render('index');
});

router.post('/docenteAdd', (req, res) => {
    const docente = new schemaDocente(req.body);
    docente.save();
    res.redirect('/');
});

router.get('/docentePerfil', async (req, res) => {
    
    const docente = await schemaDocente.findOne({ codigoDocente: "2011" });

    res.render('profesoresPerfil', { docente });
});

router.get('/docenteBuscar', async (req, res) => {
    
    const docente = await schemaDocente.findOne({ codigoDocente: req.body.codigoDocente });

    res.render('Admin-Docentes', { docente });
});

router.post('/docenteEdit', async (req, res) => {
    
    //const docente = await schemaDocente.findOne({ codigoDocente: req.body.codigoDocente });

    await schemaDocente.update({ codigoDocente: req.body.codigoDocente }, req.body);
    res.redirect('/');
});

router.get('/docenteDelete', async (req, res) => {
    await schemaDocente.deleteOne({ codigoDocente: req.body.codigoDocente });
    res.redirect('Admin-Mdocentes');
});



/*ROUTAS ESTUDIANTE*/
router.get('/', (req, res) => {
    res.render('index', { "mensaje": "" });
});

router.post('/estudianteAdd', (req, res) => {
    const estudiante = new schemaEstudiante(req.body);
    estudiante.save();
    res.redirect('/');
});

router.get('/estudiantePerfil', async (req, res) => {
    
    const estudiante = await schemaEstudiante.findOne({ codigoEstudiante: "2015" });

    res.render('estudiantesPerfil', { estudiante });
});

router.get('/estudianteBuscar', async (req, res) => {
    
    const estudiante = await schemaEstudiante.findOne({ codigoEstudiante: req.body.codigoEstudiante });

    res.render('Admin-estudiantes', { estudiante });
});

router.post('/estudianteEdit', async (req, res) => {
    
    const estudiante = await schemaEstudiante.findOne({ codigoEstudiante: req.body.codigoEstudiante });

    await schemaEstudiante.update({ codigoEstudiante: req.body.codigoEstudiante }, req.body);
    res.redirect('/');
});

router.get('/estudianteDelete', async (req, res) => {
    await schemaEstudiante.deleteOne({ codigoEstudiante: req.body.codigoEstudiante });
    res.redirect('/');
});

/*----------------RUTAS ASIGNAGTURA-----------------------*/

router.post('/asignaturaAdd', (req, res) => {
    const asignatura = new schemaAsignatura(req.body);
    asignatura.save();
    res.redirect('/');
});

router.get('/asignatura', async (req, res) => {
    
    const asignatura = await schemaAsignatura.findOne({ codigoAsignatura: "8020" });

    res.render('Admin-Asignatura', { asignatura });
});

router.get('/asignaturaSearch', async (req, res) => {
    
    const asignatura = await schemaAsignatura.findOne({ codigoAsignatura: req.body.codigoAsignatura });

    res.render('Admin-Masignatura', { asignatura });
});

router.post('/asignaturaEdit', async (req, res) => {
    
    const asignatura = await schemaAsignatura.findOne({ codigoAsignatura: req.body.codigoAsignatura });

    await schemaAsignatura.update({ codigoAsignatura: req.body.codigoAsignatura }, req.body);
    res.redirect('/asignatura');
});

router.get('/AsignaturaDelete', async (req, res) => {
    await schemaAsignatura.deleteOne({ codigoAsignatura: req.body.codigoAsignatura });
    res.redirect('/');
});

/*----------------RUTAS GRUPOS-----------------------*/

router.post('/grupoAdd', (req, res) => {

    //req.body.estudiante = estudiantes

    const grupo = new schemaGrupo(req.body);
    grupo.save();
    res.redirect('/');
});

router.get('/grupo', async (req, res) => {
    
    const grupo = await schemaGrupo.findOne({ numGrupo: "60" });

    res.render('Admin-grupos', { grupo });
});

router.get('/grupoSearch', async (req, res) => {
    
    const grupo = await schemaGrupo.findOne({ numGrupo: req.body.numGrupo });

    res.render('modificarGrupo', { grupo });
});

router.post('/grupoEdit', async (req, res) => {
    
    const grupo = await schemaGrupo.findOne({ numGrupo: req.body.numGrupo });

    await schemaGrupo.update({ numGrupo: req.body.numGrupo }, req.body);
    res.redirect('/grupo');
});

router.get('/grupoDelete', async (req, res) => {
    await schemaGrupo.deleteOne({ numGrupo: req.body.numGrupo });
    res.redirect('/');
});

module.exports = router;