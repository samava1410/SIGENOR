const express = require('express');
const router = express.Router();

const schemaEstudiante = require('../models/estudiante');
const schemaDocente = require('../models/docente');
const schemaAsignatura = require('../models/asignatura');
const schemaGrupo = require('../models/grupo');
const docente = require('../models/docente');

/*RUTAS DOCENTE*/
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/docenteAdd', (req, res) => {
    res.render('Admin-Docentes');
});

router.post('/docenteAdd', (req, res) => {
    const docente = new schemaDocente(req.body);
    docente.save();
    res.redirect('/docenteAdd#registro');
});

router.get('/docentePerfil', async (req, res) => {
    
    const docente = await schemaDocente.findOne({ codigoDocente: "212443" });

    res.render('profesoresPerfil', { docente });
    
});

router.post('/docenteBuscar', async (req, res) => {
    const docente = await schemaDocente.findOne({ codigoDocente: req.body.codigoDocente });

    res.render('Admin-Mdocentes', { docente });

});

router.get('/docenteEdit', (req, res) => {
    const docente={}
    res.render('Admin-Mdocentes',{docente});
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

router.get('/estudianteAdd', (req, res) => {
    res.render('Admin-estudiantes');
});

router.post('/estudianteAdd', (req, res) => {
    const estudiante = new schemaEstudiante(req.body);
    estudiante.save();
    res.redirect('/estudianteAdd#registroE');
});

router.get('/estudiantePerfil', async (req, res) => {
    
    const estudiante = await schemaEstudiante.findOne({ codigoEstudiante: "102323" });

    res.render('estudiantesPerfil', { estudiante });
});

router.post('/estudianteBuscar', async (req, res) => {
    
    const estudiante = await schemaEstudiante.findOne({ codigoEstudiante: req.body.codigoEstudiante });

    res.render('Admin-Mestudiantes', { estudiante });

    
});

router.get('/estudianteEdit', (req, res) => {
    const estudiante={}
    res.render('Admin-Mestudiantes',{estudiante});
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

router.get('/asignaturaAdd', (req, res) => {
    res.render('Admin-asignatura');
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

    res.render('Admin-Masignatura', { asignatura });
});



router.get('/asignaturaEdit', (req, res) => {
    const asignatura={}
    res.render('Admin-Masignatura',{asignatura});
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