const express = require('express');
const morgan = require('morgan');
const routes = require('./src/routes');
const errorHandler = require('./src/utils/middlewares/errorHandler');
const setHeaders = require('./src/utils/middlewares/setHeaders');
const {conn} = require('./src/db')
const app = express();

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));
app.use(setHeaders);
//CREAR MIDDLEWARE PARA AUTENTICACIONES 


app.use('/', routes);

app.use(errorHandler);

conn.sync({force:true}).then(() =>{
    console.log('Base de Datos conectada');
    app.listen(3001, ()=> {
        console.log('Escuchando en puerto 3001')
    })
})
