const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan')

//Conexion con la BD Mongo
mongoose.connect('mongodb://localhost/SIGENOR', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('Conectado a la BD SIGENOR'))
    .catch(err => console.log('Problemas de conexion de bases de datos' + err));

mongoose.set('useCreateIndex', true);

//Otras configuraciones
//app.use(express.json());
app.use('/static', express.static(__dirname + '/static'));
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));//MIDDLEWARE HTTP

//Configuracion de las vistas
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Configuracion de las rutas
const routes = require('./routes/routes');
app.use('/', routes);

//Iniciar servidor Express
app.listen(3000, () => {
    console.log('Servidor escuchando en :3000');
});