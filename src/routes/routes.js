const express = require('express');
const router = express.Router();

const schemaEstudiante = require('../models/estudiante');
const { schema } = require('../models/estudiante');

router.get('/prueba', (req, res) => {
    res.render('prueba', { "mensaje": "" });
});

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

router.post('/estudianteEdits', async (req, res) => {
    
    const estudiante = await schemaEstudiante.findOne({ codigoEstudiante: req.body.codigoEstudiante });

    await schemaMineral.update({ codigoEstudiante: req.body.codigoEstudiante }, req.body);
    res.redirect('/minerales');
});

router.get('/estudianteBuscar', async (req, res) => {
    
    const estudiante = await schemaEstudiante.findOne({ codigoEstudiante: req.body.codigoEstudiante });

    res.render('prueba', { estudiante });
});

router.get('/estudianteDel', async (req, res) => {
    await schemaMineral.deleteOne({ codigoEstudiante: req.body.codigoEstudiante });
    res.redirect('/');
});

module.exports = router;