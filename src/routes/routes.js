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

router.post('/estudiante', (req, res) => {
    const estudiante = new schemaEstudiante(req.body);
    estudiante.save();
    res.redirect('/');
});

router.get('/estudiantePerfil', async (req, res) => {
    
    const estudiante = await schemaEstudiante.findOne({ codigoEstudiante: "2015" });

    res.render('prueba2', { estudiante });
});

router.get('/estudianteBuscar', async (req, res) => {
    
    const estudiante = await schemaEstudiante.findOne({ codigoEstudiante: req.body.codigoEstudiante });

    res.render('prueba', { estudiante });
});

module.exports = router;