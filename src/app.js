// Modulos Require's
require ('dotenv').config()
const conexionDB = require ("../src/database/config")
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

// Routers //
// Api-Routers //
const apiContenidosRouter = require('../src/routes/contenidos')
const apiUsuariosRouter = require('../src/routes/usuarios')

// ** Ejecucion Express
const app = express();

// ** Conexion Mongo
conexionDB()

// ** Middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Rutas Api
app.use('/api/usuarios', apiUsuariosRouter)
app.use('/api/contenidos', apiContenidosRouter)



// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

app.use(express.static(path.join(__dirname, '/public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
