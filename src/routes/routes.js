const express = require('express');
const router = express.Router();

const schemaEstudiante = require('../models/estudiante');
const schemaDocente = require('../models/estudiante');
const schemaAsignatura = require('../models/asignatura');

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

    res.render('estudiantes', { estudiante });
});

router.get('/estudianteBuscar', async (req, res) => {
    
    const estudiante = await schemaEstudiante.findOne({ codigoEstudiante: req.body.codigoEstudiante });

    res.render('prueba', { estudiante });
});

router.post('/estudianteEdit', async (req, res) => {
    
    const estudiante = await schemaEstudiante.findOne({ codigoEstudiante: req.body.codigoEstudiante });

    await schemaMineral.update({ codigoEstudiante: req.body.codigoEstudiante }, req.body);
    res.redirect('/minerales');
});

router.get('/estudianteDelete', async (req, res) => {
    await schemaMineral.deleteOne({ codigoEstudiante: req.body.codigoEstudiante });
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

    res.render('asignatura', { asignatura });
});

router.get('/asignaturaSearch', async (req, res) => {
    
    const asignatura = await schemaAsignatura.findOne({ codigoAsignatura: req.body.codigoAsignatura });

    res.render('modificarAsig', { asignatura });
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

module.exports = router;